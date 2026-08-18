import { createRouter, createWebHistory } from 'vue-router'
import CadastroComponents from '@/components/suporte/cadastroComponents.vue'
import buscarComponets from '@/components/suporte/buscarComponets.vue'

const routes = [
  {
    path: '/',
    name: 'CadastroComponents',
    component: CadastroComponents,
  },
  {
    // * ERRO: rota definida '/buscar-consulta' difere da rota usada '/buscarComponents' no componente
    path: '/buscaComponents',
    name: 'buscarComponents',
    component: buscarComponets,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
