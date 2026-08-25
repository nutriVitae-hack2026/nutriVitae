import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/homeView.vue';


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: HomeView,
  }
  ],
})

export default router
