<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '@/router'

const buscarTermo = ref('')
const suportes = ref([])
const filtros = ref({ data: '', status: '', prioridade: '' })
const imagemSelecionada = ref(null)

function obterStatus(item) {
  return item.status || item.chamada || 'em-andamento'
}

function textoStatus(status) {
  return status === 'resolvido' ? 'Resolvido' : 'Em andamento'
}

function formatarData(data) {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : data
}

const suportesFiltrados = computed(() => {
  const termo = buscarTermo.value.trim().toLowerCase()

  return suportes.value.filter((item) => {
    const texto = [
      item.id,
      item.usuario?.nome,
      item.usuario?.email,
      item.assunto,
      item.usuario?.categoria,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (
      (!termo || texto.includes(termo)) &&
      (!filtros.value.data || item.data === filtros.value.data) &&
      (!filtros.value.status || obterStatus(item) === filtros.value.status) &&
      (!filtros.value.prioridade || item.prioridade === filtros.value.prioridade)
    )
  })
})

onMounted(() => {
  suportes.value = JSON.parse(localStorage.getItem('suportes') || '[]').map((item) => ({
    ...item,
    status: obterStatus(item),
  }))
})

function apagarSuporte(id) {
  suportes.value = suportes.value.filter((item) => item.id !== id)
  localStorage.setItem('suportes', JSON.stringify(suportes.value))
}

function resolverSuporte(id) {
  suportes.value = suportes.value.map((item) =>
    item.id === id ? { ...item, status: 'resolvido' } : item,
  )
  localStorage.setItem('suportes', JSON.stringify(suportes.value))
}

function voltarSuporte() {
  router.push('/')
}

function limparFiltros() {
  buscarTermo.value = ''
  filtros.value = { data: '', status: '', prioridade: '' }
}

function abrirImagem(src, alt) {
  imagemSelecionada.value = { src, alt }
}

function fecharImagem() {
  imagemSelecionada.value = null
}
</script>

<template>
  <main class="principal">
    <h1>Buscar suporte</h1>

    <div class="barra-buscar">
      <input v-model="buscarTermo" type="text" placeholder="Buscar suporte..." />
      <span class="search-icon mdi mdi-magnify" aria-hidden="true"></span>
    </div>

    <div class="filtros">
      <div class="filtro">
        <label for="status">Status:</label>
        <select id="status" v-model="filtros.status">
          <option value="">Selecione o status</option>
          <option value="em-andamento">Em andamento</option>
          <option value="resolvido">Resolvido</option>
        </select>
      </div>

      <div class="filtro">
        <label for="data">Data:</label>
        <input id="data" v-model="filtros.data" type="date" />
      </div>

      <div class="filtro">
        <label for="prioridade">Prioridade:</label>
        <select id="prioridade" v-model="filtros.prioridade">
          <option value="">Selecione a prioridade</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>
    </div>

    <div v-if="suportesFiltrados.length" class="resultados">
      <article v-for="item in suportesFiltrados" :key="item.id" class="suporte">
        <div class="suporte-cabecalho">
          <div>
            <h2>{{ item.assunto || 'Suporte' }} - Id:{{ item.id ? `${item.id}  ` : '' }}</h2>
            <div class="suporte-detalhes">
              <p><strong>ID:</strong> {{ item.id }}</p>
              <p><strong>Nome:</strong> {{ item.usuario?.nome }}</p>
              <p><strong>Email:</strong> {{ item.usuario?.email }}</p>
              <p><strong>Data:</strong> {{ formatarData(item.data) }}</p>
              <p><strong>Status:</strong> {{ textoStatus(obterStatus(item)) }}</p>
              <p><strong>Prioridade:</strong> {{ item.prioridade }}</p>
              <p v-if="item.usuario?.categoria">
                <strong>Categoria:</strong> {{ item.usuario.categoria }}
              </p>
            </div>
          </div>
          <button
            v-if="item.usuario?.foto || item.foto"
            type="button"
            class="botao-imagem"
            @click="
              abrirImagem(
                item.usuario?.foto || item.foto,
                `Imagem do suporte ${item.assunto || 'sem assunto'}`,
              )
            "
          >
            <img
              :src="item.usuario?.foto || item.foto"
              :alt="`Imagem do suporte ${item.assunto || 'sem assunto'}`"
              class="foto-suporte"
            />
          </button>
        </div>
        <p v-if="item.usuario?.descrever" class="descricao">
          <strong>Descrição:</strong> {{ item.usuario.descrever }}
        </p>
        <div class="acoes-suporte">
          <button
            v-if="obterStatus(item) !== 'resolvido'"
            type="button"
            class="botao-resolver"
            @click="resolverSuporte(item.id)"
          >
            Marcar como resolvido
          </button>
          <button type="button" class="botao-apagar" @click="apagarSuporte(item.id)">Apagar</button>
        </div>
      </article>
    </div>

    <div class="acoes">
      <button type="button" @click="voltarSuporte">Buscar</button>
      <button type="button" @click="limparFiltros">Limpar filtros</button>
    </div>
  </main>

  <div v-if="imagemSelecionada" class="visualizador" @click.self="fecharImagem">
    <button
      type="button"
      class="fechar-visualizador"
      aria-label="Fechar imagem"
      @click="fecharImagem"
    >
      <span class="mdi mdi-close"></span>
    </button>
    <img :src="imagemSelecionada.src" :alt="imagemSelecionada.alt" class="imagem-ampliada" />
  </div>
</template>

<style scoped>
.principal {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
  max-width: 1000px;
  margin: 0 auto;
  padding: 36px 28px 30px;
  font-family: 'Italiana', serif;
}

h1 {
  margin: 0 0 22px;
  color: #73441b;
  font-size: 3.8rem;
  font-weight: 400;
  text-align: center;
}

.barra-buscar {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 5px 14px;
  background-color: #9a9e70;
  border: 1px solid #1b1a17;
  border-radius: 12px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}

.barra-buscar input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  color: #333f34;
  font-family: inherit;
  font-size: 1.35rem;
}

