import { createRouter, createWebHistory } from 'vue-router'
import CadastroSuporte from '@/views/Suporte/cadastroSuporte.vue'
import BuscarSuporte from '@/views/Suporte/buscarSuporte.vue'
import PerfilSuporte from '@/views/Suporte/perfilSuporte.vue'

const routes = [
  {
    path: '/CadastroSuporte',
    name: 'CadastroSuporte',
    component: CadastroSuporte,
  },
  {
    path: '/buscar-suporte',
    name: 'BuscarSuporte',
    component: BuscarSuporte
  },
  {
    path: '/perfilSuporte/:id',
    name: 'PerfilSuporte',
    component: PerfilSuporte
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
