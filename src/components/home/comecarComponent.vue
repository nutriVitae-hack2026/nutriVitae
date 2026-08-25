<script setup>
</script>

<template>
  <section class="comecar">
    <h2>
      Comece agora mesmo!
    </h2>
    <div class="users">
      <RouterLink to="/cadastro">
        <div class="user">
          <i class="mdi mdi-account-circle"></i>
          <p>
            Cadastrar Paciente
          </p>
        </div>
      </RouterLink>
      <RouterLink to="#">
        <div class="user">
          <i class="mdi mdi-account-circle"></i>
          <p>
            Cadastrar Nutricionista
          </p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.comecar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  margin: 50px 0;
  gap: 50px;

  & h2 {
    color: #333F34;
    font-size: 5rem;
    -webkit-text-stroke: #333F34 1px;
  }

  & .users {
    display: flex;
    width: 100%;
    gap: 50px;
    justify-content: center;
      align-items: center;
    & a{
      width: 40%;

    & .user {
      color: #73441B;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
      border-radius: 100px;

      & i {
        font-size: 100px;
      }
      & p {
        font-size: 3rem;
      }
    }
    }
  }
}
</style>
