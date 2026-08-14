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
      <!-- Card 1 -->
      <div class="appointment-card">
        <!-- Bloco Profissional -->
        <div class="profile-chip">
          <img src="/public/usuarios/carolina-user.png" alt="Dra. Carolina" class="avatar" />
          <span class="name"> Dra. Carolina Paz Alencar </span>
        </div>
        <!-- Bloco Paciente -->
        <div class="profile-chip">
          <img src="/public/usuarios/gabriel-user(1).png" alt="Gabriel Lima" class="avatar" />
          <span class="name"> Gabriel Lima da Costa </span>
        </div>
        <!-- Bloco de Informações -->
         <div class="info-block">
          <p>📅<strong>Data:</strong> 12/10/2026</p>
          <p>🕒<strong>Horário:</strong> 14:00 - 15:00</p>
          <p>📍<strong>Tipo de agendamento:</strong> Online (EAD)</p>
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

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
  font-family: sans-serif;
}
/* Card principal */
.appointment-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fcf8f5; /* Tom bege do fundo */
  border: 1.5px solid #c8a287; /* Borda em tom marrom/terroso */
  border-radius: 16px;
  padding: 16px;
  gap: 12px;
}
/* Pills / Chips com foto e nome */
.profile-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 8px 14px;
  flex: 1; /* Ocupa espaço proporcional */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

/* Detalhes da consulta */
.info-block {
  flex: 1;
  font-size: 0.85rem;
  color: #4a4a4a;
  line-height: 1.4;
  border-left: 1px solid #e0e0e0;
  padding-left: 12px;
}

.info-block p {
  margin: 2px 0;
}
</style>
