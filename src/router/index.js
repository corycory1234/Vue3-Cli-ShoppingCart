import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/login',
    component: () => import('../views/LoginAcct.vue')
  },
  {
    // (4)因為DashBoard.vue 裡面要有Products.vue, 所以要給巢狀路由
    path: '/DashBoard',
    component: () => import('../views/DashBoard.vue'),
    children: [{
      // 記得children下的path，不用「/」
      path: 'Products',
      component: () => import('../views/ProductsAll.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
