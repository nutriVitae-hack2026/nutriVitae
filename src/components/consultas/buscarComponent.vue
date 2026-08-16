<script setup>
import { ref, computed, onMounted } from 'vue'

const buscaTermo = ref('')
const agendamentos = ref([
  {
    id: 1,
    profissional: {
      nome: 'Dra. Carolina Paz Alencar',
      foto: '/public/usuarios/carolina-user.png',
    },
    paciente: {
      nome: 'Gabriel Lima da Costa',
      foto: '/public/usuarios/gabriel-user(1).png',
    },
    data: '12/10/2026',
    horario: '14h30 /02h30 pm',
    tipo: 'Online (EAD)',
  },
  {
    id: 2,
    profissional: {
      nome: 'Dr. Alexandre Xavier',
      foto: '/public/usuarios/carolina-user.png',
    },
    paciente: {
      nome: 'Amanda da sousa Lima',
      foto: '/public/usuarios/gabriel-user(1).png',
    },
    data: '25/09/2026',
    horario: '08h00 /08h00 am',
    tipo: 'Online (EAD)',
  },
  {
    id: 3,
    profissional: {
      nome: 'Dra. Fabiana Oliveira',
      foto: '/public/usuarios/carolina-user.png',
    },
    paciente: {
      nome: 'Carlos Eduardo da Silva',
      foto: '/public/usuarios/gabriel-user(1).png',
    },
    data: '02/11/2026',
    horario: '16h30 /04h30 pm',
    tipo: 'Presencial',
  },
  {
    id: 4,
    profissional: {
      nome: 'Dr. Marcos Vinicius',
      foto: '/public/usuarios/carolina-user.png',
    },
    paciente: {
      nome: 'Bianca da Silva',
      foto: '/public/usuarios/gabriel-user(1).png',
    },
    data: '12/09/2026',
    horario: '10h00 /10h00 am',
    tipo: 'Presencial',
  },
])

onMounted(() => {
  const salvo = localStorage.getItem('dadosAgendamento')
  if (salvo) {
    const dados = JSON.parse(salvo)

    const novoAgendamento = {
      id: Date.now(),
      profissional: {
        nome: dados.profissional.nome || 'Profissional não informado',
        foto: dados.profissional.foto || '/public/usuarios/carolina-user.png',
      },
      paciente: {
        nome: dados.usuario.nome || 'Paciente não informado',
        foto: dados.usuario.foto || '/public/usuarios/gabriel-user(1).png',
      },
      data: dados.consulta.data,
      horario: dados.consulta.horario,
      tipo: dados.consulta.tipo,
    }

    agendamentos.value.unshift(novoAgendamento)
  }
})

const agendamentosFiltrados = computed(() => {
  const termo = buscaTermo.value.trim().toLowerCase()
  if (!termo) return agendamentos.value

  return agendamentos.value.filter(
    (item) =>
      item.paciente.nome.toLowerCase().includes(termo) ||
      item.profissional.nome.toLowerCase().includes(termo),
  )
})
</script>

<template>
  <div class="container">
    <h1>Buscar Perfil do Profissional</h1>
    <div class="search-bar">
      <input type="text" v-model="buscaTermo" placeholder="Pesquisar paciente..." />
      <span class="search-icon">🔍</span>
    </div>

    <div class="card-list">
      <div v-for="card in agendamentosFiltrados" :key="card.id" class="appointment-card">
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
  font-size: 2.2rem;
  margin-bottom: 24px;
}

/* Container da Barra de Busca */
.search-bar {
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 24px auto;
}

.search-bar input {
  width: 100%;
  padding: 12px 45px 12px 20px;
  border-radius: 16px;
  border: 1px solid #73441b;
  background-color: #939a6d; /* Tom verde oliva claro do protótipo */
  color: #2b3323;
  font-size: 1.05rem;
  font-weight: 500;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.search-bar input::placeholder {
  color: #3b452e;
  opacity: 0.8;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  pointer-events: none;
  opacity: 0.7;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
  margin: 0 auto;
  font-family: sans-serif;
}

/* Card principal */
.appointment-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1edd2;
  border: 1.5px solid #73441b;
  border-radius: 16px;
  padding: 16px;
  gap: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Pills / Chips com foto e nome */
.profile-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f1edd2;
  border: 1.5px solid #73441b;
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
  color: #333f34;
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
  margin-top: 15px;
}
</style>
