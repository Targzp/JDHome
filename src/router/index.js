import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  },
  {
    path: '/cartlist',
    name: 'CartList',
    component: () => import('../views/cartlist/CartList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    // beforeEnter 跳转到指定路由前执行的函数
    // 以下路由拦截主要功能是防止已登录进入首页后再去跳转登录页面，如果未登录则正常跳转
    beforeEnter: (to, from, next) => {
      const { islogin } = localStorage
      islogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter: (to, from, next) => {
      const { islogin } = localStorage
      islogin ? next({ name: 'Home' }) : next()
    }
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

// beforeEach 每一次路由跳转都会执行的方法
// to要跳转到的路由，from 跳转前的路由，next 执行默认或指定路由跳转
// 以下路由拦截功能主要是防止没有登录情况下访问首页，如果是去登录页或注册页或已登录则正常跳转
router.beforeEach((to, from, next) => {
  const { islogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (islogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
