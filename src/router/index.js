import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import HelloWorld from '@/components/HelloWorld'
import Title from '@/components/Title'
import Top from '@/components/Top'
import Signup from '@/components/Signup'
import Add from '@/components/Add'


Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/title',
      name: 'Title',
      component: Title
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
})
