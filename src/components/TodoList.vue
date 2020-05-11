<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>My TODOs</h1>
      </div>
    </div>
    <div v-if="todos.length < 1">
      <h3 class="text-justify">No TODOs in your list yet</h3>
      <br />
    </div>
    <div class="row mb-3">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            type="todo"
            v-for="(todo, index) in todos"
            :key="index"
            :description="todo.description"
            :completed="false"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import CreateTodo from "./CreateTodo.vue";

export default {
  name: "TodoList",
  props: {
    listName: String
  },
  data() {
    return {
      todos: []
    };
  },
  mounted() {
    if (localStorage.getItem("todos")) {
      try {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      } catch (e) {
        localStorage.removeItem("todos");
      }
    }
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ description: newTodo, completed: false });
      this.saveToDos();
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
      let doneTodos = null;
      try {
        doneTodos = JSON.parse(localStorage.getItem("doneTodos"));
        doneTodos.push(todo);
      } catch (e) {
        doneTodos = [todo];
      }
      const parsed = JSON.stringify(doneTodos);
      localStorage.setItem("doneTodos", parsed);
      this.todos.splice(todo, 1);
      this.saveToDos();
    },
    deleteTodo(deletedTodo) {
      this.todos.splice(deletedTodo, 1);
      this.saveToDos();
    },
    editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
      this.saveToDos();
    },
    saveToDos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos", parsed);
    }
  },
  components: { Todo, CreateTodo }
};
</script>

<style scoped lang="scss"></style>
