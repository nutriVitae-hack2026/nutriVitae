<script setup>
import { ref } from 'vue'

const membroSelecionado = ref(null)

const membros = [
  {
    nome: 'Bianca De Jesus',
    turma: '2info2',
    github: 'Bianca161',
  },
  {
    nome: 'Mizael Estevam ',
    turma: '2info2',
    github: 'mizaelestevam',
  },
  {
    nome: 'Felipe Hodecker ',
    turma: '2info2',
    github: 'feliperr12',
  },
  {
    nome: 'Sara Schulz',
    turma: '2info2',
    github: 'saraSchulz',
  },
   {
    nome: 'Ruty Liandra ',
    turma: '2info2',
    github: 'ruty-ruby',
  },
  {
    nome: 'Kauan Gunther ',
    turma: '2info2',
    github: 'kauan-gunther',
  },
]

function selecionarMembro(membro) {
  membroSelecionado.value = membro;
}

function voltar() {
  membroSelecionado.value = null;
}
</script>

<template>
  <section class="nossoEquipe">

    <div class="titulo">
      <h2>Nossa Equipe</h2>
    </div>

 <div class="equipe">
      <div class="lista" :class="{ ativo: membroSelecionado }">
        
        <h3>Membros:</h3>
        <ul>
          <li v-for="m in membros" :key="m.nome" @click="selecionarMembro(m)"
            :class="{ selecionado: membroSelecionado?.nome === m.nome }">
            {{ m.nome }}
            <span v-if="membroSelecionado?.nome === m.nome" class="mdi mdi-menu-right"></span>
          </li>
        </ul>
      </div>
      <div class="detalhes" v-if="membroSelecionado">
        <h3>{{ membroSelecionado.nome }}</h3>
        <p><b>Turma:</b> {{ membroSelecionado.turma }}</p>
        <p><i class="mdi mdi-github"></i> {{ membroSelecionado.github }} </p>
        <button @click="voltar"> <i class="mdi mdi-menu-left"></i>Voltar</button>
      </div>
    </div>
    <div class="space">
      <RouterLink to="/">
        <h1>
          <img src="/logo.png" alt="Logo" class="logo">
        </h1>
        para voltar para a vitrine
      </RouterLink>
    </div>
  </section>
</template>