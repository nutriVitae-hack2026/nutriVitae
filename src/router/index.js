import { createRouter, createWebHistory } from 'vue-router'

import cadastroComponentes from '@/components/preferencias/cadastroComponentes.vue'
import buscarComponentes from '@/components/preferencias/buscarComponentes.vue'
import editarComponentes from '@/components/preferencias/editarComponentes.vue'

const routes = [
  {
    path: '/',
    name: 'cadastroComponentes',
    component: cadastroComponentes,
  },
  {
    path: '/buscar',
    name: 'buscarComponentes',
    component: buscarComponentes,
  },
  {
    path: '/editar',
    name: 'editarComponentes',
    component: editarComponentes,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router