<script setup>
import { ref, computed, onMounted } from 'vue'

const buscaTermo = ref('')

// Controle do Modal
const modalAberto = ref(false)
const pratoSelecionado = ref(null)

const pratos = ref([
  {
    id: 1,
    nome: 'Arroz de Frango Cremoso',
    profissional: 'Marcos Oliveira Santos',
    data: '23/01/26',
    calorias: '730 Kcal',
    foto: '/public/pratos/arroz-frango.png',
    modoPreparo:
      'Faça a mistura cremosa: Em uma panela pequena ou frigideira grande, coloque o frango desfiado, o milho e adicione o creme de leite (ou requeijão). Mexa em fogo baixo até esquentar e ficar bem homogêneo.',
    ingredientes: [
      '1 xícara (130g): de arroz branco cozido',
      '1 colher de sopa: de azeite de oliva extra virgem',
      '1 pedaço médio (100g): de mandioca ou batata-doce cozida e amassada (estilo purê)',
    ],
  },
  {
    id: 2,
    nome: 'Crepioca de Frango',
    profissional: 'Marcos Oliveira Santos',
    data: '24/02/26',
    calorias: '360 Kcal',
    foto: '/public/pratos/crepioca.png',
    modoPreparo:
      'Prepare a massa: Em um recipiente, bata bem o ovo com a goma de tapioca, a água, o sal e o orégano até ficar uma mistura homogênea. Grelhe a crepioca: Aqueça uma frigideira antiaderente em fogo baixo.',
    ingredientes: [
      '1: ovo inteiro',
      '1 colher de sopa: de goma de tapioca',
      '1 colher de sopa: de água (para deixar a massa mais leve)',
    ],
  },
])

onMounted(() => {
  const salvo = localStorage.getItem('dadosPrato')
  if (salvo) {
    const dados = JSON.parse(salvo)

    const novoPrato = {
      id: Date.now(),
      nome: dados.nome || 'Prato sem nome',
      profissional: dados.profissional || 'Profissional não informado',
      data: dados.data || new Date().toLocaleDateString('pt-BR'),
      calorias: dados.calorias || '0 Kcal',
      foto: dados.foto || '/public/pratos/default.png',
      modoPreparo: dados.modoPreparo || '',
      ingredientes: dados.ingredientes || [],
    }

    pratos.value.unshift(novoPrato)
  }
})

const pratosFiltrados = computed(() => {
  const termo = buscaTermo.value.trim().toLowerCase()
  if (!termo) return pratos.value

  return pratos.value.filter(
    (item) =>
      item.nome.toLowerCase().includes(termo) ||
      item.profissional.toLowerCase().includes(termo),
  )
})

function verPrato(prato) {
  pratoSelecionado.value = prato
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  pratoSelecionado.value = null
}
</script>

<template>
  <div class="container">
    <h1>Buscar Pratos Personalizados</h1>

    <!-- Barra de busca -->
    <div class="search-bar">
      <input
        type="text"
        v-model="buscaTermo"
        placeholder="Pratos Personalizados..."
      />
      <span class="search-icon">🔍</span>
    </div>

    <!-- Lista de Cards -->
    <div class="card-list">
      <div v-for="prato in pratosFiltrados" :key="prato.id" class="dish-card">
        
        <!-- Coluna Esquerda: Imagem e Botão -->
        <div class="left-col">
          <img :src="prato.foto" :alt="prato.nome" class="dish-img" />
          <button class="btn-ver" @click="verPrato(prato)">Ver Prato</button>
        </div>

        <!-- Coluna Central: Nomes e Modo de Preparo -->
        <div class="center-col">
          <p class="field">
            <strong>Nome do Prato:</strong>
            <span class="highlight">{{ prato.nome }}</span>
          </p>
          <p class="field">
            <strong>Nome do Profissional:</strong>
            <span class="highlight">{{ prato.profissional }}</span>
          </p>

          <div class="section-block">
            <h3>Modo de Preparo</h3>
            <p class="text-body">{{ prato.modoPreparo }}</p>
          </div>
        </div>

        <!-- Coluna Direita: Data, Calorias e Ingredientes -->
        <div class="right-col">
          <p class="field">
            <strong>Data de Criação:</strong>
            <span class="highlight">{{ prato.data }}</span>
          </p>
          <p class="field">
            <strong>Calorias:</strong>
            <span class="highlight">{{ prato.calorias }}</span>
          </p>

          <div class="section-block">
            <h3>Ingredientes</h3>
            <ul>
              <li v-for="(ing, idx) in prato.ingredientes" :key="idx">
                • {{ ing }}
              </li>
            </ul>
          </div>
        </div>

      </div>

      <p v-if="pratosFiltrados.length === 0" class="no-results">
        Nenhum prato encontrado para "{{ buscaTermo }}".
      </p>
    </div>

    <!-- Modal "Vizualizar Prato Personalizado" -->
    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-layout">
        
        <!-- Barra Lateral Verde Esquerda -->
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

        <!-- Conteúdo Principal -->
        <div class="main-content">
          <button class="btn-delete" @click="fecharModal" title="Fechar">🗑️</button>

          <h2 class="title-header">Vizualizar Prato Personalizado</h2>

          <!-- Bloco Superior: Imagem + Nome -->
          <div class="top-row">
            <img 
              :src="pratoSelecionado?.foto" 
              alt="Foto do Prato" 
              class="dish-avatar"
              @error="(e) => e.target.src = 'https://via.placeholder.com/100'"
            />

            <div class="pill-field full-pill">
              <span class="pill-label">Nome do Prato:</span>
              <span class="pill-value">{{ pratoSelecionado?.nome }}</span>
            </div>
          </div>

          <!-- Bloco do Meio: Calorias e Data -->
          <div class="middle-row">
            <div class="pill-field">
              <span class="pill-label">Calorias:</span>
              <span class="pill-value">{{ pratoSelecionado?.calorias }}</span>
            </div>

            <div class="pill-field">
              <span class="pill-label">Data de Criação:</span>
              <span class="pill-value">{{ pratoSelecionado?.data }} 📅</span>
            </div>
          </div>

          <!-- Bloco Inferior: Modo de Preparo e Ingredientes (Lado a Lado) -->
          <div class="bottom-boxes">
            <!-- Box Modo de Preparo -->
            <div class="info-card">
              <h3>Modo de Preparo</h3>
              <div class="card-scroll-content">
                <p>{{ pratoSelecionado?.modoPreparo }}</p>
              </div>
            </div>

            <!-- Box Ingredientes -->
            <div class="info-card">
              <h3>Ingredientes</h3>
              <div class="card-scroll-content">
                <ul>
                  <li v-for="(ing, idx) in pratoSelecionado?.ingredientes" :key="idx">
                    • {{ ing }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #73441B;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 24px;
}

