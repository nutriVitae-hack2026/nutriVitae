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
  </section>
</template>

<style scoped>
.nossoEquipe {
  min-height: 100vh;
  padding: 80px clamp(28px, 8vw, 140px);
  color: #f1edd2;
  background:
    linear-gradient(135deg, rgba(137, 162, 91, 0.2), transparent 45%),
    #536236;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.45);
}

.titulo {
  text-align: center;
  margin-bottom: 55px;
}

.titulo h2 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 400;
}

.equipe {
  display: grid;
  grid-template-columns: minmax(260px, 420px) minmax(320px, 1fr);
  gap: clamp(35px, 8vw, 120px);
  align-items: center;
  max-width: 1050px;
  min-height: 430px;
  margin: 0 auto;
}

.lista {
  justify-self: center;
  width: 100%;
  max-width: 360px;
  transition: transform 0.3s ease;
}

.lista:not(.ativo) {
  grid-column: 1 / -1;
}

.lista h3,
.detalhes h3 {
  margin-bottom: 24px;
  color: #f1edd2;
  font-size: 1.15rem;
  font-weight: 400;
  text-transform: uppercase;
}

.lista ul {
  padding: 0;
  list-style: none;
}

.lista li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  color: #f1edd2;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.lista li:hover,
.lista li.selecionado {
  color: #ffffff;
  transform: translateX(8px);
}

.lista li span {
  font-size: 1.4rem;
}

.detalhes {
  width: 100%;
  max-width: 560px;
  padding: 42px;
  background: rgba(116, 140, 75, 0.55);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.22);
}

.detalhes h3 {
  font-size: 1.45rem;
}

.detalhes p {
  margin: 12px 0;
  color: #f1edd2;
  font-size: 1rem;
}

.detalhes button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 22px;
  padding: 8px 14px;
  border: 1px solid #f1edd2;
  color: #f1edd2;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.detalhes button:hover {
  color: #536236;
  background: #f1edd2;
}

@media (max-width: 700px) {
  .nossoEquipe {
    padding: 60px 24px;
  }

  .equipe,
  .lista:not(.ativo) {
    display: block;
    min-height: 0;
  }

  .lista {
    margin-bottom: 35px;
  }

  .detalhes {
    padding: 28px;
  }
}
</style>