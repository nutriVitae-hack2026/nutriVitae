<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mostrarSenha = ref(false)
const mostrarConfirmarSenha = ref(false)

const form = ref({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  dataNascimento: '',
  senha: '',
  confirmarSenha: ''
})

function validarFormulario() {
  if (
    !form.value.nome ||
    !form.value.email ||
    !form.value.cpf ||
    !form.value.telefone ||
    !form.value.dataNascimento ||
    !form.value.senha ||
    !form.value.confirmarSenha
  ) {
    alert("Preencha todos os campos.")
    return false
  }

  if (form.value.senha !== form.value.confirmarSenha) {
    alert("As senhas não coincidem.")
    return false
  }

  return true
}

function cadastrar() {
  if (!validarFormulario()) return

  const dadosProfissional = {
    tipo: 'profissional', // Identificador mantido para a verificação automática
    nome: form.value.nome,
    email: form.value.email,
    cpf: form.value.cpf,
    telefone: form.value.telefone,
    dataNascimento: form.value.dataNascimento,
    senha: form.value.senha
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(dadosProfissional))
  router.push('/profissionais') // Redireciona após salvar
}
</script>

<template>
  <div class="cadastroPro">
    <div class="topo">
      <h1>Cadastro de Profissional</h1>
      <div class="bemvindo">
        <h2>Bem-vindo</h2>
        <h3>Ao NutriVitae</h3>
      </div>
    </div>
    <form class="form" @submit.prevent="cadastrar">
      <input v-model="form.nome" type="text" placeholder="Nome" required />

      <input v-model="form.email" type="email" placeholder="Email" required />

      <input v-model="form.cpf" type="text" placeholder="CPF" required />

      <input v-model="form.telefone" type="text" placeholder="Telefone" required />

      <input v-model="form.dataNascimento" type="date" required />

      <div class="senha">
        <div class="campoSenha">
          <input
            v-model="form.senha"
            :type="mostrarSenha ? 'text' : 'password'"
            placeholder="Senha"
            required
          />
          <i
            :class="mostrarSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            @click="mostrarSenha = !mostrarSenha"
          ></i>
        </div>

        <div class="campoSenha">
          <input
            v-model="form.confirmarSenha"
            :type="mostrarConfirmarSenha ? 'text' : 'password'"
            placeholder="Confirme a senha"
            required
          />
          <i
            :class="mostrarConfirmarSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            @click="mostrarConfirmarSenha = !mostrarConfirmarSenha"
          ></i>
        </div>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<style scoped>
.cadastroPro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & .topo {
    display: flex;
    width: 100%;
    text-align: center;
    align-items: center;

    & h1 {
      font-size: 4rem;
      color: #73441b;
      width: 50%;
    }

    & .bemvindo {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #73441b;
      border-radius: 0 0 0 300px;
      margin: 0 0 30px 0;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.75);

      & h2 {
        margin: 20px 0 0 0;
        font-size: 4rem;
        color: #fff;
      }

      & h3 {
        margin: 0 0 20px 0;
        font-size: 4rem;
        color: #fff;
      }
    }
  }

  & .form {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    align-items: center;
    text-align: center;

    & input {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #73441b;
      border-radius: 20px;
      background-color: #d1bfa5;
      font-family: 'Italiana', serif;
      font-size: 30px;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
      margin: 20px;
      width: 40%;

      &::placeholder {
        color: #536236;
        font-family: 'Italiana', serif;
        font-weight: bold;
      }
    }

    & .senha {
      display: flex;
      width: 100%;
      justify-content: space-between;

      & .campoSenha {
        position: relative;
        width: 45%;
        display: flex;

        & input {
          width: 100%;
          padding-right: 50px;
          background-color: #9a9e70;
        }

        & i {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #536236;
          font-size: 26px;
        }
      }
    }
    & button {
      margin: 20px;
      padding: 10px;
      border: 1px solid #73441b;
      border-radius: 20px;
      background-color: #536236;
      font-family: 'Italiana', serif;
      font-size: 30px;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
      width: 40%;
      cursor: pointer;
      color: #9a9e70;
    }
  }
}
</style>