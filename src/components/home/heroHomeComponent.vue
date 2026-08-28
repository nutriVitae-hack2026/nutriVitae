<script setup>
</script>

<template>
  <section class="hero">
  <h2>
    Alimentação saudável do seu jeito
  </h2>
  <p>
    Encontre nutricionistas, agende consultas e receba receitas personalizadas de acordo com seus gostos e objetivos.
  </p>
  <ul>
    <li>Atendimento online e presencial</li>
    <li>Receitas adaptadas ao seu perfil</li>
    <li>Acompanhamento humanizado</li>
  </ul>
  </section>
</template>

<style scoped>
.hero{
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 50px 0;
  & h2{
    color: #333F34;
    -webkit-text-stroke: 1px #333F34;
    font-size: 3rem;
    margin: 20px 0 10px;
  }
  & p{
    color: #536236;
    -webkit-text-stroke: #333F34 1px;
    font-size: 1.5rem;
    margin: 10px 50px;
  }
  & ul{
    background: #9A9E70;
    list-style: none;
    margin-left: 60%;
    border-radius: 100px 0 0 100px;
    border: #333F34 2px solid;
    & li{
      color: #333F34;
      font-size: 1.5rem;
    }

  }
}
</style>
