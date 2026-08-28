<script setup>
</script>

<template>
  <section class="explicacao">
    <h2>
      Por que fazer acompanhamento nutricional?
    </h2>
    <div class="geral">
      <div>O acompanhamento nutricional ajuda a entender seu corpo, sua rotina e suas necessidades de forma
        personalizada.</div>
      <div>Com orientação profissional, fica mais fácil construir uma alimentação equilibrada e sustentável.</div>
      <div>O acompanhamento permite ajustar hábitos e melhorar resultados ao longo do tempo.</div>
      <div>Uma boa alimentação contribui para mais disposição, equilíbrio e qualidade de vida no dia a dia.</div>
    </div>
    <RouterLink to="#">
      Começar Agora
    </RouterLink>
  </section>
  <div class="space"></div>
</template>
<style scoped>
.explicacao{
  background: #9A9E70;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.5);
  padding: 50px 0;
  gap: 50px;
  & h2{
    font-size: 2.5rem;
    color: #333F34;
    -webkit-text-stroke: #333F34 1px;
  }
  & .geral{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    & div{
      text-align: center;
      background: #F1EDD2;
      color: #101010;
      -webkit-text-stroke: #101010 1px;
      font-size: 1rem;
      box-shadow: inset 0 0 30px rgba(154,158,112, 1);
      border-radius: 40px;
      padding: 20px;
      width: 40%;
    }
  }
  & a{
    font-size: 2.5rem;
    color: #333F34;
    -webkit-text-stroke: #333F34 1px;
    padding: 5px 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    cursor: pointer;
  }
}
.space{
  min-height: 100px;
}
</style>
