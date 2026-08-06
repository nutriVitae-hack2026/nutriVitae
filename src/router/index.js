import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/homeView.vue';


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
   {
      path: "/profissionais",
      name: "profissionais",
      component: () => import('@/view/profissionaisView.vue'),
    },
    {
      path: "/profissional/:id",
      name: "perfil-profissional",
      component: () => import('@/view/perfilProfissionalView.vue'),
    }
  ],
})

export default router
