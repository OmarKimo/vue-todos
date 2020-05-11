import Vue from 'vue'
import Router from 'vue-router'

import mainTodo from '@/components/mainTodo'
import doneTodo from '@/components/doneTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainTodo',
      component: mainTodo
    },
    {
      path: '/doneTodo',
      name: 'doneTodo',
      component: doneTodo
    }
  ]
})