<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const agendamento = ref({
  usuario: {
    nome: '',
    telefone: '',
    email: '',
    foto: null, // <-- Guarda a URL da foto do usuário
  },

  profissional: {
    nome: '',
    telefone: '',
    email: '',
    foto: null,
  },

  consulta: {
    data: '',
    horario: '',
    tipo: 'Presencial', //ou 'online (EAD)'
  },
})

function converterParaBase64(arquivo, callback) {
  const reader = new FileReader()
  reader.onloadend = () => callback(reader.result)
  reader.readAsDataURL(arquivo)
}

function aoSelecionarFotoUsuario(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      agendamento.value.usuario.foto = base64
    })
  }
}

function aoSelecionarFotoProfissional(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    converterParaBase64(arquivo, (base64) => {
      agendamento.value.profissional.foto = base64
    })
  }
}

function agendar() {
  localStorage.setItem('dadosAgendamento', JSON.stringify(agendamento.value))
  
  router.push('/resumo')
}

</script>

<template>

  <main class="container">
    <h1>Agendar Consulta</h1>

    <!-- Seção Usuarío -->
    <section>
      <div class="divider">
        <span>Sobre Usuário</span>
      </div>

      <div class="grid-form">
        <div class="input-card">
          <label for="usr-nome">Nome:</label>
          <input id="usr-nome" type="text" v-model="agendamento.usuario.nome" />
        </div>

        <div class="input-card">
          <label for="usr-tel">Telefone:</label>
          <input id="usr-tel" type="text" v-model="agendamento.usuario.telefone" />
        </div>

        <div class="input-card full-width">
          <label for="usr-email">E-mail:</label>
          <input id="usr-email" type="email" v-model="agendamento.usuario.email" />
        </div>

        <div class="input-card full-width">
          <label for="usr-foto">Foto de Perfil:</label>
          <input id="usr-foto" type="file" accept="image/*" @change="aoSelecionarFotoUsuario" />
        </div>
      </div>
    </section>

    <!-- Seção Profissional -->
    <section>
      <div class="divider">
        <span>Sobre Profissional</span>
      </div>

      <div class="grid-form">
        <div class="input-card">
          <label for="prof-nome">Nome:</label>
          <input id="prof-nome" type="text" v-model="agendamento.profissional.nome" />
        </div>

        <div class="input-card">
          <label for="prof-tel">Telefone:</label>
          <input id="prof-tel" type="text" v-model="agendamento.profissional.telefone" />
        </div>

        <div class="input-card full-width">
          <label for="prof-email">E-mail:</label>
          <input id="prof-email" type="email" v-model="agendamento.profissional.email" />
        </div>

        <div class="input-card full-width">
          <label for="prof-foto">Foto de Perfil:</label>
          <input
            id="prof-foto"
            type="file"
            accept="image/*"
            @change="aoSelecionarFotoProfissional"
          />
        </div>
      </div>
    </section>

    <!-- SEÇÃO SOBRE A CONSULTA -->
    <section>
      <div class="divider">
        <span>Sobre a consulta</span>
      </div>

      <div class="grid-form">
        <div class="input-card">
          <label for="data">Data:</label>
          <input id="data" type="date" v-model="agendamento.consulta.data" />
        </div>

        <div class="input-card">
          <label for="horario">Horário:</label>
          <input id="horario" type="time" v-model="agendamento.consulta.horario" />
        </div>

        <div class="input-card full-width">
          <label for="tipo">Tipo de agendamento:</label>
          <select id="tipo" v-model="agendamento.consulta.tipo">
            <option value="Presencial">Presencial</option>
            <option value="Online (EAD)">Online (EAD)</option>
          </select>
        </div>
      </div>
    </section>
    <button @click="agendar" class="btn-agendar">Agendar Consulta</button>
  </main>
</template>

<style scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #73441b;
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 24px;
}

/*Divisor de linha*/
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 16px 0;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1.5px solid #536236;
}
.divider span {
  padding: 0 12px;
  color: #6b7c4f;
  font-size: 0.95rem;
}

/* Grid layout de 2 colunas */
.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
/* Faz o e-mail / select ocuparem a linha inteira */
.full-width {
  grid-column: span 2;
}

.input-card {
  display: flex;
  align-items: center;
  background-color: #cbba9c;
  border: 1px solid #9c8a6f;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.25);
}
.input-card label {
  color: #536236;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
}
.input-card input,
.input-card select {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #333f34;
  font-size: 1rem;
  font-weight: bold;
}
.input-card select {
  cursor: pointer;
}
.input-card select option {
  background-color: #cbba9c;
  color: #4b5a32;
  padding: 10px;
}

/*imagem do usúrio e profissional*/
.input-card input[type='file'] {
  font-size: 0.85rem;
  color: #333f34;
}
.input-card input[type='file']::file-selector-button {
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
.input-card input[type='file']::file-selector-button:hover {
  background-color: #6b7c4f;
}

.btn-agendar {
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
</style>