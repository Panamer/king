// vue3.0 关于响应式几个核心的API 把这几个搞懂 响应式就明白了
import { reactive, ref, computed, effect } from './reactivity'

const state = reactive({
    name: '孙悟空',
    age: '500',
    brothers:['猪八戒', '沙悟净']
})

document.body.innerHTML = state.name;