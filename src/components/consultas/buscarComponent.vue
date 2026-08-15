<script setup>
import { ref, computed } from 'vue'

const buscaTermo = ref('')

const agendamentos = ref([
  {
    id: 1,
    profissional: {
      nome: 'Dra. Carolina Paz Alencar',
      foto: '/public/usuarios/carolina-user.png'
    },
    paciente: {
      nome: 'Gabriel Lima da Costa',
      foto: '/public/usuarios/gabriel-user(1).png'
    },
    data: '12/10/2026',
    horario: '14h30 /02h30 pm',
    tipo: 'Online (EAD)'
  },
  {
    id: 2,
    profissional: {
      nome: 'Dr. Alexandre Xavier',
      foto: '/public/usuarios/carolina-user.png'
    },
    paciente: {
      nome: 'Amanda da sousa Lima',
      foto: '/public/usuarios/gabriel-user(1).png'
    },
    data: '25/09/2026',
    horario: '08h00 /08h00 am',
    tipo: 'Online (EAD)'
  }
])

const agendamentosFiltrados = computed(() => {
  const termo = buscaTermo.value.trim().toLowerCase()
  if (!termo) return agendamentos.value

  return agendamentos.value.filter(item => 
    item.paciente.nome.toLowerCase().includes(termo) ||
    item.profissional.nome.toLowerCase().includes(termo)
  )
})
</script>

<template>
  <div class="container">
    <div 
        v-for="card in agendamentosFiltrados" 
        :key="card.id" 
        class="appointment-card"
      >
        <!-- Bloco Profissional -->
        <div class="profile-chip">
          <img :src="card.profissional.foto" :alt="card.profissional.nome" class="avatar" />
          <span class="name">{{ card.profissional.nome }}</span>
        </div>

        <!-- Bloco Paciente -->
        <div class="profile-chip">
          <img :src="card.paciente.foto" :alt="card.paciente.nome" class="avatar" />
          <span class="name">{{ card.paciente.nome }}</span>
        </div>

        <!-- Bloco de Informações -->
        <div class="info-block">
          <p>📅<strong>Data:</strong> {{ card.data }}</p>
          <p>🕒<strong>Horário:</strong> {{ card.horario }}</p>
          <p>📍<strong>Tipo de agendamento:</strong> {{ card.tipo }}</p>
        </div>
      </div>

      <!-- Mensagem quando nenhum paciente for encontrado -->
      <p v-if="agendamentosFiltrados.length === 0" class="no-results">
        Nenhum agendamento encontrado para "{{ buscaTermo }}".
      </p>
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

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #9c8a6f;
  background-color: #cbba9c;
  outline: none;
  font-size: 1rem;
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
  flex: 1;
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

.no-results {
  color: #73441b;
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
}
</style>
