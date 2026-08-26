<template>
  <div class="editar-container">
    <div class="profile-header">
      <h1 class="serif-title user-name">Editar Perfil</h1>
    </div>

    <div class="edit-grid">
      <div class="input-pill">
        <span class="label-text">Nome:</span>
        <input v-model="form.nome" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span class="label-text">Cpf:</span>
        <input v-model="form.cpf" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span class="label-text">Peso:</span>
        <input v-model="form.peso" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span class="label-text">Data de nascimento:</span>
        <input v-model="form.dataNascimento" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span class="label-text">Telefone:</span>
        <input v-model="form.telefone" />
        <span class="icon">✏️</span>
      </div>

      <div class="input-pill">
        <span class="label-text">E-mail:</span>
        <input v-model="form.email" />
        <span class="icon">✏️</span>
      </div>

      <div class="card-green card-edit">
        <div class="card-header">
          <h3 class="label-text-card">Preferencias</h3>
          <span class="icon">✏️</span>
        </div>
        <hr class="card-divider" />
        <p><strong class="label-text-card">gosto:</strong></p>
        <ul>
          <li v-for="(p, i) in form.preferencias?.gosto" :key="i">• {{ p }}</li>
          <li v-if="!form.preferencias?.gosto?.length">• Não registrado</li>
        </ul>
        <p class="mt-2"><strong class="label-text-card">Não gosta</strong></p>
        <ul>
          <li v-for="(np, i) in form.preferencias?.naoGosto" :key="i">• {{ np }}</li>
          <li v-if="!form.preferencias?.naoGosto?.length">• Não registrado</li>
        </ul>
      </div>

      <div class="card-green card-edit">
        <div class="card-header">
          <h3 class="label-text-card">Alergias</h3>
          <span class="icon">✏️</span>
        </div>
        <hr class="card-divider" />
        <ul>
          <li v-for="(a, i) in form.alergias" :key="i">• {{ a }}</li>
          <li v-if="!form.alergias?.length">• Não registrado</li>
        </ul>
      </div>

      <div class="footer-confirm">
        <button class="btn-pill btn-cancel" @click="$emit('cancelar')">Cancelar</button>
        <button class="btn-pill" @click="salvar">Salvar Alterações</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  usuario: { type: Object, required: true }
});

const emit = defineEmits(['salvar-edicao', 'cancelar']);

const form = reactive({ ...props.usuario });

watch(() => props.usuario, (novo) => {
  Object.assign(form, JSON.parse(JSON.stringify(novo)));
}, { deep: true, immediate: true });

const salvar = () => {
  emit('salvar-edicao', JSON.parse(JSON.stringify(form)));
};
</script>

<style scoped>
.editar-container {
   position: relative;
  min-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.user-name {
  font-size: 2.2rem;
  color: #73441B;
  text-align: center;
}

.edit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  width: 100%;
}

.input-pill {
  background-color: #D1BFA5;
  border-radius: 8px;
  padding: 15px 12px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
   margin-bottom: 15px;
}

.label-text {
  color: #333F34;
  font-weight: 600;
  font-size: 15px;
}

.label-text-card {
  color: #333F34;
  font-weight: 600;
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

.icon {
  font-size: 0.8rem;
  margin-left: 12px;
}

.card-green {
  background-color: #9A9E70;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  color: #F1EDD2;
  font-size: 0.75rem;
}

.card-edit {
  grid-row: span 2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.footer-confirm {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
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

.btn-cancel {
  background-color: #9A9E70;
  color: #333F34;
}
</style>