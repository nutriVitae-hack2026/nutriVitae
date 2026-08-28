<script setup>
</script>

<template>
  <section class="funcionabilidade">
    <div class="left">
      <h2>Bem-estar que faz sentido</h2>
      <ul>
        <li>Preferências e objetivos organizados de forma simples.</li>
        <li>Encontre nutricionistas alinhados às suas necessidades.</li>
        <li>Online ou presencial, no horário ideal para você.</li>
        <li>Receitas e recomendações adaptadas ao seu paladar e evolução.</li>
      </ul>
    </div>
    <div>
      <img src="/logo.png" alt="logo">
    </div>
  </section>
</template>

<style scoped>
.funcionabilidade{
  background: #D1BFA5;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.8);
  margin: 50px 0;
  & .left{
    display: flex;
    flex-direction: column;
    gap: 50px;
  & h2{
    font-size: 2.5rem;
    color: #73441B;
    -webkit-text-stroke: #73441B 1px;
    margin-top: 50px;
  }
  & ul{
    list-style: none;
    & li{
    font-size: 1.5rem;
    color: #333f34;
    -webkit-text-stroke: #101010 1px;
    }
  }
  }
  & img{
    width: 70%;
    height: auto;
    margin: 20px;
  }
}
</style>
