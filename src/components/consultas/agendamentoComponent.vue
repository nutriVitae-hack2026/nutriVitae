<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Identificação do perfil ativo no momento do acesso
const tipoAcesso = ref('usuario') // 'profissional' ou 'usuario'

// 1. Listas de Cadastrados no Sistema
const listaProfissionais = ref([
  {
    id: 1,
    nome: 'Dra. Carolina Paz Alencar',
    telefone: '(47) 99999-1111',
    email: 'carolina@email.com',
    foto: '/public/usuarios/carolina-user.png'
  },
  {
    id: 2,
    nome: 'Dr. Alexandre Xavier',
    telefone: '(47) 99999-2222',
    email: 'alexandre@email.com',
    foto: '/public/usuarios/alexandre-user.png'
  },
  {
    id: 3,
    nome: 'Dra. Fabiana Oliveira',
    telefone: '(47) 99999-3333',
    email: 'fabiana@email.com',
    foto: '/public/usuarios/fabiana-user.png'
  }
])

const listaPacientes = ref([
  {
    id: 101,
    nome: 'Gabriel Lima da Costa',
    telefone: '(47) 98888-1111',
    email: 'gabriel@email.com',
    foto: '/public/usuarios/gabriel-user(1).png'
  },
  {
    id: 102,
    nome: 'Amanda de Sousa Lima',
    telefone: '(47) 98888-2222',
    email: 'amanda@email.com',
    foto: '/public/usuarios/amanda-user.png'
  },
  {
    id: 103,
    nome: 'Carlos Eduardo da Silva',
    telefone: '(47) 98888-3333',
    email: 'carlos@email.com',
    foto: '/public/usuarios/eduardo-user.png'
  }
])

// Variáveis para guardar IDs selecionados nos dropdowns
const profissionalSelecionadoId = ref('')
const pacienteSelecionadoId = ref('')

// Estrutura do agendamento
const agendamento = ref({
  usuario: { nome: '', telefone: '', email: '', foto: null },
  profissional: { nome: '', telefone: '', email: '', foto: null },
  consulta: { data: '', horario: '', tipo: 'Presencial' }
})

// Converte arquivo enviado para Base64
function converterParaBase64(arquivo, callback) {
  if (arquivo.size > 1024 * 1024) {
    alert('Selecione uma imagem menor que 1MB.')
    return
  }
  const reader = new FileReader()
  reader.onloadend = () => callback(reader.result)
  reader.readAsDataURL(arquivo)
}

function aoSelecionarFotoUsuario(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      agendamento.value.usuario.foto = base64
    })
  }
}

function aoSelecionarFotoProfissional(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      agendamento.value.profissional.foto = base64
    })
  }
}

// Observa mudanças de seleção do Profissional
watch(profissionalSelecionadoId, (novoId) => {
  if (tipoAcesso.value === 'usuario') {
    const prof = listaProfissionais.value.find((p) => p.id === Number(novoId))
    if (prof) agendamento.value.profissional = { ...prof }
  }
})

// Observa mudanças de seleção do Paciente
watch(pacienteSelecionadoId, (novoId) => {
  if (tipoAcesso.value === 'profissional') {
    const pac = listaPacientes.value.find((p) => p.id === Number(novoId))
    if (pac) agendamento.value.usuario = { ...pac }
  }
})

// Limpa campos ao trocar o tipo de usuário que está acessando
function alternarTipoAcesso(novoTipo) {
  tipoAcesso.value = novoTipo
  profissionalSelecionadoId.value = ''
  pacienteSelecionadoId.value = ''
  agendamento.value.usuario = { nome: '', telefone: '', email: '', foto: null }
  agendamento.value.profissional = { nome: '', telefone: '', email: '', foto: null }
}

function validarFormulario() {
  const { usuario, profissional, consulta } = agendamento.value

  if (
    !usuario.nome ||
    !usuario.telefone ||
    !usuario.email ||
    !profissional.nome ||
    !profissional.telefone ||
    !profissional.email ||
    !consulta.data ||
    !consulta.horario
  ) {
    alert('Preencha ou selecione todas as informações do profissional, usuário e consulta.')
    return false
  }

  return true
}

function agendar() {
  if (!validarFormulario()) return

  try {
    localStorage.setItem('dadosAgendamento', JSON.stringify(agendamento.value))
    router.push('/resumo')
  } catch (error) {
    alert('Erro ao salvar o agendamento.')
    console.error(error)
  }
}
</script>

