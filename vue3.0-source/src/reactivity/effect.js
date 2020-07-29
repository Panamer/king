import { TriggerOpTypes } from "./operation";

/**
 * 创建effect时可以传递参数 computed也是基于effect来实现的,只是增加了一些参数
 * @param {*} fn 用户定义的方法
 * @param {*} options 条件
 * 这里写的是个watchEffect
 */
export function effect(fn, options = {}){
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect() // watcheffect默认就执行. 当是计算属性effect的时候默认不执行
    }
    return effect;
}

let uid = 0;
let activeEffect = null; // 当前新创建的effect
const effectStack = []; // 栈结构 存放正在执行的effect
function createReactiveEffect(fn, options){
    const effect = function reactiveEffect(){
        if (!effectStack.includes(effect)) {    // 防止不听的更改属性导致死循环
            try {
                effectStack.push(effect);   // 将当前effect放到栈中
                activeEffect = effect;  // 标记当前运行的effect
                return fn();    // 执行fn
            } finally {
                effectStack.pop();  // 执行完出栈
                activeEffect = effectStack[effectStack.length - 1]; // vue2.0
            }
        }
    }

    effect.options = options;
    effect.id = uid++;
    effect.deps = []; // 依赖了哪些属性

    return effect;
}

// 和map用法一致 但是弱引用 不会导致内存泄漏
const targetMap = new WeakMap();
// 依赖收集
export function track(target, type, key){
    if (!activeEffect) {
        return;  // 说明取值的属性 不依赖effect
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set));
    }
    if (!dep.has(activeEffect)) {
        dep.add( activeEffect );
        activeEffect.deps.push(dep)
    }
}
// 触发依赖更新
export function trigger(target, type, key, value, oldValue){
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        return;
    }
    const effects = new Set();
    const computedRunners = new Set();

    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect.options.computed) {
                    computedRunners.add(effect);
                } else {
                    effects.add(effect);
                }
            });
        }
    }

    if (key !== null) {
        add(depsMap.get(key));
    }
    if (type === TriggerOpTypes.ADD) {
        add(depsMap.get(Array.isArray(target) ? 'length' : ''))
    }

    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler();
        } else {
            effect();
        }
    }
    // 计算属性优先于effect执行
    computedRunners.forEach(run);
    effects.forEach(run);
}