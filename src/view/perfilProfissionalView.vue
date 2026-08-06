<script setup>
import { useRoute } from "vue-router"
import { profissionais } from "@/data/profissionais"

const route = useRoute()

const profissional = profissionais.find(
  p => p.id === Number(route.params.id)
)
</script>

<template>
  <main v-if="profissional" class="perfil">
    <div class="title">
    <img :src="profissional.foto" :alt="profissional.nome">
    <h1>Perfil do  Profissional</h1>
      <button>
        <i class="mdi mdi-delete-empty-outline"></i>
      </button>
    </div>
    <div class="dados">
    <h2>
      <strong>Nome:</strong>
      {{ profissional.nome }}
    </h2>
    <p>
      <strong>Email:</strong>
      {{ profissional.email }}
    </p>
    <p>
      <strong>Telefone:</strong>
      {{ profissional.telefone }}
    </p>
    </div>
    <div class="lists">
    <div class="formacoes">
      <h2>Formações</h2>
      <ul>
        <li
          v-for="formacao in profissional.formacoes"
          :key="formacao.nome"
        >
          <strong>{{ formacao.tipo }}:</strong>
          {{ formacao.nome }}
        </li>
      </ul>
    </div>

    <div class="especializacoes"  >
      <h2>Especializações</h2>
      <ul>
        <li
          v-for="especializacao in profissional.especializacoes"
          :key="especializacao.nome"
        >
          <strong>{{ especializacao.tipo }}:</strong>
          {{ especializacao.nome }}
        </li>
      </ul>
    </div>
    </div>
  </main>

  <main v-else>
    <h2>Profissional não encontrado.</h2>
  </main>
</template>
<style scoped>
.perfil{
  color: #73441B;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
