import { isObject } from "../shared/utils"
import { reactive } from "./reactive"
import { track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operation"

export function ref(value){
  return createRef(value)
}

function convert(rawValue){
  return isObject(rawValue) ? reactive(rawValue) : rawValue
}

function createRef(rawValue){
  let value = convert(rawValue)
  let r = {
    __v_isRef: true,
    get value() {
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal){
      if (hasChanged(newVal, rawValue)) {
        rawValue = newVal;
        value = newVal
        trigger(r, TriggerOpTypes.SET, 'value')
      }
    }
  }

  return r
}