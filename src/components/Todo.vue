<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      v-if="!isEditing"
      :title="description"
      id="mainButton"
    >
      <span>{{ description }}</span>
    </button>
    <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <input
        type="text"
        class="form-control"
        v-model="newTodoDescription"
        @blur="finishEditing()"
        ref="newTodo"
      />
    </form>
    <button
      v-if="type == 'todo'"
      @click="startEditing()"
      class="btn btn-outline-primary border-0 ml-2"
      title="edit"
      id="editButton"
    >
      <span class="fa fa-edit"></span>
    </button>
    <button
      v-if="type == 'todo'"
      @click="$emit('on-toggle')"
      title="Mark as Done"
      class="btn btn-outline-secondary border-0"
      id="checkButton"
    >
      <span class="fa fa-check"></span>
    </button>
    <button
      v-else
      @click="$emit('on-toggle')"
      title="Mark as undone"
      class="btn btn-outline-secondary border-0"
      id="checkButton"
    >
      <span class="fa fa-check"></span>
    </button>
    <button
      @click="$emit('on-delete')"
      title="delete"
      class="btn btn-outline-danger border-0"
      id="deleteButton"
    >
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      isEditing: false,
      newTodoDescription: ""
    };
  },
  props: {
    description: String,
    completed: Boolean,
    type: String
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTodoDescription = this.description;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("on-edit", this.newTodoDescription);
    }
  }
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
</style>
