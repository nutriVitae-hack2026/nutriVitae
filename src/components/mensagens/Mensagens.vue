<template>
  <div class="chat-wrapper">
    <div class="app-container">
      <header class="top-bar">
        <div class="user-info">
          <div class="avatar">{{ userInitial }}</div>
          <span>{{ userData.nome || 'Usuário' }}</span>
          <button class="settings-btn" title="Perfil do Usuário" @click="toggleProfile">⚙️</button>
        </div>

        <div v-if="!showProfile" class="chat-target-info">
          <div class="avatar">{{ activeContact.avatar }}</div>
          <span>{{ activeContact.name }}</span>
        </div>
      </header>

      <main v-if="!showProfile" class="chat-view">
        <aside class="sidebar">
          <div
            v-for="contact in contacts"
            :key="contact.id"
            class="contact-card"
            :class="{ active: contact.id === activeContactId }"
            @click="activeContactId = contact.id"
          >
            <div class="avatar">{{ contact.avatar }}</div>
            <div class="contact-details">
              <span class="contact-name">{{ contact.name }}</span>
              <span class="contact-role">{{ contact.role }}</span>
            </div>
          </div>
        </aside>

        <section class="chat-area">
          <div ref="messagesContainer" class="messages-container" @click="closeContextMenu">
            <div
              v-for="msg in activeMessages"
              :key="msg.id"
              class="message"
              :class="msg.sender"
              @contextmenu.prevent="openContextMenu($event, msg.id)"
            >
              <span>{{ msg.text }}</span>
              <span v-if="msg.edited" class="message-edited">(editado)</span>
            </div>
          </div>

          <form class="input-container" @submit.prevent="sendMessage">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Digite sua mensagem..."
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

      <main v-else class="profile-view">
        <div class="profile-header">
          <h2>Perfil do Usuário</h2>
        </div>
        
        <div class="profile-grid">
          <div class="profile-card">
            <label>Nome:</label>
            <p>{{ userData.nome || 'Não informado' }}</p>
          </div>
          <div class="profile-card">
            <label>CPF:</label>
            <p>{{ userData.cpf || 'Não informado' }}</p>
          </div>
          <div class="profile-card">
            <label>Peso:</label>
            <p>{{ userData.peso || 'Não informado' }}</p>
          </div>
          <div class="profile-card">
            <label>Data de Nascimento:</label>
            <p>{{ formatDate(userData.dataNascimento) }}</p>
          </div>
          <div class="profile-card">
            <label>E-mail:</label>
            <p>{{ userData.email || 'Não informado' }}</p>
          </div>
          <div class="profile-card">
            <label>Telefone:</label>
            <p>{{ userData.telefone || 'Não informado' }}</p>
          </div>
        </div>

        <div class="profile-actions">
          <button type="button" class="btn-cancel" @click="showProfile = false">Voltar ao Chat</button>
        </div>
      </main>

      <div
        v-if="contextMenu.visible"
        class="context-menu"
        :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
      >
        <button @click="editMessage">✏️ Editar</button>
        <button @click="deleteMessage">🗑️ Apagar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, reactive, onMounted } from 'vue'

const showProfile = ref(false)
const activeContactId = ref(1)
const newMessage = ref('')
const messagesContainer = ref(null)

const userData = reactive({
  nome: '',
  cpf: '',
  peso: '',
  dataNascimento: '',
  email: '',
  telefone: ''
})

onMounted(() => {
  const savedData = localStorage.getItem('usuarioLogado')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      Object.assign(userData, parsed)
    } catch (e) {
      console.error('Erro ao carregar dados do usuário:', e)
    }
  }
})

const userInitial = computed(() => {
  return userData.nome ? userData.nome.charAt(0).toUpperCase() : 'U'
})

const formatDate = (dateStr) => {
  if (!dateStr) return 'Não informado'
  const [year, month, day] = dateStr.split('-')
  return day && month && year ? `${day}/${month}/${year}` : dateStr
}

const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  messageId: null
})

const contacts = ref([
  { id: 1, name: 'Juliana', role: 'Nutricionista', avatar: 'J' },
  { id: 2, name: 'Carlos', role: 'Nutricionista', avatar: 'C' },
  { id: 3, name: 'Rafael', role: 'Nutricionista', avatar: 'R' },
  { id: 4, name: 'Mariana', role: 'Nutricionista', avatar: 'M' }
])

const conversationHistory = reactive({
  1: [
    { id: 101, sender: 'sent', text: 'Olá, nutricionista! Gostaria de melhorar minha alimentação.' },
    { id: 102, sender: 'received', text: 'Olá! O primeiro passo é organizar sua rotina diária.' }
  ],
  2: [
    { id: 201, sender: 'received', text: 'Olá! Como foram suas refeições essa semana?' }
  ],
  3: [],
  4: []
})

