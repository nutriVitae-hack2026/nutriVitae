import { createRouter, createWebHistory } from 'vue-router'
import preferenciasComponentes from '../components/preferencias/preferenciasComponentes.vue'
import bucarComponentes from '../components/preferencias/bucarComponentes.vue'
import editarComponentes from '../components/preferencias/editarComponentes.vue'

const routes = [
  {
    path: '/',
    name: 'preferenciasComponentes',
    component: preferenciasComponentes,
  },
  {
    path: '/buscar',
    name: 'buscarComponentes',
    component: bucarComponentes,
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
