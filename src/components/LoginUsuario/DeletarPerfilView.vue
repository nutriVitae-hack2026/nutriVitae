<template>
  <div class="deletar-container">
    <div class="header-deletar">
      <div class="avatar-box">
        <img src="https://via.placeholder.com/100" alt="Foto do usuário" />
      </div>
      <div class="titles">
        <h1 class="serif-title">Deletar Perfil</h1>
        <h2 class="serif-title user-name">{{ usuario.nome || 'Usuário' }}</h2>
      </div>
    </div>

    <div class="info-row">
      <div class="input-pill">
        <span><strong class="label-text">peso:</strong> {{ usuario.peso }}</span>
      </div>
      <div class="input-pill">
        <span><strong class="label-text">Telefone:</strong> {{ usuario.telefone }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="input-pill small-pill">
        <span><strong class="label-text">Data de nascimento:</strong> {{ usuario.dataNascimento }}</span>
      </div>
    </div>

    <div class="cards-grid">
      <div class="card-box green-card">
        <h3 class="card-title label-text">Preferencias</h3>
        <hr class="card-divider" />
        <p class="section-subtitle label-text">gosto:</p>
        <ul>
          <li v-if="!usuario.preferencias?.gosto?.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.preferencias?.gosto" :key="i">• {{ item }}</li>
        </ul>
        <p class="section-subtitle mt-2 label-text">Não gosta</p>
        <ul>
          <li v-if="!usuario.preferencias?.naoGosto?.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.preferencias?.naoGosto" :key="i">• {{ item }}</li>
        </ul>
      </div>

      <div class="card-box green-card">
        <h3 class="card-title label-text">Alergias</h3>
        <hr class="card-divider" />
        <ul>
          <li v-if="!usuario.alergias?.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.alergias" :key="i">• {{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="actions-bar">
      <button class="btn-pill btn-custom" @click="router.push('/perfil')">Cancelar a exclusão</button>
      <button class="btn-pill btn-custom" @click="abrirModal = true">
        Excluir Perfil 🗑️
      </button>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="abrirModal" class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-icon">🗑️</div>
        <h2>Excluir Perfil</h2>
        
        <div class="input-modal">
          <input 
            type="password" 
            v-model="senhaConfirmacao" 
            placeholder="Digite sua senha para confirmar exclusão:" 
          />
        </div>

        <div class="modal-actions">
          <button class="btn-pill btn-custom" @click="abrirModal = false">Cancelar a exclusão</button>
          <button class="btn-pill btn-custom" @click="confirmarExclusao">Confirmar Exclusão</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const abrirModal = ref(false);
const senhaConfirmacao = ref('');

const usuario = reactive({
  nome: '',
  peso: '',
  telefone: '',
  dataNascimento: '',
  senha: '',
  preferencias: { gosto: [], naoGosto: [] },
  alergias: []
});

onMounted(() => {
  const dadosSalvos = localStorage.getItem('usuarioLogado');
  if (dadosSalvos) {
    Object.assign(usuario, JSON.parse(dadosSalvos));
  }
});

const confirmarExclusao = () => {
  if (!senhaConfirmacao.value) {
    alert('Por favor, digite sua senha.');
    return;
  }

  if (usuario.senha && senhaConfirmacao.value !== usuario.senha) {
    alert('Senha incorreta! Não foi possível excluir a conta.');
    return;
  }

  localStorage.removeItem('usuarioLogado');
  alert('Conta excluída com sucesso.');
  router.push('/cadastro');
};
</script>

<style scoped>
.deletar-container {
   position: relative;
  min-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.header-deletar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.avatar-box img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.titles h1, .titles h2 {
  color: #73441B;
}

.info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.input-pill {
  background-color: #D1BFA5;
  border-radius: 8px;
  padding: 20px 12px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  color: #73441B;
  font-size: 15px;
  width: 50%;
   margin-bottom: 20px;
}

.label-text {
  color: #333F34;
  font-weight: 600;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 14px;
}

.green-card {
  background-color: #9A9E70;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  color: #F1EDD2;
  font-size: 0.75rem;
}

.card-title {
  text-align: center;
  font-size: 0.85rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #536236;
  margin: 6px 0 8px 0;
}

ul {
  list-style: none;
  padding-left: 0;
}

.mt-2 {
  margin-top: 8px;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.btn-pill {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
}

.btn-custom {
  background-color: #9A9E70;
  color: #333F34;
}

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-card {
  background-color: #9A9E70;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  color: #333F34;
}

.input-modal input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #D1BFA5;
  color: #333F34;
  font-size: 0.75rem;
  margin-bottom: 20px;
}

.input-modal input::placeholder {
  color: #333F34;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>    