<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const agendamento = ref({
  usuario: {
    nome: '',
    telefone: '',
    email: '',
    foto: null, // <-- Guarda a URL da foto do usuário
  },

  profissional: {
    nome: '',
    telefone: '',
    email: '',
    foto: null,
  },

  consulta: {
    data: '',
    horario: '',
    tipo: 'Presencial', //ou 'online (EAD)'
  },
})

onMounted(() => {
  const dadosSalvos = localStorage.getItem('dadosAgendamento')
  if (dadosSalvos) {
    agendamento.value = JSON.parse(dadosSalvos)
  }
})

function formatarData(dataIso) {
  if (!dataIso) return ''
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

function extrairPrimeiroNome(nomeCompleto, ehProfissional = false) {
  if (!nomeCompleto) return ''
  const partes = nomeCompleto.trim().split(' ')
  
  if (ehProfissional && partes.length > 1 && partes[0].toLowerCase().startsWith('dr')) {
    return `${partes[0]} ${partes[1]}`
  }
  
  return partes[0]
}
</script>

<template>
  <div class="resumo-container">
    <header class="header-banner">
      <h1>Agendamento</h1>
     <p>
    {{ extrairPrimeiroNome(agendamento.profissional.nome, true) }} &
    {{ extrairPrimeiroNome(agendamento.usuario.nome) }}
  </p>
    </header>

    <div class="resumo-content">
      <div class="cards-coluna">
        <!-- Card Profissional -->
        <div class="person-card">
          <img
            :src="agendamento.profissional.foto || 'https://via.placeholder.com/150'"
            alt="Profissional"
            class="avatar"
          />
          <div class="info">
            <h2>
              {{ agendamento.profissional.nome || 'Nome Profissional' }}
            </h2>

            <p>
              <strong>Telefone:</strong>
              {{ agendamento.profissional.telefone }}
            </p>
            <button class="bnt-perfil">Ver Perfil</button>
          </div>
          <button class="bnt-chat">Conversar Com o Profissional</button>
        </div>

        <!-- Card Usuário -->
        <div class="person-card">
          <img
            :src="agendamento.usuario.foto || 'https://via.placeholder.com/150'"
            alt="Usuário"
            class="avatar"
          />
          <div class="info">
            <h2>
              {{ agendamento.usuario.nome || 'Nome Usuário' }}
            </h2>

            <p>
              <strong>Telefone:</strong>
              {{ agendamento.usuario.telefone }}
            </p>
            <button class="bnt-perfil">Ver Perfil</button>
          </div>
          <button class="bnt-chat">Conversar Com o paciente</button>
        </div>
      </div>

      <!-- Coluna de Detalhes do Horário e Tipo de consuta -->
      <div class="details-coluna">
        <div class="detail-item">
          <span class="icon">📅</span>
          <div class="info">
            <strong>Data:</strong>
            <span class="value">{{ formatarData(agendamento.consulta.data) }}</span>
          </div>
        </div>

        <div class="detail-item">
          <span class="icon">🕒</span>
          <div>
            <strong>Horario:</strong>
            <span class="value">{{ agendamento.consulta.horario }}</span>
          </div>
        </div>

        <div class="detail-item full">
          <strong>Tipo de agendamento:</strong>
          <span class="value">{{ agendamento.consulta.tipo }}</span>
        </div>
      </div>
    </div>

    <!-- Ações de (Voltar/Editar e Excluir) -->
    <div class="actions-footer">
      <button class="btn-icon" title="Editar" @click="router.push('/editar')">✏️</button>

      <button class="btn-icon" title="Excluir" @click="router.push('/excluir')">🗑️</button>

      <button class="btn-buscar" @click="router.push('/buscar')">
    🔍 Buscar Profissionais
  </button>
    </div>
  </div>
</template>

<style>

.btn-buscar {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #6B7C4F;
  color: #F1EDD2;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.btn-buscar:hover {
  background-color: #536236;
}

.resumo-container {
  position: relative;
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  min-height: 500px;
}

.header-banner {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #73441b;
  color: #f2ebd9;
  padding: 24px 60px 24px 40px;
border-radius: 0 0 0 120px;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 10;
}

.header-banner h1 {
  color: #f1edd2;
  font-size: 2.5rem;
  margin: 0;
}

.header-banner p {
  margin: 4px 0 0 0;
  font-size: 1.1rem;
}

.resumo-content {
  display: flex;
  gap: 40px;
  margin-top: 90px;
}

.cards-coluna {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.person-card {
  border: 2px solid #73441b;
  border-radius: 24px;
  padding: 14px;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
}

.info h2 {
  margin: 0 0 4px 0;
  color: #333f34;
  font-size: 1.2rem;
  font-weight: bolder;
}

.info p {
  margin: 0 0 6px 0;
  color: #333f34;
  font-size: 0.9rem;
  font-weight: bolder;
}

.bnt-perfil {
  background-color: #f1edd2;
  border: 1px solid #73441b;
  color: #333f34;
  font-weight: bolder;
  border-radius: 10px;
  padding: 2px 12px;
  font-size: 0.8rem;
  cursor: pointer;
}

.bnt-chat {
  grid-column: span 2;
  background-color: transparent;
  border: 1.5px dashed #73441b;
  border-radius: 16px;
  padding: 6px;
  color: #73441b;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: center;
}

.details-coluna {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 50px;
  color: #536236;
  font-size: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-item .value {
  color: #9a9e70;
  margin-left: 6px;
}

.actions-footer {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background-color: #f1edd2;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
</style>
