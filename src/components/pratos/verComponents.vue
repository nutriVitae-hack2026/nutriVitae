<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const prato = ref(null)

onMounted(() => {
  const salvo = localStorage.getItem('pratoSelecionado')
  if (salvo) {
    prato.value = JSON.parse(salvo)
  }
})

function voltar() {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <div class="modal-layout">
      
      <!-- Lateral Esquerda Verde -->
      <div class="sidebar">
        <div class="menu-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="sidebar-footer">
          <div class="logo-circle">
            <span class="logo-text">NutriVitae</span>
          </div>
          <button class="btn-edit-icon" title="Editar">✏️</button>
        </div>
      </div>

      <!-- Conteúdo Principal da Página -->
      <div class="main-content">
        <button class="btn-delete" @click="voltar" title="Voltar / Fechar">🗑️</button>

        <h2 class="title-header">Vizualizar Prato Personalizado</h2>

        <!-- Topo: Imagem e Nome do Prato -->
        <div class="top-row">
          <img 
            :src="prato?.foto || 'https://via.placeholder.com/100'" 
            alt="Foto do Prato" 
            class="dish-avatar" 
          />

          <div class="pill-field full-pill">
            <span class="pill-label">Nome do Prato:</span>
            <span class="pill-value">{{ prato?.nome }}</span>
          </div>
        </div>

        <!-- Meio: Calorias e Data -->
        <div class="middle-row">
          <div class="pill-field">
            <span class="pill-label">Calorias:</span>
            <span class="pill-value">{{ prato?.calorias }}</span>
          </div>

          <div class="pill-field">
            <span class="pill-label">Data de Criação:</span>
            <span class="pill-value">{{ prato?.data }} 📅</span>
          </div>
        </div>

        <!-- Baixo: Modo de Preparo e Ingredientes Lado a Lado -->
        <div class="bottom-boxes">
          <div class="info-card">
            <h3>Modo de Preparo</h3>
            <div class="card-scroll-content">
              <p>{{ prato?.modoPreparo }}</p>
            </div>
          </div>

          <div class="info-card">
            <h3>Ingredientes</h3>
            <div class="card-scroll-content">
              <ul>
                <li v-for="(ing, idx) in prato?.ingredientes" :key="idx">
                  • {{ ing }}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #4a4a4a;
  padding: 20px;
}

.modal-layout {
  display: flex;
  background-color: #EDE8D0;
  width: 900px;
  max-width: 95vw;
  height: 520px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  font-family: serif;
}

.sidebar {
  width: 85px;
  background-color: #546237;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}

.menu-hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.menu-hamburger span {
  width: 30px;
  height: 2px;
  background-color: #EDE8D0;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #A18D68;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 0.6rem;
  color: #A18D68;
}

.btn-edit-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #EDE8D0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.main-content {
  flex: 1;
  padding: 25px 35px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.btn-delete {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #EDE8D0;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.25);
  cursor: pointer;
}

.title-header {
  color: #7A4E29;
  font-size: 2.6rem;
  text-align: center;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 25px;
}

.top-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.dish-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.pill-field {
  background-color: #CFC3A7;
  border-radius: 12px;
  padding: 8px 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 8px;
}

.full-pill {
  flex: 1;
}

.middle-row {
  display: flex;
  gap: 20px;
  margin-left: 110px;
  margin-bottom: 25px;
}

.pill-label {
  color: #4D5735;
  font-weight: bold;
  font-size: 1rem;
}

.pill-value {
  color: #A46938;
  font-size: 1rem;
  font-weight: 500;
}

.bottom-boxes {
  display: flex;
  gap: 25px;
  margin-top: 10px;
}

.info-card {
  flex: 1;
  background-color: #CFC3A7;
  border-radius: 16px;
  padding: 12px 18px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.15);
  height: 160px;
  display: flex;
  flex-direction: column;
}

.info-card h3 {
  text-align: center;
  margin: 0 0 10px 0;
  color: #212121;
  font-size: 1.2rem;
  font-weight: normal;
}

.card-scroll-content {
  overflow-y: auto;
  padding-right: 6px;
  flex: 1;
}

.card-scroll-content::-webkit-scrollbar {
  width: 6px;
}

.card-scroll-content::-webkit-scrollbar-thumb {
  background: #546237;
  border-radius: 10px;
}

.card-scroll-content p, .card-scroll-content li {
  margin: 0;
  font-size: 0.85rem;
  color: #212121;
  line-height: 1.35;
  font-family: sans-serif;
}

.card-scroll-content ul {
  list-style: none;
  padding: 0;
}
</style>