<template>
  <main class="container">
    <h1>Agendar Consulta</h1>

    <!-- Alternador de Perfil do Acesso -->
    <div class="role-selector">
      <p>Você está acessando como:</p>
      <div class="btn-group">
        <button
          :class="['btn-toggle', { active: tipoAcesso === 'usuario' }]"
          @click="alternarTipoAcesso('usuario')"
        >
          👤 Sou Usuário / Paciente
        </button>
        <button
          :class="['btn-toggle', { active: tipoAcesso === 'profissional' }]"
          @click="alternarTipoAcesso('profissional')"
        >
          👨‍⚕️ Sou Profissional
        </button>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODO 1: SE QUEM ESTÁ ACESSANDO FOR O USUÁRIO / PACIENTE -->
    <!-- ======================================================== -->
    <template v-if="tipoAcesso === 'usuario'">
      <!-- O usuário seleciona o Profissional que deseja -->
      <section>
        <div class="divider">
          <span>Escolha o Profissional</span>
        </div>

        <div class="grid-form">
          <div class="input-card full-width">
            <label for="select-prof">Profissional:</label>
            <select id="select-prof" v-model="profissionalSelecionadoId">
              <option value="" disabled>Selecione quem vai te atender...</option>
              <option v-for="prof in listaProfissionais" :key="prof.id" :value="prof.id">
                {{ prof.nome }}
              </option>
            </select>
          </div>

          <div v-if="agendamento.profissional.nome" class="profile-preview full-width">
            <img :src="agendamento.profissional.foto || 'https://via.placeholder.com/150'" class="preview-avatar" />
            <div>
              <p><strong>E-mail:</strong> {{ agendamento.profissional.email }}</p>
              <p><strong>Telefone:</strong> {{ agendamento.profissional.telefone }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- O usuário preenche os dados dele -->
      <section>
        <div class="divider">
          <span>Seus Dados (Usuário)</span>
        </div>

        <div class="grid-form">
          <div class="input-card">
            <label for="usr-nome">Nome:</label>
            <input id="usr-nome" type="text" v-model="agendamento.usuario.nome" />
          </div>

          <div class="input-card">
            <label for="usr-tel">Telefone:</label>
            <input id="usr-tel" type="text" v-model="agendamento.usuario.telefone" />
          </div>

          <div class="input-card full-width">
            <label for="usr-email">E-mail:</label>
            <input id="usr-email" type="email" v-model="agendamento.usuario.email" />
          </div>

          <div class="input-card full-width">
            <label for="usr-foto">Sua Foto:</label>
            <input id="usr-foto" type="file" accept="image/*" @change="aoSelecionarFotoUsuario" />
          </div>
        </div>
      </section>
    </template>

    <!-- ======================================================== -->
    <!-- MODO 2: SE QUEM ESTÁ ACESSANDO FOR O PROFISSIONAL         -->
    <!-- ======================================================== -->
    <template v-else>
      <!-- O profissional preenche/confirma os seus próprios dados -->
      <section>
        <div class="divider">
          <span>Seus Dados (Profissional)</span>
        </div>

        <div class="grid-form">
          <div class="input-card">
            <label for="prof-nome">Nome:</label>
            <input id="prof-nome" type="text" v-model="agendamento.profissional.nome" />
          </div>

          <div class="input-card">
            <label for="prof-tel">Telefone:</label>
            <input id="prof-tel" type="text" v-model="agendamento.profissional.telefone" />
          </div>

          <div class="input-card full-width">
            <label for="prof-email">E-mail:</label>
            <input id="prof-email" type="email" v-model="agendamento.profissional.email" />
          </div>

          <div class="input-card full-width">
            <label for="prof-foto">Sua Foto:</label>
            <input id="prof-foto" type="file" accept="image/*" @change="aoSelecionarFotoProfissional" />
          </div>
        </div>
      </section>

      <!-- O profissional seleciona o Paciente que vai atender -->
      <section>
        <div class="divider">
          <span>Escolha o Paciente</span>
        </div>

        <div class="grid-form">
          <div class="input-card full-width">
            <label for="select-pac">Paciente:</label>
            <select id="select-pac" v-model="pacienteSelecionadoId">
              <option value="" disabled>Selecione o paciente a ser agendado...</option>
              <option v-for="paciente in listaPacientes" :key="paciente.id" :value="paciente.id">
                {{ paciente.nome }}
              </option>
            </select>
          </div>

          <div v-if="agendamento.usuario.nome" class="profile-preview full-width">
            <img :src="agendamento.usuario.foto || 'https://via.placeholder.com/150'" class="preview-avatar" />
            <div>
              <p><strong>E-mail:</strong> {{ agendamento.usuario.email }}</p>
              <p><strong>Telefone:</strong> {{ agendamento.usuario.telefone }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- SEÇÃO SOBRE A CONSULTA (Comum para ambos os modos) -->
    <section>
      <div class="divider">
        <span>Sobre a Consulta</span>
      </div>

      <div class="grid-form">
        <div class="input-card">
          <label for="data">Data:</label>
          <input id="data" type="date" v-model="agendamento.consulta.data" />
        </div>

        <div class="input-card">
          <label for="horario">Horário:</label>
          <input id="horario" type="time" v-model="agendamento.consulta.horario" />
        </div>

        <div class="input-card full-width">
          <label for="tipo">Tipo de agendamento:</label>
          <select id="tipo" v-model="agendamento.consulta.tipo">
            <option value="Presencial">Presencial</option>
            <option value="Online (EAD)">Online (EAD)</option>
          </select>
        </div>
      </div>
    </section>

    <button @click="agendar" class="btn-agendar">Confirmar Agendamento</button>
  </main>
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
  font-size: 3rem;
  margin-bottom: 16px;
}

/* Seletor de Perfil */
.role-selector {
  text-align: center;
  margin-bottom: 24px;
}

.role-selector p {
  color: #536236;
  font-weight: bold;
  margin-bottom: 8px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-toggle {
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid #73441b;
  background-color: #f1edd2;
  color: #73441b;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-toggle.active {
  background-color: #73441b;
  color: #f1edd2;
}

/* Linha divisória */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 16px 0;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1.5px solid #536236;
}
.divider span {
  padding: 0 12px;
  color: #6b7c4f;
  font-size: 0.95rem;
  font-weight: bold;
}

/* Layout do formulário */
.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.full-width {
  grid-column: span 2;
}

.input-card {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}

.input-card label {
  color: #536236;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
}

.input-card input,
.input-card select {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
}

.input-card select option {
  background-color: #cbba9c;
  color: #4b5a32;
}

/* Preview do item selecionado */
.profile-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #f1edd2;
  border: 1px solid #73441b;
  border-radius: 12px;
  padding: 12px;
}

.preview-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-preview p {
  margin: 2px 0;
  color: #333f34;
  font-size: 0.9rem;
}

.btn-agendar {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>