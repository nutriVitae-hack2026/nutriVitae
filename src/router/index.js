import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/sobreNos/bannerHome.vue'
import siteObjetivo from '@/components/sobreNos/siteObjetivo.vue'
import membrosEquipe from '@/components/sobreNos/membrosEquipe.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'home',
    component: HomeView,
  },
    {
    path: '/sobreNos',
    name: 'siteObjetivo',
    component: siteObjetivo,
  },
    {
    path: '/membros',
    name: 'membrosEquipe',
    component: membrosEquipe,
  }
  ],
})

export default router
