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

function limpar() {
  preferencias.value.usuario = {
    nome: '',
    cep: '',
    numero: '',
    rua: '',
    preferencias: '',
    adicionar: '',
  }
}

function confirmar() {
  console.log('Preferências confirmadas:', preferencias.value.usuario)
}

function redirecionar() {
  router.push('/buscar')
}
</script>

<template>
  <main class="container">
    <h1>Preferências do Usuario</h1>

    <section class="formulario">
      <div class="carregar">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="preferencias.usuario.nome" />
      </div>

      <div class="cep">
        <label for="cep">CEP:</label>
        <input type="text" id="cep" v-model="preferencias.usuario.cep" />
      </div>

      <div class="numero">
        <label for="numero">Número:</label>
        <input type="text" id="numero" v-model="preferencias.usuario.numero" />
      </div>

      <div class="rua">
        <label for="rua">Rua:</label>
        <input type="text" id="rua" v-model="preferencias.usuario.rua" />
      </div>

      <div class="preferencias">
        <label for="preferencias">Preferências:</label>
        <input type="text" id="preferencias" v-model="preferencias.usuario.preferencias" />
      </div>

      <div class="adicionar">
        <label for="adicionar">Adicionar:</label>
        <input type="text" id="adicionar" v-model="preferencias.usuario.adicionar" />
      </div>
    </section>
    <button @click="limpar" class="btn-limpar">limpar/Cancelar</button>
    <button @click="confirmar" class="btn-salvar">confirmar</button>
    <button @click="redirecionar" class="btn-buscar">buscar pofissionais</button>
  </main>
</template>

<style scoped></style>