const activeContact = computed(() => {
  return contacts.value.find(c => c.id === activeContactId.value) || contacts.value[0]
})

const activeMessages = computed(() => {
  return conversationHistory[activeContactId.value] || []
})

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  closeContextMenu()
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  if (!conversationHistory[activeContactId.value]) {
    conversationHistory[activeContactId.value] = []
  }

  conversationHistory[activeContactId.value].push({
    id: Date.now(),
    sender: 'sent',
    text: newMessage.value.trim()
  })

  newMessage.value = ''
  await nextTick()
  scrollToBottom()
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const openContextMenu = (event, id) => {
  contextMenu.visible = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.messageId = id
}

const closeContextMenu = () => {
  contextMenu.visible = false
}

const deleteMessage = () => {
  const list = conversationHistory[activeContactId.value]
  if (list) {
    conversationHistory[activeContactId.value] = list.filter(m => m.id !== contextMenu.messageId)
  }
  closeContextMenu()
}

const editMessage = () => {
  const list = conversationHistory[activeContactId.value]
  const msg = list?.find(m => m.id === contextMenu.messageId)

  if (msg) {
    const updatedText = prompt('Editar mensagem:', msg.text)
    if (updatedText !== null && updatedText.trim() !== '') {
      msg.text = updatedText.trim()
      msg.edited = true
    }
  }
  closeContextMenu()
}
</script>

<style scoped>
/* CONTAINER PRINCIPAL (+15% ADICIONAIS DE TAMANHO) */
.chat-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #F1EDD2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.app-container {
  width: 100%;
  max-width: 1080px;
  height: 690px;
  background-color: #F1EDD2;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* TOP BAR */
.top-bar {
  height: 56px;
  background-color: #333F34;
  color: #F1EDD2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
}

.chat-target-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #D1BFA5;
  color: #333F34;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.95rem;
}

.settings-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #F1EDD2;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-left: 2px;
}

.settings-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* CHAT VIEW */
.chat-view {
  display: flex;
  flex: 1;
  height: calc(100% - 56px);
}

.sidebar {
  width: 270px;
  background-color: #D1BFA5;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  color: #333F34;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.contact-card:hover, .contact-card.active {
  background-color: rgba(255, 255, 255, 0.3);
}

.contact-details {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: bold;
  font-size: 0.92rem;
}

.contact-role {
  font-size: 0.8rem;
  opacity: 0.8;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: space-between;
  background-color: #F1EDD2;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 8px;
}

.message {
  max-width: 68%;
  padding: 11px 16px;
  border-radius: 10px;
  background-color: #9A9E70;
  color: #333F34;
  font-size: 0.92rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.sent {
  align-self: flex-end;
}

.message.received {
  align-self: flex-start;
}

.message-edited {
  font-size: 10px;
  opacity: 0.7;
  margin-left: 6px;
}

.input-container {
  display: flex;
  gap: 12px;
  margin-top: 14px;
}

.input-container input {
  flex: 1;
  padding: 12px 14px;
  border: none;
  border-radius: 6px;
  background-color: #D1BFA5;
  color: #73441B;
  font-size: 0.92rem;
  outline: none;
}

.input-container input::placeholder {
  color: #73441B;
  opacity: 0.7;
}

.input-container button {
  padding: 0 22px;
  background-color: #9A9E70;
  color: #333F34;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.92rem;
  cursor: pointer;
}

/* MENU CONTEXTUAL */
.context-menu {
  position: fixed;
  background-color: #333F34;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 1000;
  overflow: hidden;
}

.context-menu button {
  display: block;
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  color: #F1EDD2;
  text-align: left;
  cursor: pointer;
  font-size: 0.85rem;
}

.context-menu button:hover {
  background-color: #9A9E70;
  color: #333F34;
}

/* PERFIL DO USUÁRIO */
.profile-view {
  flex: 1;
  padding: 28px;
  background-color: #F1EDD2;
  color: #73441B;
  overflow-y: auto;
}

.profile-header h2 {
  font-size: 1.35rem;
  margin-bottom: 20px;
  color: #73441B;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.profile-card {
  background-color: #9A9E70;
  padding: 14px;
  border-radius: 6px;
}

.profile-card label {
  display: block;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 4px;
  text-transform: uppercase;
  color: #333F34;
}

.profile-card p {
  font-size: 0.92rem;
  margin: 0;
  color: #333F34;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

.btn-cancel {
  padding: 10px 24px;
  background-color: #D1BFA5;
  color: #73441B;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.92rem;
}
</style>