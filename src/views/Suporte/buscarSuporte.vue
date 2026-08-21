<script setup>
import { computed, onMounted, ref } from 'vue'

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

function voltarSuporte() {

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


      <input
        type="text"
        v-model="buscarTermo"
        placeholder="Buscar suporte..."
      />
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
.principal{
  color: brown;
}
</style>
