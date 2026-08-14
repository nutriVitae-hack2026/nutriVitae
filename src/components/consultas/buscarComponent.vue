<script setup>
import { ref } from 'vue'

const buscaTermo = ref('')
</script>

<template>
  <div class="container">
    <h1>Buscar Perfil do Profissional</h1>
    <div class="search-bar">
      <input type="text" v-model="buscaTermo" placeholder="Pacientes" />
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
          <p>🕒<strong>Horário:</strong> 14h30 /02h30 pm</p>
          <p>📍<strong>Tipo de agendamento:</strong> Online (EAD)</p>
        </div>
      </div>

      <!-- CARD 2 -->
      <div class="appointment-card">
        <!-- Bloco Profissional -->
        <div class="profile-chip">
          <img src="/public/usuarios/carolina-user.png" alt="Dr. Alexandre" class="avatar" />
          <span class="name"> Dr. Alexandre Xavier </span>
        </div>
        <!-- Bloco Paciente -->
        <div class="profile-chip">
          <img src="/public/usuarios/gabriel-user(1).png" alt="Amanda da sousa" class="avatar" />
          <span class="name"> Amanda da sousa Lima </span>
        </div>
        <!-- Bloco de Informações -->
        <div class="info-block">
          <p>📅<strong>Data:</strong> 25/09/2026</p>
          <p>🕒<strong>Horário:</strong>08h00 /08h00 am</p>
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
  background-color: #F1EDD2; 
  border: 1.5px solid #73441B; 
  border-radius: 16px;
  padding: 16px;
  gap: 12px;
}
/* Pills / Chips com foto e nome */
.profile-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #F1EDD2;
  border: 1.5px solid #73441B;
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
  color: #333F34;
}

/* Detalhes da consulta */
.info-block {
  flex: 1;
  font-size: 0.85rem;
  color: #536236;
  line-height: 1.4;
  padding-left: 12px;
}

.info-block p {
  margin: 2px 0;
}
</style>
