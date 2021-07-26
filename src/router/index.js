import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
/*   {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
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
