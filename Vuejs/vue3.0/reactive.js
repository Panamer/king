/**
 * proxy 可以拦截所有的操作 不需要$set
 * 支持全部的数据格式，包括数组
 * 懒收集
 * 自带能力
 * 
 * 
 * defineProperty
 * 初始化的时候，全部递归完毕
 * 数组需要单独拦截
 * 对象新增和删除属性，不能拦截。 所以需要 $set  $delete
 */

const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key)
    // 尝试获取obj.key, 触发了getter
    track(target, key)

    return typeof res === 'object' ? reactive(res) : res
  },
  set(target, key, val) {
    const info = { oldValue: target[key], newValue: val }

    const res = Reflect.set(target, key, val)
    // 响应式去通知变化 触发执行effect
    trigger(target, key, info)
  }
}

function reactive(target) {
  const observed = new Proxy(target, baseHandler)
  //  返回paoxy代理后的对象
  return observed
}

function computed(fn) {
  // 特殊的effect
  const runner = effect(fn, { computed: true, lazy: true })
  return {
    effect: runner,
    get value() {
      return runner()
    }
  }
}
function effect(fn, options = {}) {
  // 依赖函数
  let e = createReactiveEffect(fn, options)
  // lazy是computed配置的
  if (!options.lazy) {
    // 不是懒执行
    e()
  }
  return e
}

function createReactiveEffect(fn, options) {
  // 构造固定格式的effect
  const effect = function effect(...args) {
    return run(effect, fn, args)
  }
  // effect的配置
  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy

  return effect
}

function run(effect, fn, args) {
  // 执行effect
  // 取出effect 执行
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect)
      return fn(...args) // 执行effect
    } finally {
      effectStack.pop() // 执行完毕
    }
  }
}

//  存储effect
let effectStack = []
let targetMap = new WeakMap()
function track(target, key) {
  // 收集依赖
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depMap = targetMap.get(target)
    if (depMap === undefined) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if (dep===undefined) {
      dep = new Set()
      depMap.set(key, dep)
    }
    if (!dep.has(effect)) {
      // 新增依赖
      // 双向存储 方便查找优化
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}

function trigger(target, key, info) {
  // 数据变化后， 通知更新执行effect
  // 1、找到依赖
  const depMap = targetMap.get(target)
  if (depMap === undefined) {
    return
  }
  // 分开， 普通的effect和computed 有一个优先级
  // effects先执行， computed后执行
  // 因为computed会可能依赖普通的effects
  const effects = new Set()
  const computedRunners = new Set()
  if (key) {
    let deps = depMap.get(key)
    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
    effects.forEach(effect => effect())
    computedRunners.forEach(computed => computed())
  }
}