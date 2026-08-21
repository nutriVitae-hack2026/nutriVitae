<script setup>
import { ref } from 'vue'

const editar = ref({
  usuario: {
    nome: '',
    cep: '',
    restricoes: '',
    rua: '',
    preferencias: '',
    numero: '',
  },
})
</script>

<template>
  <main class="container">
    <h1></h1>

    <section class="carregar">
      <div class="formulario"
       label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="editar.usuario.nome" />
      </div>

      <div class="cep">
        <label for="cep">CEP:</label>
        <input type="text" id="cep" v-model="editar.usuario.cep" />
      </div>

      <div class="numero">
        <label for="numero">Número:</label>
        <input type="text" id="numero" v-model="editar.usuario.numero" />
      </div>

      <div class="rua">
        <label for="rua">Rua:</label>
        <input type="text" id="rua" v-model="editar.usuario.rua" />
      </div>

      <div class="preferencias">
        <label for="preferencias">Preferências:</label>
        <input type="text" id="preferencias" v-model="editar.usuario.preferencias" />
      </div>

        <div class="adicionar">
            <label for="adicionar">Adicionar:</label>
            <input type="text" id="adicionar" v-model="editar.usuario.adicionar" />
        </div>


    </section>
    <button @click="limpar" class="btn-limpar">limpar/Cancelar</button>
    <button @click="confirmar" class="btn-salvar">confirmar</button>
    <button @click="router.push('/buscar')" class="btn-buscar">buscar pofissionais</button>
  </main>
</template>

<style scoped></style>