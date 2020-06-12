<template>
  <div id="app">
    <input type="text" v-model="newTodo" @keyup.enter="addtodo">
    <div v-for="(item,index) in todos" :key="item.id" :class="{ completed: item.completed }" @click="taggle(index)">
      {{ item.title }}
    </div>
    <p> 已完成数量： {{ done }}</p>
  </div>
</template>

<script>
import {ref, reactive, toRefs, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      newTodo:"",
        todos: [
        {id: 1, title: '钟馗', completed: true},
        {id: 2, title: '甄姬', completed: false},
        {id: 3, title: '瑶', completed: false},
        {id: 4, title: '程咬金', completed: false},
      ]
    })

    function addtodo(e) {
      state.todos.push({
        id: state.length + 1,
        title:state.newTodo,
        completed: false
      })
      state.newTodo = ""
    }

    function taggle(index) {
      state.todos[index].completed = !state.todos[index].completed
    }

    const done = computed(() => {
      return state.todos.filter(item => item.completed).length
    })

    return { ...toRefs(state), addtodo, done, taggle }
  }
}
</script>

<style>
div.completed {
  text-decoration: line-through;
  cursor: pointer;
}
</style>
