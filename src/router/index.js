import { createRouter, createWebHistory } from 'vue-router'
import CadastroCoponents from '@/components/suporte/cadastroCoponents.vue'

const routes = [
  {
    path: '/',
    name: 'cadastroComponents',
    component: CadastroCoponents,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
