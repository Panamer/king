export default function (state) {
  function addtodo() {
    state.todos.push({
      id: state.length + 1,
      title: state.newTodo,
      completed: false
    });
    state.newTodo = "";
  }
  return { addtodo }
}