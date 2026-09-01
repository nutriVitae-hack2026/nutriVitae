<script setup>
import SiteObjetivo from './siteObjetivo.vue'
import MembrosEquipe from './membrosEquipe.vue'
</script>

<template>
  <section class="banner">

    <h1>Equipe NutriVitae</h1>
  </section>

  <SiteObjetivo />
  <MembrosEquipe />
</template>

<style scoped>
.banner {
  min-height: 65vh;
  width: 100%;
  background: url("/img/nos.jpeg") no-repeat center center/cover;
  position: relative;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.banner h1 {
  font-size: clamp(2.2rem, 5vw, 5rem);
  color: #f1edd2;
  margin: 0 50px;
  text-shadow: 10px 4px 10px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  line-height: 1.15;
}

@media (max-width: 700px) {
  .navBanner ul {
    display: none;
  }

  .banner h1 {
    margin: 0 24px;
  }
}
</style>