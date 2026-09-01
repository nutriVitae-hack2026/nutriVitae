<script setup>
import { ref } from 'vue'

const membroSelecionado = ref(null)

const membros = [
  {
    nome: 'Bianca De Jesus',
    turma: '2info2',
    github: 'Bianca161',
    email: 'bianca@gmail.com',
    foto: '/img/membros/Bianca.png',
  },
  {
    nome: 'Felipe Hodecker',
    turma: '2info2',
    github: 'feliperr12',
    email: 'felipe@gmail.com',
    foto: '/img/membros/Felipe.png',
  },
  {
    nome: 'Kauan Gunther',
    turma: '2info2',
    github: 'kauan-gunther',
    email: 'kauan@gmail.com',
    foto: '/img/membros/Kauan.png',
  },
  {
    nome: 'Mizael Estevam',
    turma: '2info2',
    github: 'mizaelestevam',
    email: 'mizael@gmail.com',
    foto: '/img/membros/Mizael.png',
  },
  {
    nome: 'Ruty Liandra',
    turma: '2info2',
    github: 'ruty-ruby',
    email: 'ruty@gmail.com',
    foto: '/img/membros/Ruty.png',
  },
  {
    nome: 'Sara Schulz',
    turma: '2info2',
    github: 'saraSchulz',
    email: 'sara@gmail.com',
    foto: '/img/membros/Sara.png',
  },
]

function selecionarMembro(membro) {
  membroSelecionado.value = membro
}

function voltar() {
  membroSelecionado.value = null
}
</script>

<template>
  <section class="nossoEquipe">
    <div class="wrap" :class="{ ativo: membroSelecionado }">
      <div class="cartao">
        <div class="lista">
          <h3>Membros:</h3>
          <ul>
            <li
              v-for="m in membros"
              :key="m.nome"
              @click="selecionarMembro(m)"
              :class="{ selecionado: membroSelecionado?.nome === m.nome }"
            >
              {{ m.nome }}
              <span v-if="membroSelecionado?.nome === m.nome" class="mdi mdi-menu-right"></span>
            </li>
          </ul>
        </div>

        <transition name="fade">
          <div class="detalhes" v-if="membroSelecionado">
            <img class="foto" :src="membroSelecionado.foto" :alt="membroSelecionado.nome" />
            <p class="linha">EMAIL: <span>{{ membroSelecionado.email }}</span></p>
            <p class="linha">SALA: <span>{{ membroSelecionado.turma }}</span></p>
            <p class="linha github">
              <i class="mdi mdi-github"></i>
              <span>{{ membroSelecionado.github }}</span>
            </p>
            <button @click="voltar"><i class="mdi mdi-menu-left"></i> Voltar</button>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nossoEquipe {
  padding: 55px clamp(20px, 6vw, 80px);
  color: #f1edd2;
  background:
    linear-gradient(135deg, rgba(137, 162, 91, 0.2), transparent 45%),
    #536236;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
}

.wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
}

.cartao {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 340px;
  transition: all 0.3s ease;
}

.wrap.ativo .cartao {
  max-width: 560px;
  padding: 26px 34px;
}

.lista {
  flex: 1;
  min-width: 0;
}

.lista h3 {
  margin: 0 0 14px;
  color: #f1edd2;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
}

.wrap.ativo .lista h3 {
  text-align: left;
}

.lista ul {
  padding: 0;
  list-style: none;
  text-align: center;
}

.wrap.ativo .lista ul {
  text-align: left;
}

.lista li {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0;
  color: #f1edd2;
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s ease, font-size 0.2s ease;
}

.wrap.ativo .lista li {
  justify-content: flex-start;
}

.lista li:hover {
  color: #ffffff;
}

.lista li.selecionado {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
}

.lista li span {
  font-size: 1rem;
}

.detalhes {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 150px;
}

.foto {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f1edd2;
  background: #7f8f66;
  margin-bottom: 10px;
}

.linha {
  margin: 2px 0;
  font-size: 0.62rem;
  letter-spacing: 0.03em;
  color: #f1edd2;
  text-transform: uppercase;
}

.linha span {
  font-weight: 600;
}

.github {
  color: #7fc7f2;
}

.github span {
  text-decoration: underline;
  cursor: pointer;
}

.detalhes button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  padding: 5px 10px;
  border: 1px solid #f1edd2;
  color: #f1edd2;
  background: transparent;
  font: inherit;
  font-size: 0.7rem;
  cursor: pointer;
}

.detalhes button:hover {
  color: #536236;
  background: #f1edd2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .wrap.ativo .cartao {
    flex-direction: column;
    max-width: 100%;
  }
}
</style>