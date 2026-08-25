<template>
  <section class="banner">
  <h1>
    Acompanhamento Nutricional
  </h1>
  <h2>
    Mais saúde, organização e qualidade de vida
  </h2>
  <RouterLink to="#">
    Começar agora
  </RouterLink>
  </section>
</template>
<style scoped>
.banner{
  min-height: 100vh;
  width: 100%;
  background: url("/public/home/banner-home.png") no-repeat center center/cover;
  position: relative;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  & h1{
    font-size: 5rem;
    color: #F1EDD2;
    margin: 0 50px;
    text-shadow: 10px 4px 10px rgba(0, 0, 0, 0.5);
    width: 50%;
    line-height: 80px;
  }
  & h2{
    font-size: 3rem;
    color: #F1EDD2;
    margin: 0 50px;
    text-shadow: 10px 4px 10px rgba(0, 0, 0, 0.5);
    width: 50%;
    line-height: 50px;
  }
  & a{
    font-size: 4rem;
    color: #333F34;
    background: #9A9E70;
    padding: 0 50px;
    margin-right: 60%;
    border-radius: 0 50px 50px 0;
    border: 2px #536236 solid;
    -webkit-text-stroke: 1px #333F34;
    cursor: pointer;
  }
}
</style>
