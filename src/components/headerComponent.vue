<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <div class="menu-hamburguer">
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon">
        <div class="linha"></div>
        <div class="linha"></div>
        <div class="linha"></div>
      </label>

      <label for="menu-toggle" class="backdrop"></label>

      <!-- Menu lateral -->
      <nav class="overlay">
        <ul class="menu-list">
          <li>
            <RouterLink to="/">
              <i class="mdi mdi-home-circle"></i> Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/profissionais">
              <i class="mdi mdi-food-apple-outline"></i>
              Nutricionistas
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/agendamento">
              <i class="mdi mdi-calendar-multiselect-outline"></i>
              Agendamentos
            </RouterLink>
          </li>
          <li>
            <RouterLink to="#">
              <i class="mdi mdi-forum-outline"></i>
              Conversas
            </RouterLink>
          </li>
          <div class="user">
            <li>
              <RouterLink to="/cadastro">
                <i class="mdi mdi-account-circle"></i>
                Meu Perfil
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#">
                <i class="mdi mdi-tag-heart"></i>
                Receitas
              </RouterLink>
            </li>
          </div>
          <li>
            <RouterLink to="/equipe">
              <i class="mdi mdi-account-group"></i>
              Sobre nós
            </RouterLink>
          </li>
        </ul>
        <div class="div">
          <RouterLink to="#">
            Suporte
          </RouterLink>
          <RouterLink to="/">
            <img src="/logo.png" alt="logo" class="logo" />
          </RouterLink>
        </div>
      </nav>

    </div>
    <h1 class="logo">
      <RouterLink to="/">
        <img src="/logo.png" alt="logo">
      </RouterLink>
    </h1>
  </header>
</template>

<style scoped>
/*====================================
        HEADER
=====================================*/
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #536236;
  padding: 25px 50px;
  z-index: 1000;
  box-shadow: 4px 0 50px rgba(0, 0, 0, 0.8);
}

header h1 {
  margin: 0;
}

header h1 img {
  width: 150px;
  height: auto;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 1));
}

header a {
  text-decoration: none;
  font-size: 35px;
  color: #F1EDD2;
  transition: all 1s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

header .div {
  display: flex;
  align-items: center;
  gap: 10px;
}

/*============ Menu hamburguer ===========*/
.menu-hamburguer {
  z-index: 1100;
}

#menu-toggle {
  display: none;
}

.menu-icon {
  width: 35px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1200;
  position: relative;
  transition: all 0.5s ease;
  margin: 0;
}

.menu-icon:hover .linha {
  background: #9A9E70;
  scale: 1.5;
}

div.linha {
  height: 2px;
  background: #F1EDD2;
  border-radius: 2px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: all 1s ease;
}

/*============ Overlay escuro fora do menu ===========*/
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  pointer-events: none;
  transition: opacity 1.4s ease;
  z-index: 900;
}

#menu-toggle:checked~.backdrop {
  opacity: 1;
  pointer-events: auto;
}

/*============ Menu lateral ===========*/
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 100vh;
  background: #536236;
  transform: translateX(-200%);
  transition: 1.4s;
  padding: 40px 25px;
  box-shadow: 5px 0 20px rgba(0, 0, 0, .3);
  z-index: 1000;
}

#menu-toggle:checked~.overlay {
  transform: translateX(0);
}

/*============ Menu interno ===========*/
.overlay .logo {
  display: block;
  margin: 0 40px;
  height: 100px;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 1));
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 20px;
  margin-top: 50px;
}

.menu-list li {
  margin: 15px 50px;
}

.user li {
  margin: 5px 70px;
}

.menu-list a:hover {
  color: #9A9E70;
  scale: 1.1;
  text-shadow: 0 0 5px #101010;
}
</style>