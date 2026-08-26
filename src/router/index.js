import { createRouter, createWebHistory } from 'vue-router'
import cadastroComponents from '../components/pratos/cadastroComponents.vue'
import buscarComponents from '../components/pratos/buscarComponents.vue'
import verComponents from '../components/verComponents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
            path: '/',
            name: 'cadastroComponents',
            component: cadastroComponents
        },
  
           {
            path: '/buscar',
            name: 'buscarComponents',
                component: buscarComponents
        },

        {
          path: '/ver-prato',
          name: 'verComponents',
          component: verComponents
        },
        
      
  ],
})

export default router