.search-bar {
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 28px auto;
}

.search-bar input {
  width: 100%;
  padding: 12px 45px 12px 20px;
  border-radius: 20px;
  border: 1px solid #5d6742;
  background-color: #909867;
  color: #2b3323;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.search-bar input::placeholder {
  color: #2b3323;
  opacity: 0.8;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 850px;
  margin: 0 auto;
}

.dish-card {
  display: grid;
  grid-template-columns: 140px 1fr 1fr;
  gap: 16px;
  background-color: #d6caaf;
  border: 1px solid #8c5322;
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #4a2e16;
}

.left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dish-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #8c5322;
}

.btn-ver {
  background-color: #9A9E70;
  color: #333F34;
  border: 1.5px solid #536236;
  border-radius: 12px;
  padding: 6px 16px;
  font-weight: bold;
  cursor: pointer;
}

.field {
  font-size: 0.95rem;
  margin-bottom: 6px;
  color: #333f34;
  font-weight: bold;
}

.highlight {
  color: #BF945A;
  margin-left: 4px;
  font-weight: bold;
}

.section-block h3 {
  font-size: 1.1rem;
  color: #333F34;
  margin: 12px 0 6px 0;
  text-align: center;
  font-weight: bold;
}

.text-body {
  font-size: 0.8rem;
  line-height: 1.3;
  font-weight: bold;
  color: #536236;
}

.right-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.right-col li {
  font-size: 0.8rem;
  line-height: 1.3;
  margin-bottom: 4px;
  color: #536236;
  font-weight: bold;
}

.no-results {
  color: #536236;
  text-align: center;
  font-weight: 500;
  margin-top: 15px;
}

/* Modal Estilo Fiel à Segunda Imagem */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-layout {
  display: flex;
  background-color: #EDE8D0;
  width: 880px;
  max-width: 95vw;
  height: 500px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  font-family: serif;
}

/* Lateral verde */
.sidebar {
  width: 80px;
  background-color: #546237;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #EDE8D0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Conteúdo Principal */
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
  font-size: 0.9rem;
}

.title-header {
  color: #7A4E29;
  font-size: 2.6rem;
  text-align: center;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 25px;
}

/* Topo e Pílulas */
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

/* Boxes inferiores com Scroll */
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

/* Personalização da Scrollbar das caixas */
.card-scroll-content::-webkit-scrollbar {
  width: 6px;
}

.card-scroll-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.card-scroll-content::-webkit-scrollbar-thumb {
  background: #546237;
  border-radius: 10px;
}

.card-scroll-content p {
  margin: 0;
  font-size: 0.85rem;
  color: #212121;
  line-height: 1.35;
  font-weight: 500;
  font-family: sans-serif;
}

.card-scroll-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-scroll-content li {
  font-size: 0.85rem;
  color: #212121;
  line-height: 1.4;
  margin-bottom: 6px;
  font-weight: 500;
  font-family: sans-serif;
}
</style>