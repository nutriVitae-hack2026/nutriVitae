<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { profissionais } from "@/data/profissionais"

const route = useRoute()
const router = useRouter()
const profissional = profissionais.find(p => p.id === Number(route.params.id))

const nome = ref(profissional?.nome || "")
const email = ref(profissional?.email || "")
const telefone = ref(profissional?.telefone || "")
const dataNascimento = ref(profissional?.dataNascimento || "")
const formacoes = ref(profissional?.formacoes ? JSON.parse(JSON.stringify(profissional.formacoes)) : [])
const especializacoes = ref(profissional?.especializacoes ? JSON.parse(JSON.stringify(profissional.especializacoes)) : [])

const modalAberto = ref(null) 
const novoTipo = ref("")
const novoNome = ref("")

function abrirModal(tipo) {
  modalAberto.value = tipo
  novoTipo.value = ""
  novoNome.value = ""
}

function fecharModal() {
  modalAberto.value = null
}

function adicionarItem() {
  if (!novoTipo.value.trim() || !novoNome.value.trim()) return

  if (modalAberto.value === 'formacoes') {
    formacoes.value.push({ tipo: novoTipo.value, nome: novoNome.value })
  } else if (modalAberto.value === 'especializacoes') {
    especializacoes.value.push({ tipo: novoTipo.value, nome: novoNome.value })
  }

  novoTipo.value = ""
  novoNome.value = ""
}

function removerItem(lista, index) {
  if (lista === 'formacoes') {
    formacoes.value.splice(index, 1)
  } else if (lista === 'especializacoes') {
    especializacoes.value.splice(index, 1)
  }
}

function salvar() {
  if (profissional) {
    profissional.nome = nome.value
    profissional.email = email.value
    profissional.telefone = telefone.value
    profissional.dataNascimento = dataNascimento.value
    profissional.formacoes = formacoes.value
    profissional.especializacoes = especializacoes.value

    router.push(`/profissional/${profissional.id}`)
  }
}

function cancelar() {
  if (profissional) {
    router.push(`/profissional/${profissional.id}`)
  } else {
    router.push('/')
  }
}

function alterarFoto(event) {
  const arquivo = event.target.files[0]
  if (arquivo && profissional) {
    profissional.foto = URL.createObjectURL(arquivo)
  }
}
</script>

