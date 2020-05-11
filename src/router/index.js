import Vue from "vue";
import Router from "vue-router";

import home from "@/components/home";
import todoList from "@/components/TodoList";
import doneList from "@/components/doneList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: home
    },
    {
      path: "/todo",
      name: "TodoList",
      component: todoList
    },
    {
      path: "/doneTodo",
      name: "doneList",
      component: doneList
    }
  ]
});
