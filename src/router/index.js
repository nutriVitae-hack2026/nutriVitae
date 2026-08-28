import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/view/homeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/',
    },

    // --- AUTENTICAÇÃO E PERFIL DO USUÁRIO/PACIENTE ---
    {
      path: '/login',
      name: 'login-usuario',
      component: () => import('@/components/LoginUsuario/index.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/components/LoginUsuario/CadastroView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/components/LoginUsuario/PerfilView.vue'),
    },
    {
      path: '/perfil/deletar',
      name: 'deletar-perfil',
      component: () => import('@/components/LoginUsuario/DeletarPerfilView.vue'),
    },

    // --- PROFISSIONAIS ---
    {
      path: '/cadastro-profissional',
      name: 'cadastro-profissional',
      component: () => import('@/components/profissional/cadastroProfissional.vue'), // Adicionado para o botão "Cadastrar nutricionista"
    },
    {
      path: '/profissionais',
      name: 'profissionais',
      component: () => import('@/view/profissionaisView.vue'),
    },
    {
      path: '/profissional/:id',
      name: 'perfil-profissional',
      component: () => import('@/view/perfilProfissionalView.vue'),
    },
    {
      path: '/profissional/:id/edit',
      name: 'edit-perfil-profissional',
      component: () => import('@/components/profissional/edit/editProfissional.vue'),
    },
    {
      path: '/profissional/:id/delete',
      name: 'delete-perfil-profissional',
      component: () => import('@/components/profissional/delete/deleteProfissional.vue'),
    },

    // --- CONSULTAS E AGENDAMENTOS ---
    {
      path: '/consultas',
      name: 'consultas',
      component: () => import('@/components/consultas/buscarComponent.vue'),
    },
    {
      path: '/consultas/:id/agendamento',
      alias: '/agendamento',
      name: 'agendamentoComponent',
      component: () => import('@/components/consultas/agendamentoComponent.vue'),
    },
    {
      path: '/consultas/:id/buscar',
      alias: '/buscar',
      name: 'buscarComponent',
      component: () => import('@/components/consultas/buscarComponent.vue'),
    },
    {
      path: '/consultas/:id/editar',
      alias: '/editar',
      name: 'editarComponent',
      component: () => import('@/components/consultas/editarComponent.vue'),
    },
    {
      path: '/consultas/:id/excluir',
      alias: '/excluir',
      name: 'excluirComponent',
      component: () => import('@/components/consultas/excluirComponent.vue'),
    },
    {
      path: '/consultas/:id/resumo',
      alias: '/resumo',
      name: 'resumoComponent',
      component: () => import('@/components/consultas/resumoComponent.vue'),
    },

    // --- PRATOS E RECEITAS ---
    {
      path: '/pratos/:id/cadastro',
      name: 'cadastro-prato',
      component: () => import('@/components/pratos/cadastroComponents.vue'),
    },
    {
      path: '/pratos/receitas',
      name: 'receitas',
      component: () => import('@/components/pratos/cadastroComponents.vue'),
    },
    {
      path: '/pratos/buscar',
      name: 'buscar-pratos',
      component: () => import('@/components/pratos/buscarComponents.vue'),
    },
    {
      path: '/pratos/ver-prato',
      name: 'ver-prato',
      component: () => import('@/components/pratos/buscarComponents.vue'),
    },
    {
      path: '/pratos/:id/buscar',
      name: 'buscar-pratos-id',
      component: () => import('@/components/pratos/buscarComponents.vue'),
    },

    // --- REDIRECIONAMENTO PADRÃO ---
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;