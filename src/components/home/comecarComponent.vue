<script setup>
</script>

<template>
  <section id="secao-escolha" class="comecar">
    <div class="users">
      <RouterLink to="/cadastro">
        <div class="user">
          <i class="mdi mdi-account-circle"></i>
          <p>
            Cadastrar Paciente
          </p>
        </div>
      </RouterLink>
      
      <RouterLink to="/cadastro-profissional">
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

  & .users {
    display: flex;
    width: 100%;
    gap: 50px;
    justify-content: center;
    align-items: center;

    & a {
      width: 40%;
      text-decoration: none;

      & .user {
        color: #73441B;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
        border-radius: 100px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
        }

        & i {
          font-size: 100px;
        }

        & p {
          font-size: 2.5rem;
        }
      }
    }
  }
}
</style>
