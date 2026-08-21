import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa a configuração do router/index.js

const app = createApp(App)

app.use(router) // OBRIGATÓRIO: ativa o roteador na aplicação

app.mount('#app')