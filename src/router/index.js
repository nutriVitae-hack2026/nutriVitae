import { createRouter, createWebHistory } from 'vue-router'
import agendamento from '../components/consultas/agendamentoComponent.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'agendamentoComponent',
            component: agendamento
        },
         {
            path: '/resumo',
            name: 'resumoComponent',
            component: () => import('../components/consultas/resumoComponent.vue')
        },
        {
            path: '/buscar',
            name: 'buscarComponent',
            component: () => import('../components/consultas/buscarComponent.vue')
        },
    ]
})

export default router
