import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Notifications from '@/pages/Notifications.vue'
import Messages from '@/pages/Messages.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    title: '홈',
    icon: 'fa-solid fa-home fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/',
    name: 'explore',
    // component: Profile,
    title: '탐색하기',
    icon: 'fa-solid fa-hashtag fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    title: '알림',
    icon: 'fa-solid fa-bell fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    title: '쪽지',
    icon: 'fa-solid fa-envelope fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/',
    name: 'bookmaks',
    // component: ,
    title: '북마크',
    icon: 'fa-solid fa-bookmark fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/',
    name: 'list',
    // component: Messages,
    title: '리스트',
    icon: 'fa-solid fa-list-alt fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    title: '프로필',
    icon: 'fa-solid fa-user fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/',
    name: 'more',
    // component: Profile,
    title: '더보기',
    icon: 'fa-solid fa-ellipsis-h fa-fw text-2xl',
    meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { isMenu: false, layout: 'EmptyLayout' },
  },
  {
    path: '/login',
    component: Login,
    meta: { isMenu: false, layout: 'EmptyLayout' },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = store.state.user
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  if(requireAuth && !currentUser){
    next({ path: '/login' })
  } else {
    next() 
  }

})

export default router
