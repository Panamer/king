import { isObject, hasOwn, hasChanged } from "../shared/utils";
import { reactive } from "./reactive";
import { trigger, track } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

const get = createGetter();
const set = createSetter();

function createGetter(){
    return function get(target, key, receiver){
        // 取值操作 target[key]
        const res = Reflect.get(target, key, receiver);
        console.log('get 取值', res, receiver);

        // 依赖收集
        track(target, TrackOpTypes.GET, key);
        // 如果获取到的值是对象 返回该对象的代理对象
        if (isObject(res)) {
            return reactive(res)
        }
        return res;
    }
}

/**
 * @receiver Proxy或者继承Proxy的对象
 */

function createSetter() {
    return function set(target, key, value, receiver){
        // 设置值的时候需要判断是修改属性还是新增属性.如果是修改属性且value和原来的值一样 什么都不做
        const hadkey = hasOwn(target, key);
        const oldValue = target[key];
        const res = Reflect.set(target, key, value, receiver);
        console.log("set 设置值");
        if (!hadkey) {
            // 新增
            trigger(target, TriggerOpTypes.ADD, key, value);
        } else if(hasChanged(value, oldValue)) {
            // 修改
            console.log('修改操作', value, oldValue);
            trigger(target, TriggerOpTypes.SET, key, value, oldValue)
        }
        // 值没有变化 什么都不用做
        return res
    }
}

// 对外暴露一个mutableHandler方法  提供了get 和 set
// 拦截普通对象和数组的处理   proxy handler 不只有get、set 还有其他很多方法
export const mutableHandler = {
    get,
    set
}