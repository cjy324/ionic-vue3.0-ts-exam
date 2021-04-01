import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import { getGlobalState } from '@/stores'

const globalState = getGlobalState();

const routes: Array<RouteRecordRaw> = [
  {     //앨리어싱
    path: '/', //만약, path가 '/' 이렇게 들어올 경우 '/home/Main'으로 redirect
    redirect: '/home/Main'
  },
  {
    path: '/home/',  //'/home/'로 시작하면 
    component: Tabs,  //component: Tabs를 사용하라는 의미
    children: [
      {
        path: '',
        redirect: '/home/Main'
      },
      {
        path: 'main',
        component: () => import('@/views/home/Main.vue')
      },
    ]
  },
  {
    path: '/member/',
    component: Tabs,
    children: [
      { 
        path: '', 
        redirect: () => globalState.isLogined ? '/member/myPage' : '/member/login'
      },
      {
        path: 'login',
        component: () => import('@/views/member/Login.vue')
      },
      {
        path: 'join',
        component: () => import('@/views/member/Join.vue')
      },
      {
        path: 'myPage',
        component: () => import('@/views/member/MyPage.vue')
      },
    ]
  },
  {
    path: '/article/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/article/list'
      },
      {
        path: 'list',
        component: () => import('@/views/article/List.vue')
      },
      {
        path: 'detail',
        component: () => import('@/views/article/Detail.vue')
      },
      {
        path: 'write',
        component: () => import('@/views/article/Write.vue')
      },
      {
        path: 'modify',
        component: () => import('@/views/article/Modify.vue')
      },
    ]
  },
  {
    path: '/setting/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/setting/main'
      },
      {
        path: 'main',
        component: () => import('@/views/setting/Main.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
