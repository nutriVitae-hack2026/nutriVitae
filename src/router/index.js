import { createRouter, createWebHistory } from 'vue-router'
import CadastroSuporte from '@/views/Suporte/cadastroSuporte.vue'
import BuscarSuporte from '@/views/Suporte/buscarSuporte.vue'

const routes = [
  {
    path: '/',
    name: 'CadastroSuporte',
    component: CadastroSuporte,
  },
  {
    path: '/buscar-suporte',
    name: 'BuscarSuporte',
    component: BuscarSuporte
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
