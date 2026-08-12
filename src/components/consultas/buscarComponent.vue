<script setup>
import { ref } from 'vue'

const buscaTermo = ref('')
</script>

<template>
  <div class="container">
    <h1>Buscar Perfil do Profissional</h1>
    <div class="search-bar">
      <input type="text" v-model="buscaTermo" placeholder="Buscar pacientes ou profissionais..." />
    </div>

    <div class="card-list">
      <div class="appointment-card">
        <div class="profile-chip">
          <img src="/public/usuarios/carolina-user.png" alt="" />
          <span class="name"> Dra. Carolina Paz Alencar </span>
        </div>

        <div class="profile-chip">
          <img src="/public/usuarios/gabriel-user(1).png" alt="" />
          <span class="name"> Gabriel Lima da Costa </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #73441b;
  text-align: center;
}

.search-bar input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #9c8a6f;
  background-color: #cbba9c;
}
</style>
