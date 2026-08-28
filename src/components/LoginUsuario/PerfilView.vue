<template>
  <div class="perfil-container">
    <EditarPerfilView 
      v-if="editando" 
      :usuario="usuario" 
      @salvar-edicao="salvarAlteracoes" 
      @cancelar="editando = false"
    />

    <div v-else>
      <button 
        class="delete-icon-btn" 
        title="Excluir Perfil" 
        @click="router.push('/perfil/deletar')"
      >
        🗑️
      </button>

      <div class="profile-header">
        <h1 class="user-name">{{ usuario.nome }}</h1>
      </div>

      <div class="info-row">
        <div class="info-box input-pill">
          <span><strong class="label-text">Cpf:</strong> {{ usuario.cpf }}</span>
        </div>
        <div class="info-box input-pill">
          <span><strong class="label-text">E-mail:</strong> {{ usuario.email }}</span>
        </div>
      </div>

      <div class="info-row">
        <div class="info-box input-pill">
          <span><strong class="label-text">peso:</strong> {{ usuario.peso }}</span>
        </div>
        <div class="info-box input-pill">
          <span><strong class="label-text">Telefone:</strong> {{ usuario.telefone }}</span>
        </div>
      </div>

      <div class="info-row">
        <div class="small-box input-pill">
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
          
          <button 
            class="floating-edit-btn" 
            title="Editar Perfil" 
            @click="editando = true"
          >
            ✏️
          </button>
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
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EditarPerfilView from './EditarPerfilView.vue';

const router = useRouter();
const editando = ref(false);

const usuario = reactive({
  nome: '',
  cpf: '',
  peso: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  preferencias: { gosto: [], naoGosto: [] },
  alergias: []
});

onMounted(() => {
  const dadosSalvos = localStorage.getItem('usuarioLogado');
  if (dadosSalvos) {
    Object.assign(usuario, JSON.parse(dadosSalvos));
  }
});

const salvarAlteracoes = (novosDados) => {
  Object.assign(usuario, novosDados);
  localStorage.setItem('usuarioLogado', JSON.stringify(novosDados));
  editando.value = false;
};
</script>

<style scoped>
.perfil-container {
  position: relative;
  max-width: 900px;
  /* Espaçamento superior suficiente para o Header fixo */
  margin: 120px auto 40px auto; 
  padding: 0 20px;
  box-sizing: border-box;
}

.delete-icon-btn {
  position: absolute;
  top: -40px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 5;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.user-name {
  font-size: 2rem;
  font-weight: 500;
  color: #73441B;
}

.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px; /* Reduzido levemente para um espaçamento mais uniforme */
}

.info-box, .small-box {
  width: 50%;
}

.input-pill {
  background-color: #D1BFA5;
  border-radius: 8px;
  padding: 14px 16px; /* Ajustado o padding para alinhar com os outros campos do sistema */
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  color: #73441B;
  font-size: 0.95rem;
  font-weight: 500;
  box-sizing: border-box;
}

.label-text {
  color: #333F34;
  font-weight: 600;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

.green-card {
  background-color: #9A9E70;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  position: relative;
  color: #F1EDD2;
  font-size: 0.85rem;
}

.card-title {
  text-align: center;
  font-size: 1rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #536236;
  margin: 6px 0 8px 0;
}

.section-subtitle {
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
  bottom: 12px;
  right: 12px; /* Ajustado a posição para dentro do card, evitando estourar as margens da página */
  left: auto;
  background-color: #F1EDD2;
  border: 1px solid #9A9E70;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
</style>