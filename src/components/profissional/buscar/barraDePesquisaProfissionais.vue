<script setup>
defineProps({
  modelValue: String
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <div class="topo">
    <h1>Buscar Perfil do Profissional</h1>

    <div class="pesquisa">
      <input type="text" placeholder="Pesquisar..." :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)" class="pesquisa-input" />
      <i class="mdi mdi-magnify"></i>
    </div>
  </div>
</template>
<style scoped>
.topo {
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-size: 4rem;
    color: #73441B;
  }

  & .pesquisa {
    display: flex;
    align-items: center;

    width: 70%;
    padding: 5px 12px;

    border: 1px solid #536236;
    border-radius: 30px;
    background: #9A9E70;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.30);
    margin: 20px 0;
    & .pesquisa-input {
      flex: 1;

      border: none;
      outline: none;
      background: transparent;

      font-size: 18px;
    }

    & i {
      font-size: 24px;
      color: #666;
      cursor: pointer;
    }

    & ::placeholder {
      color: #333F34;
      font-family: "Italiana", serif;
      -webkit-text-stroke: 1px #333F34;
    }
  }

}
</style>
