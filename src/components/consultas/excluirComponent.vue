<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mostrarModalSenha = ref(false)
const senha = ref('')

const agendamento = ref({
  usuario: {
    nome: '',
    telefone: '',
    email: '',
    foto: null,
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
    tipo: 'Presencial',
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
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

function cancelarExclusao() {
  router.push('/resumo')
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
</script>

<template>
  <div class="resumo-container">
    <header class="header-banner">
      <h1>Agendamento</h1>
       <p class="subtitle" v-if="agendamento.profissional.nome || agendamento.usuario.nome">
        {{ agendamento.profissional.nome }} & {{ agendamento.usuario.nome }}
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
          <div>
            <strong>Data:</strong>
            <span class="value">{{ formatarData(agendamento.consulta.data) }}</span>
          </div>
        </div>

        <div class="detail-item">
          <span class="icon">🕒</span>
          <div>
            <strong>Horário:</strong>
            <span class="value">{{ agendamento.consulta.horario || '00:00' }}</span>
          </div>
        </div>

        <div class="detail-item full">
          <strong>Tipo de agendamento:</strong>
          <span class="value">{{ agendamento.consulta.tipo }}</span>
        </div>

        <!-- Ações do Rodapé da Coluna -->
        <div class="action-buttons">
          <button class="btn-cancelar" @click="cancelarExclusao">
            Cancelar a exclusão
          </button>
          <button class="btn-excluir" @click="abrirModalExclusao">
            Excluir agendamento 🗑️
          </button>
        </div>
      </div>
    </div>

     <!-- Modal de Senha -->
    <div v-if="mostrarModalSenha" class="modal-overlay" @click.self="mostrarModalSenha = false">
      <div class="modal-card">
        <div class="modal-header">
          <span class="trash-icon">🗑️</span>
          <h3>Excluir Agendamento</h3>
          <button class="btn-fechar-modal" @click="mostrarModalSenha = false">✖</button>
        </div>

        <p class="modal-instruction">Digite sua senha para confirmar exclusão:</p>

        <input
          type="password"
          placeholder="Sua senha"
          v-model="senha"
          class="modal-input"
          @keyup.enter="meConfirmarExclusao"
        />

        <button class="btn-confirmar-modal" @click="meConfirmarExclusao">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.btn-cancelar,
.btn-excluir {
  flex: 1;
  padding: 5px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
  background-color: #333f34;
  color: #f1edd2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-cancelar:hover,
.btn-excluir:hover {
  background-color: #888c60;
}

/* Modal Estilizado para Exclusão */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-card {
  background-color: #f1edd2;
  padding: 24px;
  border-radius: 16px;
  width: 320px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 12px;
  color: #2b3323;
}

.trash-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bolder;
}

.btn-fechar-modal {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #2b3323;
}

.modal-instruction {
  font-size: 0.9rem;
  color: #333f34;
  margin-bottom: 14px;
  text-align: left;
   font-weight: bolder;
}

.modal-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #73441b;
  background-color: #f1edd2;
  margin-bottom: 16px;
  box-sizing: border-box;
  outline: none;
}

.btn-confirmar-modal {
  background-color: #333f34;
  color: #f1edd2;
  font-weight: bold;
  border-radius: 8px;
  padding: 8px 20px;
  cursor: pointer;
}
</style>
