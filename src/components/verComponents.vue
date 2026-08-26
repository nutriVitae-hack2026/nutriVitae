<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const prato = ref(null)

const salvo = localStorage.getItem('pratoSelecionado')
if (salvo) {
	prato.value = JSON.parse(salvo)
}

function voltarParaBusca() {
	router.push('/buscar')
}
</script>

<template>
  <div class="resumo-container">

    <section v-if="prato" class="visualizacao-prato">
      <h1>Visualização do Prato</h1>

      <div class="grid-form">
        <div class="input-card full-width">
          <label for="nome-prato">Nome do Prato</label>
          <input id="nome-prato" :value="prato.nome" readonly />
        </div>

        <div class="input-card">
          <label for="profissional">Profissional:</label>
          <input id="profissional" :value="prato.profissional" readonly />
        </div>

        <div class="input-card">
          <label for="calorias">Calorias:</label>
          <input id="calorias" :value="prato.calorias" readonly />
        </div>

        <div class="input-card full-width">
          <label for="data-criacao">Data de Criação:</label>
          <input id="data-criacao" :value="prato.data" readonly />
        </div>

        <div v-if="prato.foto" class="foto-card full-width">
          <span class="label-titulo">Foto do Prato</span>
          <img :src="prato.foto" :alt="`Foto de ${prato.nome}`" class="foto-prato" />
        </div>

        <div class="input-grande">
          <span class="label-titulo">Modo de Preparo:</span>
          <p>{{ prato.modoPreparo }}</p>
        </div>

        <div class="input-grande">
          <span class="label-titulo">Ingredientes:</span>
          <ul>
            <li v-for="(ingrediente, index) in prato.ingredientes" :key="index">
              {{ ingrediente }}
            </li>
          </ul>
        </div>
      </div>

      <div class="botao-container">
        <button class="button" @click="voltarParaBusca">Voltar</button>
        <button class="button" @click="">Excluir</button>
        <button class="button" @click="">Editar</button>
      </div>
    </section>

    <p v-else class="no-results">Nenhum prato selecionado.</p>
  </div>
</template>

<style scoped>

.resumo-container {
  position: relative;
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  min-height: 500px;
}

.visualizacao-prato > h1 {
  color: #73441B;
  margin-bottom: 24px;
   font-size: 3rem;
text-align: center;
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.full-width {
  grid-column: span 2;
}

.input-card,
.input-grande,
.foto-card {
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.input-card {
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.input-card label {
  color: #536236;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
  font-size: 1.25rem;
}

.input-card input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #BF945A;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-grande {
  height: 200px;
  padding: 12px;
  overflow: auto;
}

.label-titulo {
  display: block;
  text-align: center;
  color: #333f34;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.input-grande p,
.input-grande ul {
  margin: 0;
  color: #333f34;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.45;
}

.input-grande ul {
  padding-left: 24px;
}

.foto-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
}

.foto-card .label-titulo {
  min-width: 180px;
  margin: 0;
}

.foto-prato {
  width: 110px;
  height: 110px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #9c8a6f;
}

.botao-container {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding: 0 20px;
}

.button {
  min-width: 160px;
  padding: 10px 28px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 20px;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  transition:
    background-color 0.2s,
    transform 0.1s;
}

.button:hover {
  background-color: #83875a;
}

.button:active {
  transform: scale(0.98);
}

.no-results {
  padding-top: 140px;
  color: #333f34;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}
</style>
