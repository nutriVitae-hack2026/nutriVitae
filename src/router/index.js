import { createRouter, createWebHistory } from 'vue-router'
import CadastroConsulta from '@/views/consulta/cadastroConsulta.vue'
import BuscarConsulta from '@/views/consulta/buscarConsulta.vue'

const routes = [
  {
    path: '/',
    name: 'CadastroConsulta',
    component: CadastroConsulta,
  },
  {
    path: '/buscar-consulta',
    name: 'BuscarConsulta',
    component: BuscarConsulta
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
