<template>
  <div class="deletar-container">
    <div class="profile-header">
      <div>
        <h1 class="serif-title title-delete">Deletar Perfil</h1>
        <h2 class="serif-title user-name">{{ usuario.nome || 'Usuário' }}</h2>
      </div>
    </div>

    <div class="info-row">
      <div class="input-pill info-box"><span>Cpf: {{ usuario.cpf || 'N/A' }}</span></div>
      <div class="input-pill info-box"><span>E-mail: {{ usuario.email || 'N/A' }}</span></div>
    </div>

    <div class="info-row">
      <div class="input-pill info-box"><span>peso: {{ usuario.peso || 'N/A' }}</span></div>
      <div class="input-pill info-box"><span>Telefone: {{ usuario.telefone || 'N/A' }}</span></div>
    </div>

    <div class="info-row">
      <div class="input-pill info-box small-box"><span>Data de nascimento: {{ usuario.dataNascimento || 'N/A' }}</span></div>
    </div>

    <div class="cards-grid">
      <div class="card-green">
        <h3 class="card-title">Preferencias</h3>
        <hr class="card-divider" />
        <p><strong>gosto:</strong></p>
        <ul>
          <li v-for="p in usuario.preferencias?.gosto" :key="p">• {{ p }}</li>
          <li v-if="!usuario.preferencias?.gosto?.length">• Não registrado</li>
        </ul>
        <p class="mt-2"><strong>Não gosta</strong></p>
        <ul>
          <li v-for="np in usuario.preferencias?.naoGosto" :key="np">• {{ np }}</li>
          <li v-if="!usuario.preferencias?.naoGosto?.length">• Não registrado</li>
        </ul>
      </div>

      <div class="card-green">
        <h3 class="card-title">Alergias</h3>
        <hr class="card-divider" />
        <ul>
          <li v-for="a in usuario.alergias" :key="a">• {{ a }}</li>
          <li v-if="!usuario.alergias?.length">• Não registrado</li>
        </ul>
      </div>
    </div>

    <div class="bottom-actions">
      <button class="btn-pill" @click="$emit('navegar', 'perfil')">Cancelar a exclusão</button>
      <button class="btn-pill btn-delete" @click="abrirModalModal">
        Excluir Perfil do Profissional 🗑️
      </button>
    </div>

    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-icon">🗑️</div>
        <h2 class="serif-title modal-title">Excluir Perfil</h2>
      
        <div class="input-pill modal-input">
          <span class="exclusao-text">Digite sua senha para confirmar exclusão:</span>
          <input type="password" v-model="senhaConfirmacao" class="exclusao-text" />
        </div>

        <div class="modal-buttons">
          <button class="btn-pill btn-confirm" @click="confirmarExclusao">Confirmar Exclusão</button>
          <button class="btn-pill btn-cancel" @click="mostrarModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({ usuario: Object });
const emit = defineEmits(['navegar', 'confirmar-exclusao']);

const mostrarModal = ref(false);
const senhaConfirmacao = ref('');

const abrirModalModal = () => {
  mostrarModal.value = true;
};

const confirmarExclusao = () => {
  if (senhaConfirmacao.value) {
    emit('confirmar-exclusao');
  } else {
    alert('Por favor, informe a senha!');
  }
};
</script>

<style scoped>
.deletar-container {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.title-delete {
  font-size: 1.5rem;
  color: var(--dark-brown-header);
}

.user-name {
  font-size: 1.8rem;
}

.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.info-box {
  width: 50%;
}

.small-box {
  width: 50%;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 12px;
}

.card-title {
  text-align: center;
  font-size: 0.88rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #2a3418;
  margin: 5px 0;
}

ul {
  list-style: none;
}

.mt-2 {
  margin-top: 6px;
}

.bottom-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-delete {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-card {
  background-color: var(--green-box);
  width: 420px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.modal-icon {
  font-size: 1.5rem;
}

.modal-title {
  font-size: 1.6rem;
  color: #1a220c;
}

.modal-input {
  background-color: var(--input-bg);
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
}

.exclusao-text {
  color: #485A32 !important;
  font-weight: 600;
}

.modal-buttons {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn-confirm {
  background-color: var(--dark-brown-header);
  color: #FFF;
}

.btn-cancel {
  background-color: var(--input-bg);
}
</style>