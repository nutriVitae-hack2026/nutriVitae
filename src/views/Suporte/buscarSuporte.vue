<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '@/router'

const buscarTermo = ref('')
const suportes = ref([])

const suporte = ref({
  buscar: {
    data: '',
    chamada: '',
    prioridade: '',
  },
})

const suportesFiltrados = computed(() => {
  const termo = buscarTermo.value.trim().toLowerCase()

  return suportes.value.filter((item) => {
    const texto = [item.usuario?.nome, item.usuario?.email, item.assunto]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (
      (!termo || texto.includes(termo)) &&
      (!suporte.value.buscar.data || item.data === suporte.value.buscar.data) &&
      (!suporte.value.buscar.chamada || item.chamada === suporte.value.buscar.chamada) &&
      (!suporte.value.buscar.prioridade || item.prioridade === suporte.value.buscar.prioridade)
    )
  })
})

onMounted(() => {
  suportes.value = JSON.parse(localStorage.getItem('suportes') || '[]')
})

function apagarSuporte(id) {
  suportes.value = suportes.value.filter((item) => item.id !== id)
  localStorage.setItem('suportes', JSON.stringify(suportes.value))
}

function voltarSuporte() {
  router.push('/')
}

function limparFiltros() {
  buscarTermo.value = ''
  suporte.value.buscar.data = ''
  suporte.value.buscar.chamada = ''
  suporte.value.buscar.prioridade = ''
}
</script>

<template>
  <div class="principal">
    <h1>Buscar suporte</h1>

    <div class="barra-buscar">
      <input type="text" v-model="buscarTermo" placeholder="Buscar suporte..." />
      <span class="search-icon">🔍</span>
    </div>

    <div class="chamada">
      <label for="chamada">Chamada</label>

      <select id="chamada" v-model="suporte.buscar.chamada">
        <option value="" disabled>Selecione a situação da chamada</option>
        <option value="em-andamento">Em andamento</option>
        <option value="revisado">Revisado</option>
      </select>
    </div>

    <div class="data">
      <label for="data">Data:</label>
      <input id="data" type="date" v-model="suporte.buscar.data" />
    </div>

    <div class="prioridade">
      <label for="prioridade">Prioridade</label>

      <select id="prioridade" v-model="suporte.buscar.prioridade">
        <option value="" disabled>Selecione a prioridade</option>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="dificil">Difícil</option>
      </select>
    </div>

    <div v-if="suportesFiltrados.length" class="resultados">
      <article v-for="item in suportesFiltrados" :key="item.id" class="suporte">
        <h2>{{ item.assunto }}</h2>
        <p>{{ item.usuario?.nome }} - {{ item.usuario?.email }}</p>
        <p>{{ item.data }} - {{ item.chamada }} - {{ item.prioridade }}</p>
        <button @click="apagarSuporte(item.id)" type="button">Apagar</button>
      </article>
    </div>
    <p v-else class="sem-resultados">Nenhum suporte encontrado.</p>
  </div>

  <button @click="voltarSuporte" class="bnt-voltar">Voltar</button>
  <button @click="limparFiltros" class="limpar-filtros">Limpar filtros</button>
</template>

<style scoped>
h1 {
  color: #73441b;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 24px;
  font-weight: bold;
}

.principal {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.barra-buscar {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
  position: relative;
}

.barra-buscar input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
}

.search-icon {
  font-size: 1.5rem;
  margin-left: 10px;
  cursor: pointer;
}

.chamada,
.data,
.prioridade {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
}

.chamada label,
.data label,
.prioridade label {
  color: #536236;
  font-weight: 900;
  margin-right: 8px;
  white-space: nowrap;
}

.chamada select,
.data input,
.prioridade select {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
}

.chamada select,
.prioridade select {
  cursor: pointer;
}

.chamada select option,
.prioridade select option {
  background-color: #cbba9c;
  color: #4b5a32;
  padding: 10px;
}

.resultados {
  display: grid;
  gap: 16px;
  margin: 24px 0;
}

.suporte {
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}

.suporte h2 {
  color: #73441b;
  margin: 0 0 12px 0;
  font-size: 1.5rem;
}

.suporte p {
  color: #536236;
  margin: 6px 0;
  font-weight: bold;
}

.suporte button {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.suporte button:hover {
  background-color: #6b7c4f;
}

.sem-resultados {
  text-align: center;
  color: #536236;
  font-size: 1.1rem;
  margin-top: 24px;
}

.bnt-voltar,
.limpar-filtros {
  padding: 12px 24px;
  margin: 12px 8px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.bnt-voltar:hover,
.limpar-filtros:hover {
  background-color: #6b7c4f;
}

@media (max-width: 700px) {
  h1 {
    font-size: 2rem;
  }

  .chamada,
  .data,
  .prioridade {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .chamada label,
  .data label,
  .prioridade label {
    margin-right: 0;
  }

  .chamada select,
  .data input,
  .prioridade select {
    width: 100%;
  }
}
</style>
