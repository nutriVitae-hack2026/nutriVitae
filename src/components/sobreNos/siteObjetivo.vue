<template>
  <section class="funcionabilidade">
    <div>
      <img src="/logo.png" alt="logo" />
    </div>

    <div class="left">
      <h2>Nosso objetivo</h2>
      <p>
        A NutriVitae tem como objetivo facilitar o acesso à saúde e à alimentação de qualidade,
        conectando pacientes a nutricionistas de forma simples, rápida e segura. Nossa plataforma
        foi desenvolvida para ajudar cada paciente a encontrar um profissional adequado às suas
        necessidades, permitindo pesquisar e conhecer nutricionistas de maneira prática. Queremos
        tornar a busca por acompanhamento nutricional mais acessível e contribuir para que mais
        pessoas encontrem o suporte necessário para cuidar da sua saúde e melhorar sua qualidade de
        vida.
      </p>
    </div>
  </section>
</template>

<style scoped>
.funcionabilidade {
  background: #3006e9;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.8);
  margin: 50px 0;
  & .left {
    display: flex;
    flex-direction: column;
    gap: 50px;
    & h2 {
      font-size: 4rem;
      color: #73441b;
      -webkit-text-stroke: #73441b 1px;
      margin-top: 50px;
    }
    & ul {
      list-style: none;
      & li {
        font-size: 1.5rem;
        color: #101010;
        -webkit-text-stroke: #101010 1px;
      }
    }
  }
  & img {
    width: 70%;
    height: auto;
    margin: 20px;
  }
}
</style>
