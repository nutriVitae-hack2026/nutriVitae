<script setup>
defineProps({
  profissional: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="profissional-card">
    <div class="perfil">
      <img :src="profissional.foto" :alt="profissional.nome" class="profissional-image" />
      <button class="perfil-button">Ver Perfil</button>
    </div>
    <div class="dados">
      <div class="texto">
        <p class="profissional-name">Nome: <span>{{ profissional.nome }}</span></p>
        <p class="profissional-telefone">Telefone: <span>{{ profissional.telefone }}</span></p>
        <p class="profissional-email">Email: <span>{{ profissional.email }}</span></p>
      </div>
      <div class="listas">
        <div class="formacao">
          <h4>Formação Acadêmica</h4>
          <ul>
            <li v-for="(formacao, index) in profissional.formacoes" :key="index">
              <span class="tipo">{{ formacao.tipo }}:</span>
              <span class="nome">{{ formacao.nome }}</span>
            </li>
          </ul>
        </div>
        <div class="especializacao">
          <h4>Especializações</h4>
          <ul>
            <li v-for="(especializacao, index) in profissional.especializacoes" :key="index">
              <span class="tipo">{{ especializacao.tipo }}:</span>
              <span class="nome">{{ especializacao.nome }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.profissional-card {
  background-color: #D1BFA5;
  whidth: 80%;
  margin: 50px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.30);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #73441B;
  display: flex;
  flex-direction: row;

  & .perfil {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;


    & img {
      width: 40%;
      height: auto;
      margin-bottom: 10px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    }

    & .perfil-button {
      background-color: #9A9E70;
      color: #333F34;
      border: #536236 1px solid;
      padding: 10px 20px;
      border-radius: 20px;
      font-family: "Italiana", serif;
      -webkit-text-stroke: 1px #333F34;
      cursor: pointer;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    }
  }

  & .dados {
    width: 80%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;

    & .texto {
      display: flex;
      flex-wrap: wrap;
      wrap: wrap;

      & p {
        color: #536236;
        font-weight: bold;
        margin: 10px;
        font-size: 25px;

        & span {
          color: #BF945A;
          -webkit-text-stroke: 1px #BF945A;
        }
      }
    }

    & .listas {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & .formacao,
      & .especializacao {
        width: 45%;

        & h4 {
          font-size: 30px;
          margin-bottom: 10px;
          color: #333F34;
          font-weight: bold;
        }

        & ul {
          list-style-type: none;
          padding-left: 0;

          & li {
            margin: 5px;
            -webkit-text-stroke: 1px #BF945A;
            color: #BF945A;
            font-size: 20px;

            & .tipo {
              color: #536236;
              -webkit-text-stroke: 1px #536236;
            }

            & .nome {
              margin: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
