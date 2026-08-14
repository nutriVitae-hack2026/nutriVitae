<template>
  <div class="editar-container">
    <div class="profile-header">
      <h1 class="serif-title user-name">Editar Perfil</h1>
    </div>

    <div class="edit-grid">
      <div class="input-pill">
        <span>Nome:</span>
        <input v-model="form.nome" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span>Cpf:</span>
        <input v-model="form.cpf" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span>peso:</span>
        <input v-model="form.peso" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span>Data de nascimento:</span>
        <input v-model="form.dataNascimento" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span>Telefone:</span>
        <input v-model="form.telefone" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span>E-mail:</span>
        <input v-model="form.email" />
        <span class="icon">✏️</span>
      </div>

      <div class="card-green card-edit">
        <div class="card-header">
          <h3>Preferencias</h3>
          <span class="icon">✏️</span>
        </div>
        <hr class="card-divider" />
        <p><strong>gosto:</strong></p>
        <ul>
          <li v-for="p in form.preferencias?.gosto" :key="p">• {{ p }}</li>
          <li v-if="!form.preferencias?.gosto?.length">• Não registrado</li>
        </ul>
        <p class="mt-2"><strong>Não gosta</strong></p>
        <ul>
          <li v-for="np in form.preferencias?.naoGosto" :key="np">• {{ np }}</li>
          <li v-if="!form.preferencias?.naoGosto?.length">• Não registrado</li>
        </ul>
      </div>

      <div class="card-green card-edit">
        <div class="card-header">
          <h3>Alergias</h3>
          <span class="icon">✏️</span>
        </div>
        <hr class="card-divider" />
        <ul>
          <li v-for="a in form.alergias" :key="a">• {{ a }}</li>
          <li v-if="!form.alergias?.length">• Não registrado</li>
        </ul>
      </div>

      <div class="footer-confirm">
        <div class="input-pill btn-like">
          <span>Confirmar senha:</span>
          <input type="password" v-model="senhaConfirmacao" placeholder="••••••••" />
        </div>
        <button class="btn-pill" @click="salvar">Salvar Alterações</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({ usuario: Object });
const emit = defineEmits(['salvar-edicao']);

const form = reactive({ ...props.usuario });
const senhaConfirmacao = ref('');

const salvar = () => {
  emit('salvar-edicao', { ...form });
};
</script>

<style scoped>
.editar-container {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.user-name {
  font-size: 2rem;
}

.edit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
}

.icon {
  font-size: 0.75rem;
  margin-left: 12px;
}

.card-edit {
  grid-row: span 2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.card-divider {
  border: 0;
  height: 1px;
  background-color: #2a3418;
  margin: 5px 0 8px 0;
}

ul {
  list-style: none;
}

.mt-2 {
  margin-top: 6px;
}

.footer-confirm {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.btn-like {
  max-width: 320px;
  background-color: var(--green-box);
}
</style>