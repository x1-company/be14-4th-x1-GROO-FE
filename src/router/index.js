import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import BackgroundImage from '@/components/BackgroundImage.vue'
import WriteDiary from '../components/WriteDiary.vue'
import ViewDiary from '../components/ViewDiary.vue'
import ForestMate from '../views/ForestMate.vue'
import ForestView from '../components/ForestView.vue'
import MyItemView from '../components/MyItemView.vue'
import Guestbook from '../components/GuestBook.vue'
import Login from '@/components/Login.vue'

const routes = [
  {
    path: '/',
    component: Main, // Main은 레이아웃 역할
    children: [
      {
        path: '', // / => BackgroundImage
        component: BackgroundImage
      },
      {
        path: 'writediary',
        component: WriteDiary
      },
      {
        path: 'viewdiary',
        component: ViewDiary
      },
      {
        path: 'forestmate',
        component: ForestMate
      },
      {
        path: 'forestview',
        component: ForestView
      },
      {
        path: 'myitemview',
        component: MyItemView
      },
      {
        path: 'guestbook',
        component: Guestbook
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router