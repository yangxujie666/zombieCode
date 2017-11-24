import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import list from '@/pages/list'
import analysis from '@/pages/analysis'
import newList from '@/pages/newList'
import details from '@/pages/details'

Vue.use(Router)
export default new Router({
  //mode:'history',//默认hask，路径里带#号
  routes: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/list',
          name: 'list',
          component: list
        },
       {
          path: '/analysis',
          name: 'analysis',
          component: analysis
       },
      {
        path: '/newList',
        name: 'newList',
        component: newList
      },
      {
        path: '/details/:id/:name',
        name: 'details',
        component: details
      }
  ]
})
