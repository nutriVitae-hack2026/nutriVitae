<script setup>
import { useRoute } from "vue-router"
import { profissionais } from "@/data/profissionais"

const route = useRoute()

const profissional = profissionais.find(
  p => p.id === Number(route.params.id)
)
</script>

<template>
  <main v-if="profissional" class="perfil">
    <div class="title">
      <img :src="profissional.foto" :alt="profissional.nome">
      <h1>Perfil do Profissional</h1>
      <RouterLink :to="`/profissional/${profissional.id}/delete`">
        <button class="delete">
          <i class="mdi mdi-delete-empty-outline"></i>
        </button>
      </RouterLink>
    </div>
    <div class="dados">
      <h2>
        <strong>Nome:</strong>
        {{ profissional.nome }}
      </h2>
      <p>
        <strong>Email:</strong>
        {{ profissional.email }}
      </p>
      <p>
        <strong>Telefone:</strong>
        {{ profissional.telefone }}
      </p>
    </div>
    <div class="lists">
      
      <div class="formacoes">
        <h2>Formações</h2>
        <ul>
          <li v-for="formacao in profissional.formacoes" :key="formacao.nome">
            <strong>{{ formacao.tipo }}:</strong>
            {{ formacao.nome }}
          </li>
        </ul>
      </div>

      <div class="especializacoes">
        <h2>Especializações</h2>
        <ul>
          <li v-for="especializacao in profissional.especializacoes" :key="especializacao.nome">
            <strong>{{ especializacao.tipo }}:</strong>
            {{ especializacao.nome }}
          </li>
        </ul>
      </div>
      
    </div>
    <RouterLink :to="`/profissional/${profissional.id}/edit`">
        <button class="edit">
          <i class="mdi mdi-pencil"></i>
        </button>
      </RouterLink>
  </main>

  <main v-else class="naoEncontrado">
    <h2>Profissional não encontrado.</h2>
    <RouterLink to="/">
    <button>
      <i class="mdi mdi-home-circle"></i> Voltar a pagina Inicial
    </button>
  </RouterLink>
  </main>
</template>
<style scoped>
.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;

  & .title {
    display: flex;
    gap: 25px;
    align-items: center;
    margin-top: 50px;
    justify-content: center;

    & img {
      width: 10%;
      height: auto;
      margin-bottom: 10px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    }

    & h1 {
      font-size: 5rem;
      color: #73441B;
    }

    
  }

  & .dados {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin: 2vw;

    & h2,
    & p {
      background: #D1BFA5;
      font-size: 2rem;
      padding: 5px 20px;
      border: #73441B 1px solid;
      border-radius: 10px;
      color: #73441B;
      -webkit-text-stroke: 1px #73441B;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);

      & strong {
        color: #536236;
        -webkit-text-stroke: 1px #536236;
      }
    }
  }

  & .lists {
    display: flex;
    margin: 5vw;
    gap: 3vw;
    width: 100%;
    justify-content: center;

    & .formacoes,
    & .especializacoes {
      background: #9A9E70;
      border: #536236 2px solid;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
      width: 40%;

      & h2 {
        font-size: 40px;
        color: #333F34;
        -webkit-text-stroke: 1px #333F34;
        text-align: center;
        margin: 10px;
      }

      & ul {
        display: flex;
        flex-direction: column;
        gap: 5px;
        list-style: none;

        & li {
          color: #536236;
          -webkit-text-stroke: 1px #536236;
          font-size: 25px;

          & strong {
            color: #333F34;
            -webkit-text-stroke: 1px #333F34;
          }
        }
      }
    }
  }
  & button {
      background-color: transparent;
      border: none;
      padding: 20px;
      border-radius: 50%;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
      font-size: 50px;
      margin: 10%;
      cursor: pointer;
    }
}

.naoEncontrado {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 80px;
  color: #73441B;
  min-height: 1000px;
  gap: 20px;
  & h2{
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
  }
    & button{
      background: transparent;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8);
      border: none;
      font-size: 80px;
      padding: 20px;
      border-radius: 20px;
      color: #333F34;
      font-family: "Italiana", serif;
    
  }
}
</style>
