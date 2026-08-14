<template>
  <div class="perfil-container">
    <button class="delete-icon-btn" @click="$emit('navegar', 'deletar')" title="Excluir Perfil">
      🗑️
    </button>

    <div class="profile-header">
      <h1 class="serif-title user-name">{{ usuario.nome || 'Nome do Usuário' }}</h1>
    </div>

    <div class="info-row">
      <div class="input-pill info-box">
        <span>Cpf: {{ usuario.cpf || 'N/A' }}</span>
      </div>
      <div class="input-pill info-box">
        <span>E-mail: {{ usuario.email || 'N/A' }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="input-pill info-box">
        <span>peso: {{ usuario.peso || 'N/A' }}</span>
      </div>
      <div class="input-pill info-box">
        <span>Telefone: {{ usuario.telefone || 'N/A' }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="input-pill info-box small-box">
        <span>Data de nascimento: {{ usuario.dataNascimento || 'N/A' }}</span>
      </div>
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

    <button class="floating-edit-btn" @click="$emit('navegar', 'editar')" title="Editar Perfil">
      ✏️
    </button>
  </div>
</template>

<script setup>
defineProps({
  usuario: Object
});
defineEmits(['navegar']);
</script>

<style scoped>
.perfil-container {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.delete-icon-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 5px;
}

.user-name {
  font-size: 2.2rem;
  font-weight: 400;
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
  margin-top: 16px;
}

.card-title {
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #2a3418;
  margin: 6px 0 8px 0;
}

ul {
  list-style: none;
  padding-left: 5px;
}

.mt-2 {
  margin-top: 8px;
}

.floating-edit-btn {
  position: absolute;
  bottom: -25px;
  left: -35px;
  background-color: #ECE3CA;
  border: 1px solid #8E996C;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
</style>