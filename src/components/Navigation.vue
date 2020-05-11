<template>
  <div>
    <b-nav class="nav nav-tabs">
      <b-nav-item
        class="nav-item spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
        >{{ routes.text }}</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      links: [
        {
          id: 0,
          text: "Home",
          page: "/"
        },
        {
          id: 1,
          text: "TODOs",
          page: "/todo"
        },
        {
          id: 1,
          text: "Done TODOs",
          page: "/doneTodo"
        }
      ]
    };
  }
};
</script>
<style>
.spacing {
  margin-right: 10px;
}
</style>
