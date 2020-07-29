// vue3.0 关于响应式几个核心的API 把这几个搞懂 响应式就明白了
import { reactive, ref, computed, effect } from './reactivity'

const state = reactive({
    name: '前端大镖客',
    age: '500',
    brothers: ['java', 'python']
})

const doubleAge = computed(() => state.age * 2)


effect(() => {
    document.body.innerHTML = `my name is ${state.name}, doubleAge is ${doubleAge.value}`;
})

console.log(ref(9));
// effect(() => {
//     document.body.innerHTML = `my name is ${state.name}, doubleAge is ${doubleAge}`;
// })

// state.name = "前端菜鸟"




// 写完reactive  effect
// 代码截止到现在 可以实现拦截数据 触发set get
// 但是还没实现数据改变 视图更新  因为没有mount方法, watchEffect没有被依赖收集 
// activeEffect为undefined  depsMap也是undefined

// 自定义effect默认会执行一次,当数据变化会再次被调用  更新视图

// watchEffect 和 effect 的区别: 
// effect是先记住这个依赖 不会立即执行 待值发生改变时 执行
// watchEffect是 初始化就会执行一次 待值发生改变时 还会执行
