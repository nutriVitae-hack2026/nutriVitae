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
    },
    {
      path: "/profissional/:id/edit",
      name: "edit-perfil-profissional",
      component: () => import('@/components/profissional/edit/editProfissional.vue'),
    },
    {
      path: "/profissional/:id/delete",
      name: "delete-perfil-profissional",
      component: () => import('@/components/profissional/delete/deleteProfissional.vue'),
    }
  ],
})

export default router
