<script setup>
import ProfissionalCard from "./ProfissionalCard.vue"

defineProps({
  profissionais: Array
})
</script>

<template>
  <div class="profissionais-grid">
    <ProfissionalCard
      v-for="profissional in profissionais"
      :key="profissional.id"
      :profissional="profissional"
    />
  </div>
</template>
