import { createRouter, createWebHistory } from 'vue-router'
import cadastroComponents from '../components/suporte/cadastroCoponents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cadastroComponents',
      component: cadastroComponents,
    }
  ],
})

export default router
