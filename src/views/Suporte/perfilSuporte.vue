<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const perfil = ref({
  buscar: {
    chamado: '',
    status: '',
    solicitante: '',
    prioridade: '',
    categoria: '',
    historico: [],
    descricao: '',
  },
})

function formatarDataHora(data) {
  const d = new Date(data)
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

onMounted(() => {
  const id = route.params.id
  const suportes = JSON.parse(localStorage.getItem('suportes') || '[]')
  const suporteSelecionado = suportes.find((item) => item.id === id)

  if (suporteSelecionado) {
    const historico = []

    // Evento inicial: Chamado criado
    historico.push({
      evento: 'Chamado criado',
      timestamp: suporteSelecionado.data || new Date().toISOString(),
    })

    // Se estiver resolvido, adicionar os eventos
    if (suporteSelecionado.status === 'resolvido') {
      historico.push({
        evento: 'Técnico assumiu',
        timestamp: suporteSelecionado.dataResolucao || new Date().toISOString(),
      })

      historico.push({
        evento: 'Problema resolvido',
        timestamp: suporteSelecionado.dataResolucao || new Date().toISOString(),
      })

      historico.push({
        evento: 'Mensagem de retorno enviada ao usuário',
        timestamp: suporteSelecionado.dataResolucao || new Date().toISOString(),
      })
    }

    perfil.value.buscar = {
      chamado: suporteSelecionado.id || '',
      status: suporteSelecionado.status || 'em-andamento',
      solicitante: suporteSelecionado.usuario?.nome || '',
      prioridade: suporteSelecionado.prioridade || 'Média',
      categoria: suporteSelecionado.usuario?.categoria || '',
      historico: historico,
      descricao: suporteSelecionado.usuario?.descrever || suporteSelecionado.assunto || '',
    }
  }
})

function irParaCadastro() {
  router.push('/CadastroSuporte')
}

function voltarHome() {
  router.push('/')
}
</script>

<template>
  <div class="container-perfil">
    <div class="header-perfil">
      <h1>Perfil do suporte</h1>
    </div>

    <div class="conteudo-perfil">
      <!-- Primeira linha: ID e Status -->
      <div class="grid-campos">
        <div class="campo-caixa">
          <label>Id: </label>
          <div class="valor">{{ perfil.buscar.chamado }}</div>
        </div>
        <div class="campo-caixa">
          <label>Status: </label>
          <div class="valor" :class="{ resolvido: perfil.buscar.status === 'resolvido' }">
            {{ perfil.buscar.status === 'resolvido' ? 'Resolvido' : 'Em análise' }}
          </div>
        </div>
      </div>

      <!-- Segunda linha: Solicitante e Prioridade -->
      <div class="grid-campos">
        <div class="campo-caixa">
          <label>Solicitante: </label>
          <div class="valor">{{ perfil.buscar.solicitante }}</div>
        </div>
        <div class="campo-caixa">
          <label>Prioridade: </label>
          <div class="valor">{{ perfil.buscar.prioridade }}</div>
        </div>
      </div>

      <!-- Categoria completa -->
      <div class="campo-caixa full-width">
        <label>Categoria do suporte: </label>
        <div class="valor">{{ perfil.buscar.categoria }}</div>
      </div>

      <!-- Linha com Histórico e Descrição -->
      <div class="grid-campos-grande">
        <div class="campo-caixa">
          <label>Histórico:</label>
          <div class="valor-multiplo">
            <div
              v-for="(evento, index) in perfil.buscar.historico"
              :key="index"
              class="evento-historico"
            >
              <strong>{{ evento.evento }}</strong>
              <br />
              {{ formatarDataHora(evento.timestamp) }}
            </div>
          </div>
        </div>
        <div class="campo-caixa">
          <label>Descrição:</label>
          <div class="valor-multiplo">{{ perfil.buscar.descricao }}</div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="botoes-acao">
        <button class="btn-confirmar" @click="irParaCadastro">Novo suporte</button>
        <button class="btn-cancelar" @click="voltarHome">Voltar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-perfil {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Roboto', serif;
}

.header-perfil {
  text-align: center;
  margin-bottom: 30px;
}

.header-perfil h1 {
  font-size: 3rem;
  color: #73441b;
  font-family: 'Italiana', serif;
  margin: 0;
  font-weight: bold;
}

.conteudo-perfil {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid-campos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.grid-campos-grande {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.campo-caixa {
  background-color: transparent;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.campo-caixa.full-width {
  grid-column: 1 / -1;
}

.campo-caixa label {
  font-size: 16px;
  font-weight: 900;
  color: #536236;
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif;
}

.campo-caixa .valor {
  font-size: 16px;
  color: #333f34;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

.campo-caixa .valor-multiplo {
  font-size: 16px;
  color: #333f34;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
}

.evento-historico {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d0c4b0;
  font-size: 14px;
}

.evento-historico:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.evento-historico strong {
  color: #536236;
  display: block;
  margin-bottom: 4px;
}

.evento-historico br + text {
  font-size: 12px;
  color: #666;
}

.botoes-acao {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  justify-content: center;
  margin-top: 30px;
}

.btn-confirmar,
.btn-cancelar {
  padding: 12px 24px;
  font-size: 1.35rem;
  font-family: 'Roboto', serif;
  border: 1px solid #536236;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-confirmar {
  background-color: #9a9e70;
  color: #333f34;
}

.btn-confirmar:hover {
  background-color: #6b7c4f;
}

.btn-cancelar {
  background-color: #9a9e70;
  color: #333f34;
}

.btn-cancelar:hover {
  background-color: #6b7c4f;
}

@media (max-width: 768px) {
  .grid-campos,
  .grid-campos-grande,
  .botoes-acao {
    grid-template-columns: 1fr;
  }
}
</style>
