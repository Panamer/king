import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

export function computed(getterOrOptions) {
    // 因为计算属性可能是只传了get方法进来 也可能传一个对象 包含get、set
    // 声明两个变量 接收get、 set
    let getter;
    let setter;
    
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {}
    }else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    let dirty = true; // 计算属性默认dirty true  第一次取值 会执行getter方法

    let computed;
    // 计算属性是特殊的effect
    let runner = effect(getter, {
        lazy: true, // 懒执行
        computed: true, //  计算属性特有
        scheduler: () => {  // 计算属性依赖的值发生变化后 就会执行这个scheduler 从新计算结果
            if (!dirty) {
                dirty = true;
                trigger(computed, TriggerOpTypes.SET, 'value')
            }
        }
    })

    let value;

    computed = {
        get value(){
            if (dirty) {    // 依赖的值没有变化时 从缓存中读取 不再执行effect
                value = runner();   // 第一次取值 计算一次
                dirty = false;  //  计算完 立即把dirty置为false 下次走缓存
                track(computed, TrackOpTypes.GET, 'value')  // 记忆计算属性依赖 对应trigger
            }
            return value;
        }, 
        set value(newValue){
            setter(newValue);
        }
    }

    return computed;
}