import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import login from '../views/login/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
/*   {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  } */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
