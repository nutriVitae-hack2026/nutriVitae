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
          <span class="label-text">Nome:</span>
          <input type="text" v-model="form.nome" required />
        </div>
        <div class="input-pill">
          <span class="label-text">Cpf:</span>
          <input type="text" v-model="form.cpf" placeholder="000.000.000-00" required />
        </div>
        <div class="input-pill">
          <span class="label-text">Peso:</span>
          <input type="text" v-model="form.peso" placeholder="00.000kg" required />
        </div>
        <div class="input-pill">
          <span class="label-text">Data de nascimento:</span>
          <input type="text" v-model="form.dataNascimento" placeholder="DD/MM/AAAA" required />
        </div>
      </div>

      <div class="form-col right-col">
        <div class="input-pill">
          <span class="label-text">E-mail:</span>
          <input type="email" v-model="form.email" required />
        </div>
        <div class="input-pill">
          <span class="label-text">Telefone:</span>
          <input type="text" v-model="form.telefone" placeholder="(00) 00000-0000" required />
        </div>
      </div>

      <div class="footer-passwords">
        <div class="input-pill btn-like">
          <span class="label-text">Criar senha:</span>
          <input type="password" v-model="form.senha" required />
        </div>
        <div class="input-pill btn-like">
          <span class="label-text">Confirmar senha:</span>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  nome: '',
  cpf: '',
  peso: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: ''
});

const submitCadastro = () => {
  if (form.senha && form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  const dadosUsuario = {
    nome: form.nome,
    cpf: form.cpf,
    peso: form.peso.includes('kg') ? form.peso : `${form.peso}kg`,
    dataNascimento: form.dataNascimento,
    email: form.email,
    telefone: form.telefone,
    senha: form.senha,
    preferencias: { gosto: [], naoGosto: [] },
    alergias: []
  };

  localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
  router.push('/perfil');
};
</script>

<style scoped>
.cadastro-wrapper {
  position: relative;
  width: calc(100% - 150px);
  max-width: 680px;
  margin: 30px auto 30px calc(150px + (100vw - 150px - 680px) / 2);
  padding: 0 20px;
}

.header-banner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.main-heading {
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 500;
  color: #73441B;
}

.welcome-badge {
  background-color: #73441B;
  padding: 14px 24px;
  border-radius: 0 0 0 35px;
  color: #F1EDD2;
}

.welcome-badge h2 {
  color: #F1EDD2;
  font-size: 1.25rem;
  text-align: right;
  line-height: 1.1;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

.form-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-col {
  margin-top: 18px;
}

.footer-passwords {
  grid-column: span 2;
  display: flex;
  gap: 20px;
  margin-top: 6px;
}

.input-pill {
  background-color: #D1BFA5;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.label-text {
  color: #333F34;
  font-weight: 600;
  font-size: 0.8rem;
}

.input-pill input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.8rem;
  color: #333F34;
  margin-left: 8px;
}

.btn-like {
  background-color: #9A9E70;
}

.action-bar {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

.btn-pill {
  background-color: #9A9E70;
  color: #333F34;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
}
</style>