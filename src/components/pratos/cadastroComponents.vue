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
    alert("Selecione uma imagem menor que 1MB.")
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
    alert("Preencha todos os campos.")
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
    alert("Erro ao salvar o agendamento. Tente utilizar fotos menores.")
    console.error(error)
  }
}
</script>

<template>

  <main class="container">
    <h1>Bem-Vindo ao NutriVitae</h1>

    <!-- Seção Usuarío -->
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
      </div>
    </section>

  </main>
</template>