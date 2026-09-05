<script setup>
import { ref, computed, onMounted } from 'vue'

const buscaTermo = ref('')
const agendamentos = ref([
  {
    id: 1,
    profissional: {
      nome: 'Dra. Carolina Paz Alencar',
      foto: '/profissionais/ana.png',
    },
    paciente: {
      nome: 'Gabriel Lima da Costa',
      foto: '/logo.png',
    },
    data: '17/08/2026',
    horario: '14h30 / 02h30 pm',
    tipo: 'Online (EAD)',
  },
  {
    id: 2,
    profissional: {
      nome: 'Dr. Alexandre Xavier',
      foto: '/profissionais/marcos.png',
    },
    paciente: {
      nome: 'Amanda da sousa Lima',
      foto: '/logo.png',
    },
    data: '25/09/2026',
    horario: '08h00 / 08h00 am',
    tipo: 'Online (EAD)',
  },
  {
    id: 3,
    profissional: {
      nome: 'Dra. Fabiana Oliveira',
      foto: '/profissionais/fernanda.png',
    },
    paciente: {
      nome: 'Carlos Eduardo da Silva',
      foto: '/logo.png',
    },
    data: '02/11/2026',
    horario: '16h30 / 04h30 pm',
    tipo: 'Presencial',
  },
  {
    id: 4,
    profissional: {
      nome: 'Dr. Marcos Vinicius',
      foto: '/profissionais/gabriel.png',
    },
    paciente: {
      nome: 'Bianca da Silva',
      foto: '/logo.png',
    },
    data: '12/09/2026',
    horario: '10h00 / 10h00 am',
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
        foto: dados.profissional.foto || '/profissionais/ana.png',
      },
      paciente: {
        nome: dados.usuario.nome || 'Paciente não informado',
        foto: dados.usuario.foto || '/logo.png',
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
    <main class="main-content">
      <h1 class="page-title">Buscar Perfil do Profissional</h1>

      <!-- Barra de Pesquisa -->
      <div class="search-bar">
        <input type="text" v-model="buscaTermo" placeholder="" />
        <span class="search-icon">🔍</span>
      </div>

      <!-- Lista de Cards -->
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
            <p><span class="icon">📅</span><span class="label">Data:</span> <span class="val">{{ card.data }}</span></p>
            <p><span class="icon">🕒</span><span class="label">Horario:</span> <span class="val">{{ card.horario }}</span></p>
            <p class="tipo-row"><span class="label">Tipo de agendamento:</span> <span class="val">{{ card.tipo }}</span></p>
          </div>
        </div>

        <!-- Mensagem quando nenhum paciente for encontrado -->
        <p v-if="agendamentosFiltrados.length === 0" class="no-results">
          Nenhum agendamento encontrado para "{{ buscaTermo }}".
        </p>
      </div>
    </main>
</template>

<style scoped>
.page-layout {
  display: flex;
  min-height: 100vh;
  background-color: #ECE5CB;
  font-family: serif;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.menu-icon span {
  width: 28px;
  height: 2px;
  background-color: #ECE5CB;
  display: block;
}

.logo-text {
  color: #889660;
  font-family: serif;
  font-size: 0.8rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.main-content {
  flex: 1;
  padding: 30px 40px;
}

.page-title {
  color: #73441b;
  text-align: right;
  font-size: 3.4rem;
  font-family: serif;
  font-weight: normal;
  margin: 0 0 24px 0;
}

.search-bar {
  position: relative;
  width: 100%;
  max-width: 650px;
  margin: 0 auto 30px auto;
}

.search-bar input {
  width: 100%;
  height: 40px;
  padding: 8px 40px 8px 16px;
  border-radius: 20px;
  border: 1.5px solid #333f34;
  color: #333f34;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  pointer-events: none;
  opacity: 0.6;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 650px;
  margin: 0 auto;
}

.appointment-card {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1.5px solid #73441b;
  border-radius: 18px;
  padding: 16px;
  gap: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: 1.5px solid #73441b;
  border-radius: 20px;
  padding: 12px;
  flex: 1;
  min-height: 80px;
  box-sizing: border-box;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 0.85rem;
  font-weight: bold;
  color: #1a1a1a;
  font-family: sans-serif;
  line-height: 1.2;
}

.info-block {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.4;
  padding-left: 8px;
}

.info-block p {
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-block .icon {
  font-size: 1.1rem;
  margin-right: 4px;
}

.info-block .label {
  color: #48542c;
  font-weight: bold;
  font-family: serif;
}

.info-block .val {
  color: #73441b;
  font-family: serif;
}

.info-block .tipo-row {
  display: block;
  margin-top: 6px;
}

.no-results {
  color: #333f34;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
}
</style>