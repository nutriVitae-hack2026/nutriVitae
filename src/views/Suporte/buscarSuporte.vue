<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import router from '@/router'

const buscarTermo = ref('')

const suporte = ref({
  buscar: {
    data: '',
    chamada: 'revisado', //'Em andamento'.
    prioridade: 'baixa', //'Alta', 'media'.
  },
})

const SuporteFiltrado = computed(() => {
  const termo = buscaTermo.value.trim().toLowerCase()
  if (!termo) return agendamentos.value

  return agendamentos.value.filter(
    (item) =>
      item.paciente.nome.toLowerCase().includes(termo) ||
      item.profissional.nome.toLowerCase().includes(termo),
  )
})
</script>

<template>
  <div class="principal">
    <h1>Buscar suporte</h1>

    <div class="barra-buscar">
    <h2>Buscar Perfil do Profissional</h2>

      <input type="text" v-model="buscaTermo" placeholder="Pesquisar paciente..." />
      <span class="search-icon">🔍</span>

    </div>

    <div class="chamada">
      <label for="chamada">Chamada</label>

      <select id="chamada" v-model="suporte.buscar.chamada">
        <option value="em-andamento">Em andamento</option>
        <option value="revisado">revisado</option>
      </select>
    </div>

    <div class="data">
          <label for="data">Data:</label>
          <input id="data" type="date" v-model="suporte.usuario.data" />

    </div>

    <div class="prioridade">
      <label for="prioridade">Prioridade</label>

      <select id="prioridade" v-model="suporte.buscar.prioridade">
        <option value="baixa">Baixa</option>
        <option value="media">Media</option>
        <option value="dificil">Dificil</option>
      </select>
    </div>
    
  </div>

  <button @click="confirmar" class="bnt-confirmar">Confirmar</button>
  <button @click="cancelar" class="bnt-cancelar">Cancelar</button>
</template>

<style scoped>

</style>
