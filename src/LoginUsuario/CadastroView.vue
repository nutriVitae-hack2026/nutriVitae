<template>
  <div class="cadastro-wrapper">
    <div class="header-banner">
      <h1 class="serif-title main-heading">Cadastro de<br>usuário</h1>
      <div class="welcome-badge">
        <h2 class="serif-title">Bem-vindo<br>Ao NutriVitae</h2>
      </div>
    </div>

    <form @submit.prevent="submitCadastro" class="form-grid">
      <div class="form-col">
        <div class="input-pill">
          <span>Nome:</span>
          <input type="text" v-model="form.nome" required />
        </div>
        <div class="input-pill">
          <span>Cpf:</span>
          <input type="text" v-model="form.cpf" placeholder="000.000.000-00" required />
        </div>
        <div class="input-pill">
          <span>peso:</span>
          <input type="text" v-model="form.peso" placeholder="00.000kg" required />
        </div>
        <div class="input-pill">
          <span>Data de nascimento:</span>
          <input type="text" v-model="form.dataNascimento" placeholder="DD/MM/AAAA" required />
        </div>
      </div>

      <div class="form-col right-col">
        <div class="input-pill">
          <span>E-mail:</span>
          <input type="email" v-model="form.email" required />
        </div>
        <div class="input-pill">
          <span>Telefone:</span>
          <input type="text" v-model="form.telefone" placeholder="(00) 00000-0000" required />
        </div>
      </div>

      <div class="form-row footer-passwords">
        <div class="input-pill btn-like">
          <span>Criar senha:</span>
          <input type="password" v-model="form.senha" required />
        </div>
        <div class="input-pill btn-like">
          <span>Confirmar senha:</span>
          <input type="password" v-model="form.confirmarSenha" required />
        </div>
      </div>

      <div class="action-bar">
        <button type="submit" class="btn-pill">Cadastrar e Entrar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['salvar-cadastro']);

const form = reactive({
  nome: '',
  cpf: '',
  peso: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
  idade: '',
  preferencias: {
    gosto: [],
    naoGosto: []
  },
  alergias: []
});

const submitCadastro = () => {
  if (form.senha && form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  emit('salvar-cadastro', {
    ...form,
    idade: form.idade || 'Não informada'
  });
};
</script>

<style scoped>
.cadastro-wrapper {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
}

.header-banner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.main-heading {
  font-size: 1.75rem;
  line-height: 1.1;
  font-weight: 500;
}

.welcome-badge {
  background-color: var(--dark-brown-header);
  padding: 14px 24px;
  border-radius: 0 0 0 40px;
  color: #FFF;
  margin-top: -24px;
  margin-right: -40px;
}

.welcome-badge h2 {
  color: #FFF;
  font-size: 1.2rem;
  text-align: right;
  line-height: 1.1;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  margin-top: 4px;
}

.form-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.right-col {
  margin-top: 20px;
}

.footer-passwords {
  grid-column: span 2;
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.btn-like {
  background-color: var(--green-box);
}

.action-bar {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>