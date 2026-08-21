<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const agendamento = ref({
  profissional: {
    nome: '',
    calorias: '',
    foto: null,
    data: '',
    preparo: '',
    ingredientes: '',
  },
})

function converterParaBase64(arquivo, callback) {
  // Limita o tamanho do arquivo a ~1MB para evitar estouro do localStorage
  if (arquivo.size > 1024 * 1024) {
    alert('Selecione uma imagem menor que 1MB.')
    return
  }

  const reader = new FileReader()
  reader.onloadend = () => callback(reader.result)
  reader.readAsDataURL(arquivo)
}

function aoSelecionarFotoPrato(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      agendamento.value.profissional.foto = base64
    })
  }
}

function validarFormulario() {
  const { profissional } = agendamento.value

  if (
    !profissional.nome ||
    !profissional.calorias ||
    !profissional.data ||
    !profissional.preparo ||
    !profissional.ingredientes
  ) {
    alert('Preencha todos os campos.')
    return false
  }

  return true
}

function salvar() {
  // Se validarFormulario() retornar false, o 'return' para aqui
  if (!validarFormulario()) return

  try {
    localStorage.setItem('dadosAgendamento', JSON.stringify(agendamento.value))
    router.push('/buscar')
  } catch (error) {
    alert('Erro ao salvar o agendamento. Tente utilizar fotos menores.')
    console.error(error)
  }
}
</script>

<template>
  <main class="container">
    <header class="header-banner">
      <h1>Bem-Vindo ao NutriVitae</h1>
    </header>

    <section>
      <div class="grid-form">
        <div class="input-card full-width">
          <label for="usr-email">Nome do Prato</label>
          <input id="usr-email" type="email" v-model="agendamento.profissional.nome" />
        </div>

        <div class="input-card">
          <label for="usr-tel">Calorias:</label>
          <input id="usr-tel" type="text" v-model="agendamento.profissional.calorias" />
        </div>

        <div class="input-card">
          <label for="data">data de Criação:</label>
          <input id="data" type="date" v-model="agendamento.profissional.data" />
        </div>

        <div class="input-card full-width">
          <label for="usr-foto">Foto do Prato</label>
          <input id="usr-foto" type="file" accept="image/*" @change="aoSelecionarFotoPrato" />
        </div>

        <div class="input-grande">
          <label for="preparo">Modo de Preparo:</label>
          <input id="preparo" type="text" v-model="agendamento.profissional.preparo" />
        </div>

        <div class="input-grande">
          <label for="ingredientes">Ingredientes:</label>
          <input id="ingredientes" type="text" v-model="agendamento.profissional.ingredientes" />
        </div>
      </div>
    </section>
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
  margin-bottom: 24px;
}

/* Grid layout de 2 colunas */
.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
/* Faz o nome p/ select ocuparem a linha inteira */
.full-width {
  grid-column: span 2;
}

.input-grande {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}  

.input-grande label {
  color: #536236;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
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
.input-card select {
  cursor: pointer;
}
.input-card select option {
  background-color: #cbba9c;
  color: #4b5a32;
  padding: 10px;
}

/*imagem do usúrio e profissional*/
.input-card input[type='file'] {
  font-size: 0.85rem;
  color: #333f34;
}
.input-card input[type='file']::file-selector-button {
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 8px;
  padding: 2px 8px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.2s;
}
.input-card input[type='file']::file-selector-button:hover {
  background-color: #6b7c4f;
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

.resumo-container {
  position: relative;
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  min-height: 500px;
}
</style>
