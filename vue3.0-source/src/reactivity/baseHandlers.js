import { isObject, hasOwn, hasChanged } from "../shared/utils";
import { reactive } from "./reactive";
import { trigger, track } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

const get = createGetter();
const set = createSetter();

function createGetter(){

}

function createSetter() {

}

// 对外暴露一个mutableHandler方法  提供了get 和 set
export const mutableHandler = {
    get,
    set
}