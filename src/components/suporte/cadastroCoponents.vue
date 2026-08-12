<script setup>
import { ref } from 'vue'

const cadastro = ref({
  usuario: {
    nome: '',
    email: '',
    assunto: '',
    categoria: 'mobilidade no site', //'Erro no upload de documento', 'Perfil do profissional não aparece nos resultados', 'Filtro não funciona', 'Resultados exibindo médicos inativos ou suspensos',  'Choque de horário',  'Falha no envio do link da teleconsulta'.

  },
})

</script>

<template>
 <div class = "principal">
    <h1>Cadastro de Componentes</h1>

    <div class = "nome">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="cadastro.usuario.nome" />
    </div>

    <div class = "email">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="cadastro.usuario.email" />
    </div>

    <div class = "assunto">
      <label for="assunto">Assunto:</label>
      <input type="text" id="assunto" v-model="cadastro.usuario.assunto" />
    </div>

    <div class = "categoria">
      <label for="categoria">Categoria:</label>

      <select id="categoria" v-model="cadastro.usuario.categoria">
     <option value="documentoErro"> Erro no upload de documento</option>
     <option value="perfilErro">Perfil do profissional não aparece nos resultados</option>
     <option value="resultadoErro">Resultados do Médicos inativo ou suspenso</option>
     <option value="horarioErro">Choque de horário</option>
     <option value="mobilidadeErro">Mobilidade no site</option>
     <option value="filtroErro">Filtro não funciona</option>
     <option value="choqueHorario">Choque de horário</option>
     <option value="linkErro">Falha no envio do link da teleconsulta</option>
    </select>

    </div>



  </div>
</template>

<style scoped>
h1{
  color: #73441B;
  font-weight: bolder;
  font-size: 60px;
}

div.nome{
  padding: 10px 16px;
}

div.nome label{
  color: #333F34;
  font-weight: bolder;
}

div.email label{
  color: #333F34;
  font-weight: bolder;
}

div.assunto label{
  color: #333F34;
  font-weight: bolder;
}

div.categoria label{
  color: #333F34;
  font-weight: bolder;
}


</style>
