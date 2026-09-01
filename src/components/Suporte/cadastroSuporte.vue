<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cadastro = ref({
  usuario: {
    nome: '',
    email: '',
    assunto: '',
    categoria: '',
    descrever: '',
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

function prioridadePorCategoria(categoria) {
  const prioridades = {
    documentoErro: 'dificil',
    resultadoErro: 'dificil',
    linkErro: 'dificil',
    perfilErro: 'media',
    horarioErro: 'media',
    choqueHorario: 'media',
    mobilidadeErro: 'baixa',
    filtroErro: 'baixa',
  }

  return prioridades[categoria] || 'baixa'
}

function gerarIdSuporte(suportes) {
  let id
  do {
    const quantidadeDigitos = (crypto.getRandomValues(new Uint32Array(1))[0] % 8) + 2
    const menorValor = 10 ** (quantidadeDigitos - 1)
    const intervalo = 10 ** quantidadeDigitos - menorValor
    const valorAleatorio = crypto.getRandomValues(new Uint32Array(1))[0] % intervalo

    id = String(menorValor + valorAleatorio)
  } while (suportes.some((suporte) => String(suporte.id) === id))

  return id
}

function validarFormulario() {
  const { usuario } = cadastro.value

  if (
    !usuario.nome.trim() ||
    !usuario.email.trim() ||
    !usuario.assunto.trim() ||
    !usuario.categoria.trim()
  ) {
    alert('Preencha os campos obrigatórios: Nome, E-mail, Assunto e Categoria.')
    return false
  }

  const suportes = JSON.parse(localStorage.getItem('suportes') || '[]')
  
  suportes.push({
    id: gerarIdSuporte(suportes),
    usuario: { ...usuario },
    data: new Date().toISOString().slice(0, 10),
    status: 'em-andamento',
    prioridade: prioridadePorCategoria(usuario.categoria),
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
  <main class="principal container-formulario grade-formulario">
    <h1>Cadastro de Suporte</h1>

    <div class="nome cartao-entrada">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" v-model="cadastro.usuario.nome" placeholder="Digite seu nome" />
    </div>

    <div class="email cartao-entrada">
      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="cadastro.usuario.email" placeholder="Digite seu e-mail" />
    </div>

    <div class="assunto cartao-entrada">
      <label for="assunto">Assunto:</label>
      <input type="text" id="assunto" v-model="cadastro.usuario.assunto" placeholder="Assunto do chamado" />
    </div>

    <div class="categoria cartao-entrada">
      <label for="categoria">Categoria:</label>
      <select id="categoria" v-model="cadastro.usuario.categoria">
        <option value="" disabled>Selecione a categoria</option>
        <option value="documentoErro">Erro no upload de documento</option>
        <option value="resultadoErro">Resultado exibindo médicos inativos</option>
        <option value="horarioErro">Choque de horário</option>
        <option value="mobilidadeErro">Mobilidade no site</option>
        <option value="filtroErro">Filtro não funciona</option>
        <option value="linkErro">Falha no link da teleconsulta</option>
      </select>
    </div>

    <div class="anexar-imagem painel-quadrado cartao-entrada">
      <label for="foto">Anexar Imagem:</label>
      <input id="foto" type="file" accept="image/*" @change="aoSelecionarFotoProblema" />
    </div>

    <div class="descrever-problema painel-quadrado cartao-entrada">
      <label for="descrever">Descrição do Problema:</label>
      <textarea id="descrever" v-model="cadastro.usuario.descrever" placeholder="Descreva os detalhes do problema..."></textarea>
    </div>

    <button type="button" class="bnt-confirmar" @click="validarFormulario">Confirmar</button>
    <button type="button" class="bnt-cancelar" @click="cancelar">Cancelar</button>
  </main>
</template>

<style scoped>
.principal {
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-family: 'Italiana', serif;
  grid-column: span 2;
  color: #73441b;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 24px;
  font-weight: bold;
}

.grade-formulario {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.container-formulario {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cartao-entrada {
  display: flex;
  align-items: center;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 18px;
  background-color: #cbba9c;
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
  padding: 4px 8px;
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
  gap: 8px;
  align-self: start;
  padding: 12px;
}

.painel-quadrado label {
  margin: 0;
  text-align: center;
  flex-shrink: 0;
}

.painel-quadrado textarea {
  width: 100%;
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
  resize: none;
}

.bnt-confirmar,
.bnt-cancelar {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  background-color: #9a9e70;
  color: #333f34;
  border: 1px solid #536236;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.bnt-confirmar:hover,
.bnt-cancelar:hover {
  background-color: #6b7c4f;
}

@media (max-width: 700px) {
  .grade-formulario {
    grid-template-columns: 1fr;
  }

  h1 {
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