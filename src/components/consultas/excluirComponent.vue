<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mostrarModalSenha = ref(false)
const senha = ref('')

const agendamento = ref({
  usuario: {
    nome: 'Gabriel Lima da Costa',
    telefone: '(11) 93333-4444',
    email: '',
    foto: null,
  },
  profissional: {
    nome: 'Dra. Carolina Paz Alencar',
    telefone: '(11) 94444-3333',
    email: '',
    foto: null,
  },
  consulta: {
    data: '2026-08-17',
    horario: '14h30 / 02h30 pm',
    tipo: 'Online (EAD)',
  },
})

onMounted(() => {
  const dadosSalvos = localStorage.getItem('dadosAgendamento')
  if (dadosSalvos) {
    agendamento.value = JSON.parse(dadosSalvos)
  }
})

function formatarData(dataIso) {
  if (!dataIso) return 'Selecionar a Data'
  if (dataIso.includes('/')) return dataIso
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

function abrirModalExclusao() {
  mostrarModalSenha.value = true
}

function meConfirmarExclusao() {
  if (!senha.value) {
    alert('Digite sua senha para confirmar!')
    return
  }

  const usuarioSessao = JSON.parse(localStorage.getItem('usuarioLogado') || '{}')
  const senhaValida = usuarioSessao.senha || agendamento.value.usuario.senha || agendamento.value.profissional.senha

  if (senhaValida && senha.value !== senhaValida) {
    alert('Senha incorreta! Não foi possível excluir o agendamento.')
    return
  }

  localStorage.removeItem('dadosAgendamento')
  mostrarModalSenha.value = false
  senha.value = ''

  alert('Agendamento excluído com sucesso!')
  router.push('/buscar')
}

function fecharModal() {
  mostrarModalSenha.value = false
  senha.value = ''
}
</script>

<template>
    <main class="main-content">
      <header class="header-banner">
        <h1>Agendamento</h1>
        <p class="subtitle">
          {{ extrairPrimeiroNome(agendamento.profissional.nome, true) }} & {{ extrairPrimeiroNome(agendamento.usuario.nome) }}
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
              <h2>{{ agendamento.profissional.nome || 'Nome Profissional' }}</h2>
              <p><strong>Telefone:</strong> {{ agendamento.profissional.telefone }}</p>
              <button class="bnt-perfil">Ver Perfil</button>
            </div>
            <button class="bnt-chat">Conversar com profissional</button>
          </div>

          <!-- Card Usuário -->
          <div class="person-card">
            <img
              :src="agendamento.usuario.foto || 'https://via.placeholder.com/150'"
              alt="Usuário"
              class="avatar"
            />
            <div class="info">
              <h2>{{ agendamento.usuario.nome || 'Nome Usuário' }}</h2>
              <p><strong>Telefone:</strong> {{ agendamento.usuario.telefone }}</p>
              <button class="bnt-perfil">Ver Perfil</button>
            </div>
            <button class="bnt-chat">Conversar com o paciente</button>
          </div>
        </div>

        <!-- Coluna de Detalhes -->
        <div class="details-coluna">
          <div class="detail-item">
            <span class="icon">📅</span>
            <div class="info-item">
              <span class="label">Data:</span>
              <span class="value">{{ formatarData(agendamento.consulta.data) }}</span>
            </div>
          </div>

          <div class="detail-item">
            <span class="icon">🕒</span>
            <div class="info-item">
              <span class="label">Horario:</span>
              <span class="value">{{ agendamento.consulta.horario }}</span>
            </div>
          </div>

          <div class="detail-item full">
            <span class="label">Tipo de agendamento:</span>
            <span class="value">{{ agendamento.consulta.tipo }}</span>
          </div>

          <!-- Botão Excluir Agendamento -->
          <div class="action-container">
            <button class="btn-excluir" @click="abrirModalExclusao">
              Excluir agendamento
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de Senha -->
    <div v-if="mostrarModalSenha" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-card">
        <div class="modal-header">
          <span class="trash-icon">🗑️</span>
          <h2>Excluir<br>Agendamento</h2>
        </div>

        <textarea
          v-model="senha"
          placeholder="Digite sua senha para&#10;confirmar exclusão:"
          class="modal-input"
          @keyup.enter.prevent="meConfirmarExclusao"
        ></textarea>

        <div class="modal-botoes">
          <button class="btn-modal btn-cancelar-modal" @click="fecharModal">
            Cancelar
          </button>
          <button class="btn-modal btn-cancelar-modal" @click="meConfirmarExclusao">
            Confirmar
          </button>
        </div>
      </div>
    </div>
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
  padding: 30px 60px;
  position: relative;
}

