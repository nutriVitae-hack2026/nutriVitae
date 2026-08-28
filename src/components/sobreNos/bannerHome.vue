<script setup>
import SiteObjetivo from './siteObjetivo.vue'
import MembrosEquipe from './membrosEquipe.vue'
</script>

<template>
    <section class="banner">
        <h1>
            Equipe NutriVitae
        </h1>

    </section>
  <SiteObjetivo />
  <MembrosEquipe />

</template>
<style scoped>
.banner{
  min-height: 100vh;
  width: 100%;
  background: url("/banner-home.png") no-repeat center center/cover;
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
 
}
</style>
