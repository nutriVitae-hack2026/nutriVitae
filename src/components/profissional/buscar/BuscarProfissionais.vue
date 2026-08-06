<script setup>
import { ref, computed } from "vue"

import { profissionais } from "@/data/profissionais"

import ListaProfissionais from "./listagemProficionais.vue"
import FiltroProfissionais from "./barraDePesquisaProfissionais.vue"


const pesquisa = ref("")

const profissionaisFiltrados = computed(() => {
  const termo = pesquisa.value.toLowerCase().trim()

  return profissionais.filter((profissional) => {
    return (
      profissional.nome.toLowerCase().includes(termo) ||
      profissional.id.toString().includes(termo) ||

      profissional.formacoes.some(formacao =>
        formacao.nome.toLowerCase().includes(termo)
      ) ||

      profissional.especializacoes.some(especializacao =>
        especializacao.nome.toLowerCase().includes(termo)
      )
    )
  })
})
</script>

<template>
  <FiltroProfissionais v-model="pesquisa" />

  <ListaProfissionais
    :profissionais="profissionaisFiltrados"
  />
</template>
