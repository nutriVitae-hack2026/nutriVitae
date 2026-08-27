<template>
  <div class="perfil-container">
    <button class="delete-icon-btn" title="Excluir Perfil">🗑️</button>

    <div class="profile-header">
      <h1 class="user-name">{{ usuario.nome }}</h1>
    </div>

    <div class="info-row">
      <div class="info-box input-pill">
        <span>Cpf: {{ usuario.cpf }}</span>
      </div>
      <div class="info-box input-pill">
        <span>E-mail: {{ usuario.email }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="info-box input-pill">
        <span>peso: {{ usuario.peso }}</span>
      </div>
      <div class="info-box input-pill">
        <span>Telefone: {{ usuario.telefone }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="small-box input-pill">
        <span>Data de nascimento: {{ usuario.dataNascimento }}</span>
      </div>
    </div>

    <div class="cards-grid">
      <div class="card-box green-card">
        <h3 class="card-title">Preferencias</h3>
        <hr class="card-divider" />
        <p class="section-subtitle">gosto:</p>
        <ul>
          <li v-if="!usuario.preferencias.gosto.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.preferencias.gosto" :key="i">• {{ item }}</li>
        </ul>
        <p class="section-subtitle mt-2">Não gosta</p>
        <ul>
          <li v-if="!usuario.preferencias.naoGosto.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.preferencias.naoGosto" :key="i">• {{ item }}</li>
        </ul>
        
        <button class="floating-edit-btn" title="Editar Preferências">✏️</button>
      </div>

      <div class="card-box green-card">
        <h3 class="card-title">Alergias</h3>
        <hr class="card-divider" />
        <ul>
          <li v-if="!usuario.alergias.length">• Não registrado</li>
          <li v-for="(item, i) in usuario.alergias" :key="i">• {{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';

const usuario = reactive({
  nome: 'Usuário Exemplo',
  cpf: '000.000.000-00',
  peso: '70kg',
  dataNascimento: '01/01/2000',
  email: 'usuario@exemplo.com',
  telefone: '(00) 00000-0000',
  preferencias: {
    gosto: [],
    naoGosto: []
  },
  alergias: []
});

onMounted(() => {
  const dadosSalvos = localStorage.getItem('usuarioLogado');
  if (dadosSalvos) {
    Object.assign(usuario, JSON.parse(dadosSalvos));
  }
});
</script>

<style scoped>
.perfil-container {
 position: relative;
  min-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.delete-icon-btn {
  position: absolute;
  top: 0;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-name {
  font-size: 1.8rem;
  font-weight: 500;
  color: #2b2118;
}

.info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
}

.info-box {
  width: 50%;
}

.small-box {
  width: 50%;
}

.input-pill {
  background-color: #C3B199;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
  color: #2b2118;
  font-size: 0.75rem;
  font-weight: 500;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 14px;
}

.green-card {
  background-color: #8E996C;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
  position: relative;
  color: #1a220c;
  font-size: 0.75rem;
}

.card-title {
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #2a3418;
  margin: 6px 0 8px 0;
}

.section-subtitle {
  font-weight: 600;
  margin-bottom: 2px;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.mt-2 {
  margin-top: 8px;
}

.floating-edit-btn {
  position: absolute;
  bottom: -12px;
  left: -12px;
  background-color: #ECE3CA;
  border: 1px solid #8E996C;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}
</style>