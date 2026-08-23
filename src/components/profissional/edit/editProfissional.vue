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
const formacoes = ref(profissional?.formacoes.map(f => ({ ...f })) || [])
const especializacoes = ref(profissional?.especializacoes.map(e => ({ ...e })) || [])

function salvar() {
    profissional.nome = nome.value
    profissional.email = email.value
    profissional.telefone = telefone.value
    profissional.dataNascimento = dataNascimento.value
    profissional.formacoes = formacoes.value
    profissional.especializacoes = especializacoes.value
    router.push(`/profissional/${profissional.id}`)
}

function cancelar() {
    router.push(`/profissional/${profissional.id}`)
}

function alterarFoto(event) {
    const arquivo = event.target.files[0]
    if (arquivo) profissional.foto = URL.createObjectURL(arquivo)
}
</script>

<template>
    <main v-if="profissional" class="editar">
        <form @submit.prevent="salvar">
            <div class="title">
                <div class="foto">
                    <img :src="profissional.foto" :alt="profissional.nome">
                    <label for="foto"><i class="mdi mdi-camera"></i></label>
                    <input id="foto" type="file" accept="image/*" @change="alterarFoto">
                </div>
                <h1>Editar Perfil do Profissional</h1>
            </div>

            <div class="dados">
                <div class="campo">
                    <label>Nome:</label>
                    <input v-model="nome" type="text" readonly>
                </div>
                <div class="campo">
                    <label>Telefone:</label>
                    <input v-model="telefone" type="tel" pattern="\(\d{2}\) \d{4,5}-\d{4}" placeholder="(00) 00000-0000"
                        required>
                    <i class="mdi mdi-pencil"></i>
                </div>
                <div class="campo">
                    <label>Email:</label>
                    <input v-model="email" type="email" required>
                    <i class="mdi mdi-pencil"></i>
                </div>
                <div class="campo">
                    <label>Data de Nascimento:</label>
                    <input v-model="dataNascimento" type="date" required class="date">
                    <i class="mdi mdi-pencil"></i>
                </div>
            </div>

            <div class="listas">
                <div class="lista">
                    <div class="lista-title">
                        <h2>Formação Acadêmica</h2>
                        <div>
                            <RouterLink to="#">
                                <button type="button">
                                    <i class="mdi mdi-plus"></i>
                                </button>
                            </RouterLink>
                            <RouterLink to="#">
                                <button type="button">
                                    <i class="mdi mdi-pencil"></i>
                                </button>
                            </RouterLink>
                        </div>
                    </div>
                    <ul>
                        <li v-for="formacao in formacoes" :key="formacao.nome">
                            <strong>{{ formacao.tipo }}:</strong>
                            {{ formacao.nome }}
                        </li>
                    </ul>
                </div>

                <div class="lista">
                    <div class="lista-title">
                        <h2>Especializações</h2>
                        <div>
                            <RouterLink to="#">
                                <button type="button">
                                    <i class="mdi mdi-plus"></i>
                                </button>
                            </RouterLink>
                            <RouterLink to="#">
                                <button type="button">
                                    <i class="mdi mdi-pencil"></i>
                                </button>
                            </RouterLink>
                        </div>
                    </div>
                    <ul>
                        <li v-for="especializacao in especializacoes" :key="especializacao.nome">
                            <strong>{{ especializacao.tipo }}:</strong>
                            {{ especializacao.nome }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="acoes">
                <button type="submit">Salvar</button>
                <button type="button" @click="cancelar">Cancelar</button>
            </div>
        </form>
    </main>

    <main v-else class="naoEncontrado">
        <h2>Profissional não encontrado.</h2>
        <RouterLink to="/">
            <button>
                <i class="mdi mdi-home-circle"></i>
                Voltar para a página inicial
            </button>
        </RouterLink>
    </main>
</template>

<style scoped>
.editar {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-bottom: 50px;

    & form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        margin-top: 25px;

        & h1 {
            font-size: 4.8rem;
            font-weight: normal;
            color: #73441B;
        }

        & .foto {
            position: relative;

            & img {
                width: 125px;
                height: 125px;
                object-fit: cover;
                border-radius: 50%;
                box-shadow: 4px 4px 10px rgba(0, 0, 0, .4);
            }

            & label {
                position: absolute;
                bottom: -8px;
                left: -10px;
                width: 35px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1f211d;
                color: white;
                border-radius: 4px;
                cursor: pointer;
            }

            & input {
                display: none;
            }
        }
    }

    & .dados {
        width: 75%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 70px 80px;
        margin-top: 30px;

        & .campo {
            display: flex;
            align-items: center;
            background: #D1BFA5;
            border: 1px solid #73441B;
            border-radius: 15px;
            padding: 10px 15px;
            box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);

            & label {
                color: #536236;
                -webkit-text-stroke: 0.5px #536236;
                font-size: 21px;
                font-weight: bold;
                white-space: nowrap;
                margin-right: 15px;
            }

            & input {
                width: 100%;
                border: none;
                outline: none;
                background: transparent;
                color: #73441B;
                -webkit-text-stroke: 0.2px #73441B;
                font-family: "Italiana", serif;
                font-size: 25px;
                font-weight: bold;
                cursor: pointer;
            }

            & input::-webkit-calendar-picker-indicator {
                cursor: pointer;
                filter: invert(35%) sepia(30%) saturate(600%) hue-rotate(45deg);
                width: 20px;
                height: 20px;
                padding: 5px;

            }

            & input:read-only {
                cursor: not-allowed;
                opacity: .8;
            }

            & i {
                color: #536236;
                font-size: 20px;
                padding: 5px 10px;
                margin: 10px;
                border-radius: 50%;
                box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
                cursor: pointer;
            }
        }
    }

    & .listas {
        width: 85%;
        display: flex;
        justify-content: center;
        gap: 15%;
        margin-top: 50px;

        & .lista {
            width: 42%;
            padding: 15px 20px;
            background: #9A9E70;
            border: 2px solid #536236;
            border-radius: 18px;
            box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);

            & .lista-title {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 70px;

                & h2 {
                    color: #333F34;
                    -webkit-text-stroke: 1px #333F34;
                    font-size: 30px;
                    margin: 5px 0 15px;
                }

                & div {
                    display: flex;
                    gap: 8px;

                    & button {
                        width: 35px;
                        height: 35px;
                        padding: 0;
                        border: none;
                        border-radius: 50%;
                        background: #D1BFA5;
                        color: #333F34;
                        -webkit-text-stroke: 1px #333F34;
                        cursor: pointer;
                        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
                    }
                }
            }

            & ul {
                padding-left: 20px;
                margin: 0;
                list-style: none;
                display: flex;
                flex-direction: column;

                & li {
                    color: #536236;
                    font-size: 25px;
                    margin: 8px 0;
                    -webkit-text-stroke: 1px #536236;

                    & strong {
                        color: #333F34;
                        -webkit-text-stroke: 1px #333F34;
                    }
                }
            }
        }
    }

    & .acoes {
        width: 85%;
        display: flex;
        justify-content: space-between;
        margin-top: 60px;

        & button {
            width: 20%;
            height: 50px;
            border:  1px #333F34 solid;
            border-radius: 15px;
            background: #9A9E70;
            color: #333F34;
            -webkit-text-stroke: 1px #333F34;
            font-family: "Italiana", serif;
            font-size: 30px;
            cursor: pointer;
            box-shadow: 8px 8px 15px rgba(0, 0, 0, .4);
        }
    }
}

.naoEncontrado {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 80px;
    color: #73441B;
    min-height: 1000px;
    gap: 20px;

    & h2 {
        text-shadow: 4px 4px 10px rgba(0, 0, 0, .8);
    }

    & button {
        background: transparent;
        box-shadow: 10px 10px 20px rgba(0, 0, 0, .8);
        border: none;
        font-size: 80px;
        padding: 20px;
        border-radius: 20px;
        color: #333F34;
        font-family: "Italiana", serif;
    }
}
</style>