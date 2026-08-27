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

.banner {
  min-height: 85vh;
  width: 100%;
  /* 
    Se a imagem for .png, troque para /banner-home.png 
    Se estiver dentro de public/img/, use /img/banner-home.jpg
  */
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), 
              url("/banner-home.png") no-repeat center center / cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 0 5%;
}

.banner h1 {
  font-size: 3.2rem;
  font-weight: 600;
  color: #F1EDD2;
  margin: 0;
  width: 55%;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.banner h2 {
  font-size: 1.4rem;
  font-weight: 400;
  color: #F1EDD2;
  margin: 0;
  width: 50%;
  line-height: 1.4;
  opacity: 0.9;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.banner a {
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #F1EDD2;
  background: #536236;
  padding: 12px 36px;
  border-radius: 25px;
  text-decoration: none;
  width: fit-content;
  margin-top: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.banner a:hover {
  background: #333F34;
  transform: translateY(-2px);
}
</style>