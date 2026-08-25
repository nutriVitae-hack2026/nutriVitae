import { createRouter, createWebHistory } from 'vue-router'
import AcademicPage from '../views/AcademicPage.vue'

const routes = [
  {
    path: '/academico',
    name: 'Academic',
    component: AcademicPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router