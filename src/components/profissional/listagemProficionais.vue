<script setup>
import { ref } from 'vue'
import ProfissionalCard from './ProfissionalCard.vue'
import * as profissionais from '../../data/profissionais.js'

const profissionaisList = ref(profissionais.profissionais)

</script>

<template>
  <div class="product-list-container">

    <div class="profissionais-grid">
      <ProfissionalCard v-for="profissional in profissionaisList" :key="profissional.id" :profissional="profissional" />
    </div>
  </div>
</template>

