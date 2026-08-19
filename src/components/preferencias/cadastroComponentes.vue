<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const preferencias = ref({
  usuario: {
    nome: '',
    cep: '',
    numero: '',
    rua: '',
    preferencias: '',
    adicionar: '',
  },
})

function direcionarParaBuscar() {
  router.push('/buscar')
}
</script>

<template>
  <main class="container">
    <h1>Atualizar cadastro</h1>

    <section class="formulario">
      <div class="carregar">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="atualizar.cadastro.nome" />
      </div>

      <div class="cep">
        <label for="cep">CEP:</label>
        <input type="text" id="cep" v-model="atualizar.cadastro.cep" />
      </div>

      <div class="numero">
        <label for="numero">Número:</label>
        <input type="text" id="numero" v-model="atualizar.cadastro.numero" />
      </div>

      <div class="rua">
        <label for="rua">Rua:</label>
        <input type="text" id="rua" v-model="atualizar.cadastro.rua" />
      </div>

      <div class="preferencias">
        <label for="preferencias">Preferências:</label>
        <input type="text" id="preferencias" v-model="atualizar.cadastro.preferencias" />
      </div>

        <div class="adicionar">
            <label for="adicionar">Adicionar:</label>
            <input type="text" id="adicionar" v-model="atualizar.cadastro.adicionar" />
        </div>


    </section>
    <button @click="limpar" class="btn-limpar">limpar/Cancelar</button>
    <button @click="confirmar" class="btn-salvar">confirmar</button>
    <button @click="direcionarParaBuscar" class="btn-buscar">buscar pofissionais</button>
  </main>
</template>

<style scoped></style>

