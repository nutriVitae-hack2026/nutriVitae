<script setup>
import { ref } from 'vue'
import router from '@/router'

const cadastro = ref({
  usuario: {
    nome: '',
    email: '',
    assunto: '',
    categoria: '', //'Mobilidade no site', 'Erro no upload de documento', 'Perfil do profissional não aparece nos resultados', 'Filtro não funciona', 'Resultados exibindo médicos inativos ou suspensos',  'Choque de horário',  'Falha no envio do link da teleconsulta'.
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

function aoSelecionarFotoProblema(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      cadastro.value.usuario.foto = base64
    })
  }
}

function validarFormulario() {
  const { usuario } = cadastro.value

  if (
    !usuario.nome.trim() ||
    !usuario.email.trim() ||
    !usuario.assunto.trim() ||
    !usuario.descrever.trim()
  ) {
    alert('Preencha nome, email, assunto e descrição.')
    return false
  }

  const suportes = JSON.parse(localStorage.getItem('suportes') || '[]')
  suportes.push({
    id: Date.now(),
    usuario: { ...usuario },
    data: new Date().toISOString().slice(0, 10),
    chamada: 'em-andamento',
    prioridade: 'baixa',
  })
  localStorage.setItem('suportes', JSON.stringify(suportes))
  router.push('/buscar-suporte')
  return true
}

function cancelar() {
  router.push('/')
}
</script>

<template>
  <div class="principal container-formulario grade-formulario">
    <h1>Cadastro de suporte</h1>

    <div class="nome cartao-entrada">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="cadastro.usuario.nome" />
    </div>

    <div class="email cartao-entrada">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="cadastro.usuario.email" />
    </div>

    <div class="assunto cartao-entrada">
      <label for="assunto">Assunto:</label>
      <input type="text" id="assunto" v-model="cadastro.usuario.assunto" />
    </div>

    <div class="categoria cartao-entrada">
      <label for="categoria">Categoria:</label>

      <select id="categoria" v-model="cadastro.usuario.categoria">
        <option value="" disabled>Categoria do problema</option>
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

    <div class="anexar-imagem painel-quadrado cartao-entrada">
      <label for="foto">Anexar imagem:</label>
      <input id="foto" type="file" accept="image/*" @change="aoSelecionarFotoProblema" />
    </div>

    <div class="descrever-problema painel-quadrado cartao-entrada">
      <label for="descrever">Descrever problema:</label>
      <textarea id="descrever" v-model="cadastro.usuario.descrever"></textarea>
    </div>

    <button type="button" @click="validarFormulario" class="bnt-confirmar">Confirmar</button>
    <button @click="cancelar" class="bnt-cancelar">Cancelar</button>
  </div>
</template>

<style scoped>
h1 {
  grid-column: span 2;
  color: #73441b;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 24px;
  font-weight: bold;
}

.grade-formulario {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  gap: 16px;
}

.container-formulario {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.largura-total {
  grid-column: span 2;
}

.cartao-entrada {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
  font-size: 23px;
  font-weight: 900;
}

.cartao-entrada label {
  color: #536236;
  font-weight: 900;
  margin-right: 8px;
  white-space: nowrap;
}

.cartao-entrada input,
.cartao-entrada select {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
}

.cartao-entrada select {
  cursor: pointer;
}

.cartao-entrada select option {
  background-color: #cbba9c;
  color: #4b5a32;
  padding: 10px;
}

.cartao-entrada input[type='file'] {
  font-size: 0.85rem;
  color: #333f34;
}

.cartao-entrada input[type='file']::file-selector-button {
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

.cartao-entrada input[type='file']::file-selector-button:hover {
  background-color: #6b7c4f;
}

.painel-quadrado {
  width: 100%;
  aspect-ratio: 1.9 / 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  align-self: start;
  padding: 0;
}

.painel-quadrado label {
  margin: 0;
  padding: 10px 16px 0 16px;
  text-align: center;
  flex-shrink: 0;
}

.painel-quadrado input[type='file'] {
  width: auto;
  max-width: 100%;
  margin-top: 16px;
  align-self: center;
  padding: 0 16px 16px 16px;
}

.painel-quadrado textarea {
  width: 100%;
  flex: 1;
  min-height: 0;
  margin-top: 0px;
  margin-left: 30px;
  margin-right: 16px;
  margin-bottom: 16px;
  background: transparent;
  border: none;
  outline: none;
  padding: 10px;
  color: #333f34;
  font-size: 0.9rem;
  font: inherit;
  resize: none;
}

.input-grande {
  display: flex;
  flex-direction: column;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
  min-height: 200px;
  align-items: center;
}

.input-grande label {
  color: #333f34;
  font-weight: bold;
  margin-bottom: 8px;
  white-space: nowrap;
  font-size: 1.5rem;
}

.input-grande textarea {
  width: 100%;
  height: 100%;
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: inherit;
  resize: none;
  text-align: left;
}

.bnt-confirmar {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}

.bnt-cancelar {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}

@media (max-width: 700px) {
  .grade-formulario {
    grid-template-columns: 1fr;
  }

  h1,
  .largura-total {
    grid-column: auto;
  }

  .cartao-entrada {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .cartao-entrada label {
    margin-right: 0;
  }
}
</style>
