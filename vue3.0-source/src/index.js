// vue3.0 关于响应式几个核心的API 把这几个搞懂 响应式就明白了
import { reactive, ref, computed, effect } from './reactivity'

const state = reactive({
    name: '孙悟空',
    age: '500',
    brothers:['猪八戒', '沙悟净']
})

document.body.innerHTML = state.name;

state.name = "唐僧"




// 写完reactive  effect
// 代码截止到现在 可以实现拦截数据 触发set get
// 但是还没实现数据改变 视图更新  因为没有mount方法, watchEffect没有被依赖收集 activeEffect为undefined  depsMap也是undefined