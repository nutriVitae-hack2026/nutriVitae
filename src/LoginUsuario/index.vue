<template>
  <div class="full-container">
    <main class="main-content">
      <CadastroView 
        v-if="telaAtual === 'cadastro'" 
        @salvar-cadastro="aoCadastrar" 
      />

      <PerfilView 
        v-else-if="telaAtual === 'perfil'" 
        :usuario="dadosUsuario" 
        @navegar="mudarTela" 
      />

      <EditarPerfilView 
        v-else-if="telaAtual === 'editar'" 
        :usuario="dadosUsuario" 
        @salvar-edicao="aoAtualizar" 
      />

      <DeletarPerfilView 
        v-else-if="telaAtual === 'deletar'" 
        :usuario="dadosUsuario" 
        @navegar="mudarTela" 
        @confirmar-exclusao="aoExcluir" 
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CadastroView from './CadastroView.vue';
import PerfilView from './PerfilView.vue';
import EditarPerfilView from './EditarPerfilView.vue';
import DeletarPerfilView from './DeletarPerfilView.vue';

const usuarioCadastrado = ref(false);
const telaAtual = ref('cadastro');
const dadosUsuario = ref(null);

const aoCadastrar = (dados) => {
  dadosUsuario.value = dados;
  usuarioCadastrado.value = true;
  telaAtual.value = 'perfil';
};

const aoAtualizar = (dadosNovos) => {
  dadosUsuario.value = { ...dadosUsuario.value, ...dadosNovos };
  telaAtual.value = 'perfil';
};

const aoExcluir = () => {
  dadosUsuario.value = null;
  usuarioCadastrado.value = false;
  telaAtual.value = 'cadastro';
  alert('Perfil excluído com sucesso!');
};

const mudarTela = (novaTela) => {
  if (!usuarioCadastrado.value) {
    telaAtual.value = 'cadastro';
    return;
  }
  telaAtual.value = novaTela;
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

:root {
  --bg-main: #ECE3CA;
  --dark-brown-header: #5C3214;
  --input-bg: #C3B199;
  --green-box: #8E996C;
  --green-light: #A9B78D;
  --shadow-soft: 2px 3px 6px rgba(0, 0, 0, 0.18);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

body, html, #app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: var(--bg-main);
}

.full-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-main);
  position: relative;
  justify-content: center;
}

.main-content {
  flex: 1;
  padding: 25px 35px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.serif-title {
  font-family: 'Playfair Display', serif;
  color: var(--dark-brown-header);
}

.input-pill {
  background-color: var(--input-bg);
  border-radius: 8px;
  padding: 8px 14px;
  box-shadow: var(--shadow-soft);
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2b2118;
  font-weight: 500;
  font-size: 0.72rem;
  width: 100%;
}

.input-pill input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.72rem;
  color: #2b2118;
  margin-left: 5px;
}

.card-green {
  background-color: var(--green-box);
  border-radius: 10px;
  padding: 12px;
  color: #232B13;
  box-shadow: var(--shadow-soft);
  font-size: 0.75rem;
}

.btn-pill {
  background-color: var(--green-box);
  color: #1a220c;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s, opacity 0.2s;
}

.btn-pill:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}
</style>