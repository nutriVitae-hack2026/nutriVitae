<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { profissionais } from "@/data/profissionais"

const route = useRoute()
const router = useRouter()
const profissional = profissionais.find(p => p.id === Number(route.params.id))

const confirmar = ref(false)
const nomeConfirmacao = ref("")

function abrirConfirmacao() {
  confirmar.value = true
}

function cancelar() {
  router.push(`/profissional/${profissional.id}`)
}

function excluir() {
  if (nomeConfirmacao.value !== profissional.nome) return

  const index = profissionais.findIndex(p => p.id === profissional.id)

  if (index !== -1) {
    profissionais.splice(index, 1)
  }

  router.push("/profissionais")
}
</script>

<template>
  <main v-if="profissional" class="excluir">
    <div class="title">
      <img :src="profissional.foto" :alt="profissional.nome">
      <h1>Deletar Perfil do Profissional</h1>
    </div>

    <div class="dados">
      <div>
        <strong>Nome:</strong>
        {{ profissional.nome }}
      </div>
      <div>
        <strong>Telefone:</strong>
        {{ profissional.telefone }}
      </div>
      <div>
        <strong>Email:</strong>
        {{ profissional.email }}
      </div>
      <div>
        <strong>Data de Nascimento:</strong>
        {{ profissional.dataNascimento }}
      </div>
    </div>

    <div class="listas">
      <div class="lista">
        <h2>Formação Acadêmica</h2>
        <ul>
          <li v-for="formacao in profissional.formacoes" :key="formacao.nome">
            <strong>{{ formacao.tipo }}:</strong>
            {{ formacao.nome }}
          </li>
        </ul>
      </div>

      <div class="lista">
        <h2>Especializações</h2>
        <ul>
          <li v-for="especializacao in profissional.especializacoes" :key="especializacao.nome">
            <strong>{{ especializacao.tipo }}:</strong>
            {{ especializacao.nome }}
          </li>
        </ul>
      </div>
    </div>

    <div class="acoes">
      <button @click="cancelar">Cancelar a exclusão</button>
      <button @click="abrirConfirmacao" class="delete">Excluir Perfil do Profissional</button>
    </div>

    <div v-if="confirmar" class="confirmacao">
      <i class="mdi mdi-delete-outline"></i>
      <h2>Excluir Perfil</h2>
      <p>Essa ação não poderá ser desfeita.</p>
      <p>Digite <strong>{{ profissional.nome }}</strong> para confirmar:</p>
      <input v-model="nomeConfirmacao" type="text" :placeholder="profissional.nome">
      <div>
        <button @click="confirmar = false">Cancelar</button>
        <button :disabled="nomeConfirmacao !== profissional.nome" @click="excluir">
          Excluir
        </button>
      </div>
    </div>
  </main>

  <main v-else class="naoEncontrado">
    <h2>Profissional não encontrado.</h2>
    <RouterLink to="/profissionais">
      <button>
        <i class="mdi mdi-account-group"></i>
        Voltar para profissionais
      </button>
    </RouterLink>
  </main>
</template>

<style scoped>
.excluir {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 50px;

  & .title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 25px;

    & img {
      width: 125px;
      height: 125px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, .4);
    }

    & h1 {
      font-size: 4.8rem;
      font-weight: normal;
      color: #73441B;
    }
  }

  & .dados {
    width: 75%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px 80px;
    margin-top: 30px;
    margin: 5vw 0 3vw;

    & div {
      background: #D1BFA5;
      border: 1px solid #73441B;
      border-radius: 15px;
      padding: 10px 15px;
      color: #73441B;
      -webkit-text-stroke: #73441B 1px;
      font-size: 25px;
      box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.4);

      & strong {
        color: #536236;
        -webkit-text-stroke: #536236 1px;
      }
    }
  }

  & .listas {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 100px;

    & .lista {
      width: 40%;
      padding: 15px 20px;
      background: #9A9E70;
      border: 2px solid #536236;
      border-radius: 18px;
      box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);
      display: flex;
      flex-direction: column;

      & h2 {
        text-align: center;
        color: #333F34;
        -webkit-text-stroke: #333F34 1px;
        font-size: 30px;
        margin: 0 0 10px;
      }

      & ul {
        padding-left: 20px;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 5px;

        & li {
          color: #536236;
          -webkit-text-stroke: #536236 1px;
          margin: 7px 0;
          font-size: 20px;

          & strong {
            color: #333F34;
            -webkit-text-stroke: #333F34 1px;
          }
        }
      }
    }
  }

  & .acoes {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 75px;

    & button {
      width: 30%;
      height: 50px;
      border: #333F34 solid 1px;
      border-radius: 15px;
      background: #9A9E70;
      color: #333F34;
      -webkit-text-stroke: #333F34 1px;
      font-family: "Italiana", serif;
      font-size: 30px;
      cursor: pointer;
      padding: 5px 10px;
      box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);
    }

  }

  & .confirmacao {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    padding: 25px 40px;
    background: #9A9E70;
    border: 2px solid #536236;
    border-radius: 25px;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .6);
    text-align: center;
    z-index: 10;

    &>i {
      font-size: 55px;
      color: #111;
    }

    & h2 {
      font-size: 40px;
      margin: 5px;
      color: #111;
      text-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
    }

    & p {
      color: #333F34;
      font-size: 18px;

      & strong {
        color: #73441B;
      }
    }

    & input {
      width: 90%;
      padding: 14px;
      border: none;
      outline: none;
      border-radius: 15px;
      background: #D1BFA5;
      color: #73441B;
      font-family: inherit;
      font-size: 18px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, .3);
    }

    & div {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;

      & button {
        width: 140px;
        padding: 10px;
        border: none;
        border-radius: 12px;
        background: #D1BFA5;
        color: #333F34;
        font-family: "Italiana", serif;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .3);
      }

      & button:disabled {
        opacity: .4;
        cursor: not-allowed;
      }
    }
  }
}

.naoEncontrado {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #73441B;
  text-align: center;

  & h2 {
    font-size: 50px;
  }

  & button {
    padding: 15px 25px;
    border: none;
    border-radius: 15px;
    background: #9A9E70;
    color: #333F34;
    font-family: "Italiana", serif;
    font-size: 30px;
    cursor: pointer;
    box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);
  }
}
</style>