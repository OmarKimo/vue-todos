<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>Done TODOs</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in doneTodos"
            :key="index"
            :description="todo.description"
            :completed="true"
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

export default {
  name: 'doneTodo',
  props: {
    listName: String
  },
  data() {
    return {
      doneTodos: []
    };
  },
  mounted() {
    if (localStorage.getItem('doneTodos')) {
      try {
        this.doneTodos = JSON.parse(localStorage.getItem('doneTodos'));
      } catch(e) {
        localStorage.removeItem('doneTodos');
      }
    }
  },
  methods: {
    toggleTodo(todo) {
        todo.completed = !todo.completed;
        let todos = null;
        try{
            todos = JSON.parse(localStorage.getItem('todos'));
            todos.push(todo);
        }
        catch(e){
            todos = [todo]
        }
        const parsed = JSON.stringify(todos);
        localStorage.setItem('todos', parsed);
        this.doneTodos.splice(todo, 1);
        this.saveToDos();
    },
    deleteTodo(deletedTodo) {
      this.doneTodos.splice(deletedTodo, 1);
      this.saveToDos();
    },
    editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
      this.saveToDos();
    },
    saveToDos(){
      const parsed = JSON.stringify(this.doneTodos);
      localStorage.setItem('doneTodos', parsed);
    }
  },
  components: { Todo }
};
</script>

<style scoped lang="scss"></style>