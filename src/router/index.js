import { createRouter, createWebHistory } from 'vue-router'
import agendamento from '../components/consultas/agendamentoComponent.vue'
import resumo from '../components/consultas/resumoComponent.vue'
import buscar from '../components/consultas/buscarComponent.vue'
import editar from '../components/consultas/editarComponent.vue'
import excluir from '../components/consultas/excluirComponent.vue'

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
            component: resumo
        },
        {
            path: '/buscar',
            name: 'buscarComponent',
            component: buscar
        },
          {
            path: '/editar',
            name: 'editarComponent',
            component: editar
        },
        {
            path: '/excluir',
            name: 'excluirComponent',
            component: excluir
        }
    ]
})

export default router
