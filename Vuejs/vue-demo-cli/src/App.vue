<template>
  <div id="app">
    <input :class="{ fixedInput: top>300}" type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <div
      v-for="(item,index) in todos"
      class="item-div"
      :key="item.id"
      :class="{ completed: item.completed }"
      @click="taggle(index)"
    >{{ item.title }}</div>
    <p>已完成数量： {{ done }}</p>
  </div>
</template>

<script>
// 如果不import 打包时就把代码丢掉 所谓的tree-shaking
import { ref, reactive, toRefs, computed } from "vue";

// composition api 很强大的一点 函数是可以拆分出去的，解决反复恒跳的问题 增加开发体验
// vue2只能用mixin，但是mixin会找不到源头 也会有重命名bug
import useAddTodo from "./addTodo";
import useScroll from "./useScroll";

export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: [
        { id: 1, title: "钟馗", completed: true },
        { id: 2, title: "甄姬", completed: false },
        { id: 3, title: "瑶", completed: false },
        { id: 4, title: "程咬金", completed: false }
      ]
    });

    function taggle(index) {
      state.todos[index].completed = !state.todos[index].completed;
    }

    const done = computed(() => {
      return state.todos.filter(item => item.completed).length;
    });

    // 任何数据的来源都很清晰， mixin是做不到的
    const addTodo = useAddTodo(state);
    const { top } = useScroll();

    return { ...toRefs(state), addTodo, done, taggle, top };
  }
};
</script>

<style>
div.completed {
  text-decoration: line-through;
  cursor: pointer;
}
input.fixedInput {
  position: fixed;
  top: 0;
  left: 0;
  width: 600px;
  height: 30px;
  border-color: brown;
}
div.item-div{
  height: 300px;
}
</style>
