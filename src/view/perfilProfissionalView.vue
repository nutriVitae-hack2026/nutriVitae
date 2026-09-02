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

<style scoped>
.perfil-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #EFE8D3;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Título */
h1 {
  font-size: clamp(3rem, 5vw, 4.2rem);
  color: #536236;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
}

.perfil-conteudo {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Dados Pessoais (Inputs/Caixas) */
.dados-pessoais {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.linha-nome {
  display: flex;
  align-items: center;
  gap: 24px;
}

.foto-perfil {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.campo-dado {
  width: 100%;
  padding: 16px 24px;
  border: 1.5px solid #8C7355;
  border-radius: 18px;
  background-color: rgba(239, 232, 211, 0.6);
  display: flex;
  align-items: center;
  gap: 30px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);
}

.flex-grow {
  flex: 1;
}

.campo-dado .label {
  font-size: 1.25rem;
  color: #536236;
  min-width: 90px;
}

.campo-dado .valor {
  font-size: 1.25rem;
  color: #333F34;
}

/* Cards de Formação e Especialização */
.cards-informacoes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 10px;
}

.card-info {
  border: 1.5px solid #8C7355;
  border-radius: 20px;
  padding: 28px;
  background-color: rgba(239, 232, 211, 0.4);
}

.card-info h2 {
  font-size: 1.8rem;
  color: #536236;
  font-weight: 400;
  margin-bottom: 20px;
}

.card-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-info li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 1.1rem;
  color: #333F34;
}

.card-info .bullet {
  color: #333F34;
  font-size: 1.2rem;
}

.card-info .tipo {
  font-weight: 600;
  color: #333F34;
}

.card-info .nome {
  color: #536236;
}

/* Botões Circulares de Ação (Ícones) */
.btn-icone {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #EFE8D3;
  border: 1px solid rgba(140, 115, 85, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  font-size: 1.5rem;
  color: #333F34;
  transition: all 0.2s ease;
}

.btn-icone:hover {
  transform: scale(1.08);
  background-color: #E6DFC9;
}

.btn-deletar {
  top: 30px;
  right: 40px;
}

.btn-editar {
  bottom: 30px;
  left: 40px;
}

@media (max-width: 850px) {
  .perfil-container {
    padding: 30px 20px;
  }

  .cards-informacoes {
    grid-template-columns: 1fr;
  }

  .linha-nome {
    flex-direction: column;
  }

  .btn-deletar {
    top: 15px;
    right: 15px;
  }

  .btn-editar {
    bottom: 15px;
    left: 15px;
  }
}
</style>