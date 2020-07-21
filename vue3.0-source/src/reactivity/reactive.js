import {isObject} from '../shared/utils'
import {mutableHandler} from './baseHandlers'

export function reactive(target){
    // 目标对象可能不是object类型 判断一下
    if (!isObject(target)) {
        return
    }
    // 创建一个响应式对象 proxy不同于defineProperty  它有返回值
    const observed = new Proxy(target, mutableHandler)
    return observed;
}