.barra-buscar input::placeholder {
  color: #333f34;
  opacity: 0.75;
}

.search-icon {
  color: #333f34;
  font-size: 1.35rem;
  margin-left: 10px;
}

.filtros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 28px;
}

.filtro {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 4px 9px;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 6px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}

.filtro label {
  margin-right: 5px;
  color: #73441b;
  white-space: nowrap;
}
.filtro select,
.filtro input {
  width: 100%;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: #333f34;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
}
.filtro select {
  cursor: pointer;
}

.filtro select option {
  background-color: #cbba9c;
  color: #4b5a32;
  padding: 10px;
}

.resultados {
  display: grid;
  gap: 16px;
  margin: 24px 0;
  font-size: 15px;
}
.suporte {
  padding: 16px;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}
.suporte-cabecalho {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: start;
}
.suporte-detalhes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 20px;
}
.foto-suporte {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border: 1px solid #73441b;
  border-radius: 6px;
}
.botao-imagem {
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  cursor: zoom-in;
}
.suporte h2 {
  margin: 0 0 12px;
  color: #73441b;
  font-size: 1.5rem;
}
.suporte p {
  margin: 6px 0;
  color: #536236;
  font-size: 1rem;
  font-weight: bold;
}
.descricao {
  padding-top: 12px;
  border-top: 1px solid #9c8a6f;
}
.suporte button,
.acoes button {
  padding: 12px 24px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1.35rem;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}
.suporte button {
  margin-top: 12px;
  padding: 8px 16px;
  font-size: 1rem;
}
.acoes-suporte {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.acoes-suporte button {
  margin-top: 12px;
}
.botao-resolver {
  background-color: #536236 !important;
  color: #f1edd2 !important;
}
.suporte .botao-imagem {
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}
.suporte button:not(.botao-imagem):hover,
.acoes button:hover {
  background-color: #6b7c4f;
}
.sem-resultados {
  color: #536236;
  text-align: center;
}

.acoes {
  display: flex;
  justify-content: space-between;
  gap: 120px;
  max-width: 610px;
  width: 100%;
  margin: auto auto 0;
  padding-top: 28px;
}
.acoes button {
  flex: 1;
}

@media (max-width: 700px) {
  .principal {
    padding: 28px 16px;
  }
  h1 {
    font-size: 2.4rem;
  }
  .filtros {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .filtro {
    min-height: 44px;
  }
  .suporte-cabecalho,
  .suporte-detalhes {
    grid-template-columns: 1fr;
  }
  .botao-imagem {
    justify-self: start;
  }
  .acoes {
    gap: 16px;
  }
}
</style>