<template>
  <main v-if="profissional" class="editar">
    <form @submit.prevent="salvar">
      <h1>Editar Perfil do Profissional</h1>

      <div class="perfil-conteudo">

        <div class="dados-pessoais">
          <div class="linha-nome">
            <div class="foto">
              <img :src="profissional.foto" :alt="profissional.nome" />
              <label for="foto" title="Alterar Foto">
                <i class="mdi mdi-camera"></i>
              </label>
              <input id="foto" type="file" accept="image/*" @change="alterarFoto" />
            </div>

            <div class="campo flex-grow">
              <label for="input-nome">Nome:</label>
              <input id="input-nome" v-model="nome" type="text" required />
              <label for="input-nome" class="btn-lapis" title="Editar Nome">
                <i class="mdi mdi-pencil-outline"></i>
              </label>
            </div>
          </div>

          <div class="campo">
            <label for="input-email">Email:</label>
            <input id="input-email" v-model="email" type="email" required />
            <label for="input-email" class="btn-lapis" title="Editar Email">
              <i class="mdi mdi-pencil-outline"></i>
            </label>
          </div>

          <div class="campo">
            <label for="input-telefone">Telefone:</label>
            <input
              id="input-telefone"
              v-model="telefone"
              type="tel"
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              placeholder="(00) 00000-0000"
              required
            />
            <label for="input-telefone" class="btn-lapis" title="Editar Telefone">
              <i class="mdi mdi-pencil-outline"></i>
            </label>
          </div>
        </div>

        <div class="listas">
          <div class="card-lista">
            <div class="card-header">
              <h2>Formação Acadêmica</h2>
              <button type="button" class="btn-lapis" title="Gerenciar Formações" @click="abrirModal('formacoes')">
                <i class="mdi mdi-pencil-outline"></i>
              </button>
            </div>
            <ul>
              <li v-for="(formacao, index) in formacoes" :key="index">
                <span class="bullet">•</span>
                <span class="tipo">{{ formacao.tipo }}:</span>
                <span class="nome">{{ formacao.nome }}</span>
              </li>
            </ul>
          </div>

          <div class="card-lista">
            <div class="card-header">
              <h2>Especializações</h2>
              <button type="button" class="btn-lapis" title="Gerenciar Especializações" @click="abrirModal('especializacoes')">
                <i class="mdi mdi-pencil-outline"></i>
              </button>
            </div>
            <ul>
              <li v-for="(especializacao, index) in especializacoes" :key="index">
                <span class="bullet">•</span>
                <span class="tipo">{{ especializacao.tipo }}:</span>
                <span class="nome">{{ especializacao.nome }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="acoes">
          <button type="submit" class="btn-acao">Salvar</button>
          <button type="button" class="btn-acao" @click="cancelar">Cancelar</button>
        </div>
      </div>
    </form>

    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-card">
        <h3>Gerenciar {{ modalAberto === 'formacoes' ? 'Formação Acadêmica' : 'Especializações' }}</h3>
        
        <div class="modal-adicionar">
          <input v-model="novoTipo" placeholder="Tipo (ex: Graduação, Curso)" />
          <input v-model="novoNome" placeholder="Nome (ex: Nutrição, Gastronomia)" />
          <button type="button" class="btn-add" @click="adicionarItem">+</button>
        </div>

        <ul class="modal-lista">
          <li v-for="(item, index) in (modalAberto === 'formacoes' ? formacoes : especializacoes)" :key="index">
            <span><strong>{{ item.tipo }}:</strong> {{ item.nome }}</span>
            <button type="button" class="btn-remover" @click="removerItem(modalAberto, index)">
              <i class="mdi mdi-delete-outline"></i>
            </button>
          </li>
        </ul>

        <button type="button" class="btn-fechar" @click="fecharModal">Concluir</button>
      </div>
    </div>
  </main>

  <main v-else class="naoEncontrado">
    <h2>Profissional não encontrado.</h2>
    <button type="button" class="btn-voltar" @click="cancelar">
      <i class="mdi mdi-home-circle"></i> Voltar à Página Inicial
    </button>
  </main>
</template>

<style scoped>
.editar {
  width: 100%;
  min-height: 100vh;
  background-color: #EFE8D3;
  padding: 32px 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  & form {
    width: 100%;
    max-width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & h1 {
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    color: #536236;
    font-weight: 400;
    margin-bottom: 28px;
    text-align: center;
  }

  & .perfil-conteudo {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & .dados-pessoais {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  & .linha-nome {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  & .foto {
    position: relative;
    flex-shrink: 0;

    & img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      display: block;
    }

    & label {
      position: absolute;
      bottom: -2px;
      left: -2px;
      width: 26px;
      height: 24px;
      background: #1F211D;
      color: #FFFFFF;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transition: background 0.2s;

      &:hover {
        background: #333F34;
      }
    }

    & input {
      display: none;
    }
  }

  & .campo {
    width: 100%;
    padding: 10px 16px;
    border: 1.5px solid #8C7355;
    border-radius: 14px;
    background-color: rgba(239, 232, 211, 0.6);
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;

    & label {
      font-size: 1.05rem;
      color: #536236;
      font-weight: 500;
      white-space: nowrap;
      min-width: 70px;
    }

    & input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: #333F34;
      font-size: 1.05rem;
      font-family: inherit;
    }
  }

  & .flex-grow {
    flex: 1;
  }

  & .btn-lapis {
    background: transparent;
    border: none;
    color: #333F34;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  & .listas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 6px;
  }

  & .card-lista {
    border: 1.5px solid #8C7355;
    border-radius: 16px;
    padding: 18px 20px;
    background-color: rgba(239, 232, 211, 0.4);

    & .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      & h2 {
        font-size: 1.35rem;
        color: #536236;
        font-weight: 400;
        margin: 0;
      }
    }

    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      & li {
        display: flex;
        align-items: baseline;
        gap: 6px;
        font-size: 0.95rem;
        color: #333F34;

        & .bullet {
          font-size: 1.1rem;
          color: #333F34;
        }

        & .tipo {
          font-weight: 600;
          color: #333F34;
        }

        & .nome {
          color: #536236;
        }
      }
    }
  }

  & .acoes {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 24px;

    & .btn-acao {
      min-width: 180px;
      padding: 12px 32px;
      border: none;
      border-radius: 50px;
      background-color: #536236;
      color: #EFE8D3;
      font-size: 1.15rem;
      font-weight: 400;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;

      &:hover {
        background-color: #43502a;
        transform: translateY(-2px);
      }
    }
  }
}

/* Modal CSS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  background: #EFE8D3;
  border: 1.5px solid #8C7355;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  & h3 {
    margin: 0;
    color: #536236;
  }
}

.modal-adicionar {
  display: flex;
  gap: 8px;

  & input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #8C7355;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.5);
  }

  & .btn-add {
    background: #536236;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 1.2rem;
    cursor: pointer;
  }
}

.modal-lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;

  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(239, 232, 211, 0.8);
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(140, 115, 85, 0.3);
  }
}

.btn-remover {
  background: transparent;
  border: none;
  color: #a83232;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-fechar {
  background: #536236;
  color: #EFE8D3;
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  cursor: pointer;
  align-self: flex-end;
}

.naoEncontrado {
  min-height: 100vh;
  background-color: #EFE8D3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  text-align: center;

  & h2 {
    font-size: 1.8rem;
    color: #536236;
    font-weight: 400;
  }

  & .btn-voltar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: #536236;
    color: #EFE8D3;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(83, 98, 54, 0.2);
    transition: all 0.25s ease;

    &:hover {
      background-color: #414e2a;
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 768px) {
  .editar {
    padding: 20px 16px;

    & .listas {
      grid-template-columns: 1fr;
    }

    & .linha-nome {
      flex-direction: column;
    }

    & .acoes {
      flex-direction: column;
      gap: 12px;

      & .btn-acao {
        width: 100%;
      }
    }
  }
}
</style>