.header-banner {
  text-align: right;
  margin-bottom: 20px;
}

.header-banner h1 {
  color: #73441b;
  font-size: 3.8rem; 
  font-family: serif;
  font-weight: normal;
  margin: 0;
  line-height: 1;
}

.header-banner .subtitle {
  margin: 4px 0 0 0;
  color: #73441b;
  font-size: 1.8rem;
  font-family: serif;
}

.resumo-content {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  margin-top: 10px;
}

.cards-coluna {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 290px;
}

.person-card {
  border: 1.5px solid #73441b;
  border-radius: 20px;
  padding: 12px; 
  display: grid;
  grid-template-columns: 75px 1fr;
  gap: 10px; 
  align-items: center;
  background-color: transparent;
}

.avatar {
  width: 75px; 
  height: 75px; 
  border-radius: 50%;
  object-fit: cover;
}

.info h2 {
  margin: 0 0 4px 0;
  color: #1a1a1a;
  font-size: 0.9rem; 
  font-weight: bold;
  font-family: sans-serif;
}

.info p {
  margin: 0 0 6px 0;
  color: #1a1a1a;
  font-size: 0.75rem;
  font-family: sans-serif;
}

.bnt-perfil {
  background-color: transparent;
  border: 1px solid #73441b;
  color: #73441b;
  font-weight: bold;
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 0.7rem;
  cursor: pointer;
  font-family: sans-serif;
}

.bnt-chat {
  grid-column: span 2;
  background-color: transparent;
  border: 1px dashed #73441b;
  border-radius: 14px;
  padding: 4px;
  color: #73441b;
  font-size: 0.7rem;
  cursor: pointer;
  text-align: center;
  font-family: sans-serif;
}

.details-coluna {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 25px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-item .icon {
  font-size: 1.4rem;
}

.detail-item .label {
  color: #333333;
  font-size: 1.4rem;
  font-family: serif;
}

.detail-item .value {
  color: #73441b;
  font-size: 1.4rem;
  font-family: serif;
}

.detail-item.full .label {
  display: block;
}

.detail-item.full .value {
  display: block;
}

.action-container {
  margin-top: 15px;
}

.btn-excluir {
  background-color: #556238;
  color: #f1edd2;
  border: none;
  border-radius: 8px;
  padding: 12px 36px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 25px;
  z-index: 1000;
}

.modal-card {
  background-color: #ECE5CB;
  border-radius: 18px;
  padding: 12px 16px;
  width: 100%;
  max-width: 290px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.trash-icon {
  font-size: 1.1rem;
  display: block;
  margin-bottom: 2px;
}

.modal-header h2 {
  color: #1a1a1a;
  font-family: serif;
  font-size: 1.3rem;
  font-weight: normal;
  line-height: 1.1;
  margin: 0 0 8px 0;
}

.modal-input {
  width: 100%;
  height: 48px;
  border-radius: 14px;
  border: 1px solid #556238;
  background-color: transparent;
  color: #556238;
  font-family: sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 6px 10px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-bottom: 10px;
}

.modal-input::placeholder {
  color: #556238;
  font-weight: bold;
  opacity: 0.85;
  line-height: 1.2;
}

.modal-botoes {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-modal {
  flex: 1;
  background-color: #556238;
  color: #ECE5CB;
  border: none;
  border-radius: 16px;
  padding: 6px 0;
  font-size: 0.8rem;
  font-family: sans-serif;
  cursor: pointer;
}
</style>