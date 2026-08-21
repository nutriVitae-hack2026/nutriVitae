<script setup>
import { ref } from 'vue'
import router from '@/router'

const cadastro = ref({
  usuario: {
    nome: '',
    email: '',
    assunto: '',
    categoria: 'mobilidade no site', //'Erro no upload de documento', 'Perfil do profissional não aparece nos resultados', 'Filtro não funciona', 'Resultados exibindo médicos inativos ou suspensos',  'Choque de horário',  'Falha no envio do link da teleconsulta'.
    descrever: '',
    anexar: '',
    foto: null,
  },
})

function converterParaBase64(arquivo, callback) {
  const reader = new FileReader()
  reader.onloadend = () => callback(reader.result)
  reader.readAsDataURL(arquivo)
}

function aoSelecionarFotoPoblema(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      cadastro.value.usuario.foto = base64
    })
  }
}

function buscarSuporte() {
  console.log('cliquei para redirecionar')
  router.push('/buscar-consulta')
}

function validarFormulario() {
  const { usuario, profissional, consulta } = agendamento.value

  if (
    !usuario.nome ||
    !usuario.telefone ||
    !usuario.email ||
    !profissional.nome ||
    !profissional.telefone ||
    !profissional.email ||
    !consulta.data ||
    !consulta.horario
  ) {
    alert("Preencha todos os campos.")
    return false
  }

  return true
}
</script>

<template>
  <div class="principal">
    <h1>Cadastro de Componentes</h1>

    <div class="nome">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="cadastro.usuario.nome" />
    </div>

    <div class="email">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="cadastro.usuario.email" />
    </div>

    <div class="assunto">
      <label for="assunto">Assunto:</label>
      <input type="text" id="assunto" v-model="cadastro.usuario.assunto" />
    </div>

    <div class="categoria">
      <label for="categoria">Categoria:</label>

      <select id="categoria" v-model="cadastro.usuario.categoria">
        <option value="documentoErro">Erro no upload de documento</option>
        <option value="perfilErro">Perfil do profissional não aparece nos resultados</option>
        <option value="resultadoErro">Resultados do Médicos inativo ou suspenso</option>
        <option value="horarioErro">Choque de horário</option>
        <option value="mobilidadeErro">Mobilidade no site</option>
        <option value="filtroErro">Filtro não funciona</option>
        <option value="choqueHorario">Choque de horário</option>
        <option value="linkErro">Falha no envio do link da teleconsulta</option>
      </select>
    </div>

    <div class="anexar-imagem">
      <label for="foto">Anexar imagem/arquivo:</label>
      <input id="foto" type="file" accept="image/*" @change="aoSelecionarFotoPoblema" />
    </div>

    <div class="descrever-problema">
      <label for="descrever">Descrever problema:</label>
      <input type="text" id="descrever" v-model="cadastro.usuario.descrever" />
    </div>

    <button @click="confirmar" class="bnt-confirmar">Confirmar</button>
    <button @click="cancelar" class="bnt-cancelar">Cancelar</button>
    <button @click="buscarSuporte()" class="bnt-cancelar">Pesquisa</button>
  </div>
</template>

<style scoped>
h1 {
  color: #73441b;
  font-weight: bolder;
  font-size: 60px;
  text-align: center;
}

div.nome {
  padding: 10px 16px;
}

div.nome label {
  color: #333f34;
  font-weight: bolder;
  font-size: 40px;
}

div.email label {
  color: #333f34;
  font-weight: bolder;
  font-size: 20px;
}

div.email {
  padding: 10px 16px;
}

div.assunto label {
  color: #333f34;
  font-weight: bolder;
  font-size: 20px;
}

div.assunto {
  padding: 10px 16px;
}

div.categoria label {
  color: #333f34;
  font-weight: bolder;
  font-size: 20px;
}

div.categoria {
  padding: 10px 16px;
}

div.categoria select option {
  color: #333f34;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-color: #cbba9c;
}

.anexar-imagem input[type='file'] {
  font-size: 0.85rem;
  color: #333f34;
}

.anexar-imagem input[type='file']::file-selector-button {
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 8px;
  padding: 2px 8px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.2s;
}

.anexar-imagem input[type='file']::file-selector-button:hover {
  background-color: #6b7c4f;
}
</style>
