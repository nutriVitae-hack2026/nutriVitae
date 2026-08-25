<script setup>
import { ref, onMounted } from 'vue'
import AcademicCreate from '@/components/academic/AcademicCreate.vue'
import AcademicViewCard from '@/components/academic/AcademicViewCard.vue'
import AcademicEdit from '@/components/academic/AcademicEdit.vue'
import ConfirmDeleteModal from '@/components/academic/ConfirmDeleteModal.vue'

const telaAtual = ref('cadastro')
const profissionais = ref([])
const profissionalEmEdicao = ref(null)
const idParaExcluir = ref(null)

onMounted(() => {
  const dadosSalvos = localStorage.getItem('nutriVitae_profissionais')
  if (dadosSalvos) {
    profissionais.value = JSON.parse(dadosSalvos)
    if (profissionais.value.length > 0) {
      telaAtual.value = 'lista'
    }
  }
})

function salvarNovoProfissional(novoRegistro) {
  const profissionalComId = { ...novoRegistro, id: Date.now() }
  profissionais.value.push(profissionalComId)
  atualizarLocalStorage()
  telaAtual.value = 'lista'
}

function salvarEdicao(dadosAtualizados) {
  const index = profissionais.value.findIndex(p => p.id === dadosAtualizados.id)
  if (index !== -1) {
    profissionais.value[index] = dadosAtualizados
    atualizarLocalStorage()
  }
  profissionalEmEdicao.value = null
  telaAtual.value = 'lista'
}

function iniciarEdicao(profissional) {
  profissionalEmEdicao.value = { ...profissional }
  telaAtual.value = 'edicao'
}

function solicitarExclusao(id) {
  idParaExcluir.value = id
}

function confirmarExclusao() {
  profissionais.value = profissionais.value.filter(p => p.id !== idParaExcluir.value)
  atualizarLocalStorage()
  idParaExcluir.value = null
}

function atualizarLocalStorage() {
  localStorage.setItem('nutriVitae_profissionais', JSON.stringify(profissionais.value))
}
</script>

<template>
  <div class="main-wrapper">
    <div v-if="telaAtual === 'lista'">
      <div class="header-actions">
        <h1 class="page-title">Formação Acadêmica dos Profissionais</h1>
        <button @click="telaAtual = 'cadastro'" class="btn btn-novo">+ Novo Profissional</button>
      </div>

      <div v-if="profissionais.length === 0" class="empty-state">
        <p>Nenhum profissional cadastrado até o momento.</p>
      </div>

      <div v-else class="cards-list">
        <AcademicViewCard 
          v-for="item in profissionais" 
          :key="item.id" 
          :dados="item" 
          @editar="iniciarEdicao(item)" 
          @excluir="solicitarExclusao(item.id)" 
        />
      </div>
    </div>

    <AcademicCreate 
      v-else-if="telaAtual === 'cadastro'" 
      @salvar="salvarNovoProfissional" 
      @cancelar="telaAtual = 'lista'" 
    />

    <AcademicEdit 
      v-else-if="telaAtual === 'edicao'" 
      :dadosIniciais="profissionalEmEdicao" 
      @salvar="salvarEdicao" 
      @cancelar="telaAtual = 'lista'" 
    />
    <ConfirmDeleteModal 
      v-if="idParaExcluir !== null" 
      @confirmar="confirmarExclusao" 
      @cancelar="idParaExcluir = null" 
    />
  </div>
</template>

<style scoped>
.main-wrapper { 
  background-color: #f2ebd9; 
  min-height: 100vh;
  margin-left: 150px; 
  padding: 50px 40px; 
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 850px;
  margin-bottom: 45px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(140, 156, 109, 0.4);
}

.page-title { 
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  color: #3a2b1f; 
  margin: 0;
}

.btn-novo {
  background: #8c9c6d;
  color: #3a2b1f;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn-novo:hover {
  background: #7a8a5d;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 850px;
}

.empty-state {
  text-align: center;
  color: #6b5c4f;
  font-size: 1.2rem;
  margin-top: 60px;
}

@media (max-width: 900px) { 
  .main-wrapper {
    margin-left: 0;
    padding-top: 80px;
  }
  .header-actions {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>