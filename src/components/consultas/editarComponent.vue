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

function salvarAlteracoes() {
  mostrarModalSenha.value = true
}

function meConfirmarEdicao() {
  if (!senha.value) return alert('Digite sua senha para confirmar!')

  localStorage.setItem('dadosAgendamento', JSON.stringify(agendamento.value))
  mostrarModalSenha.value = false
  router.push('/resumo') // Volta para o resumo após salvar
}
</script>

<template>
  <div class="resumo-container">
    <header class="header-banner">
      <h1>Editar Agendamento</h1>
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
          <div>
            <strong>Data:</strong>
            <input type="date" v-model="agendamento.consulta.data" class="edit-input" />
          </div>
        </div>

        <div class="detail-item">
          <span class="icon">🕒</span>
          <div>
            <strong>Horario:</strong>
            <input type="text" v-model="agendamento.consulta.horario" class="edit-input" />
          </div>
        </div>

        <div class="detail-item full">
          <strong>Tipo de agendamento:</strong>
          <select v-model="agendamento.consulta.tipo" class="edit-select">
            <option value="Presencial">Presencial</option>
            <option value="Online (EAD)">Online (EAD)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Ações de (Voltar/Editar e Excluir) -->
    <button class="btn-confirmar" @click="salvarAlteracoes">Confirmar Alterações</button>
  </div>

    <!-- Modal de Confirmação de Senha -->
    <div v-if="mostrarModalSenha" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Editar Agendamento</h3>
          <button class="btn-close" @click="mostrarModalSenha = false">✏️</button>
        </div>
        <input 
          type="password" 
          placeholder="Digite sua senha para confirmar a edição:" 
          v-model="senha"
          class="modal-input" 
        />
        <button class="btn-confirmar" @click="meConfirmarEdicao">Confirmar</button>
      </div>
    </div>
</template>

<style scoped>

.edit-input, .edit-select {
  border: 1px solid #73441b;
  border-radius: 8px;
  padding: 4px 8px;
  background-color: #f1edd2;
  color: #333f34;
  font-weight: bold;
  margin-left: 8px;
}

.btn-confirmar {
  margin-top: 20px;
  background-color: #9a9e70;
  color: #333f34;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  background-color: #9a9e70;
  padding: 24px;
  border-radius: 16px;
  width: 320px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #73441b;
  background-color: #d1cbb0;
  margin-bottom: 16px;
  box-sizing: border-box;
}
</style>
