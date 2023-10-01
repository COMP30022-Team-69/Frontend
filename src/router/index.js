// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/LoginPage.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "home" */ '@/views/UserProfile.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterPage.vue')
      },
      {
        path: '/admin/user',
        name: 'User Manager',
        component: () => import(/* webpackChunkName: "home" */ '@/views/UserManagePage.vue')
      },
      {
        path: '/admin/song',
        name: 'Song Manager',
        component: () => import(/* webpackChunkName: "home" */ '@/views/SongManagePage.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
