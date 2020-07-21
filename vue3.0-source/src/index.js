import { reactive, ref, computed, effect } from './reactivity'

const state = reactive({
    name: '孙悟空',
    age: '500',
    brothers:['猪八戒', '沙悟净']
})

console.log(state.age)