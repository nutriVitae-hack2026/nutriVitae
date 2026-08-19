<script setup>
import { computed } from 'vue';
import { ref } from 'vue'
import router from '@/router'

const suporte = ref({
  usuario: {
    data: '',
    chamada: 'revisado', //'Em andamento'.
    prioridade: 'leve', //'Alta', 'media'.
    
  },
})

const agendamentosFiltrados = computed() => {
  const termo = buscaTermo.value.trim().toLowerCase()
  if (!termo) return agendamentosFiltrados {

  }
}
</script>

<template>
  <div class="principal">
    <h1>Buscar suporte</h1>

    <div class="buscar">

    </div>

    <div class="chamada">
      <label for="chamada">Chamada</label>

 <select id="chamada" v-model="">
  <option value="em-andamento">Em andamento</option>
  <option value="concluido"></option>
 </select>
    </div>

    <div class="data">

    </div>

    <div class="prioridade">

    </div>

  </div>

    <button @click="confirmar" class="bnt-confirmar">Confirmar</button>
    <button @click="cancelar" class="bnt-cancelar">Cancelar</button>

</template>

<style scoped>

</style>
