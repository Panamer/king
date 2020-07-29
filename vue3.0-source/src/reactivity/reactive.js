/**
 * reactive  利用proxy实现  取代了Object.defineProperty 性能提升很明显
 * @baseHandlers  代理相关逻辑
 */
import {isObject} from '../shared/utils'
import {mutableHandler} from './baseHandlers'

export function reactive(target){
    // 目标对象可能不是object类型 判断一下  不是对象直接返回即可
    if (!isObject(target)) {
        return target;
    }
    console.log("数据响应式");
    // 创建一个响应式对象 proxy不同于defineProperty  它有返回值
    const observed = new Proxy(target, mutableHandler)
    return observed;
}