<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function verPerfil(tipo) {
  if (tipo === 'profissional') {
    pessoaSelecionada.value = {
      titulo: 'Perfil do Profissional',
      nome: agendamento.value.profissional.nome || 'Não informado',
      telefone: agendamento.value.profissional.telefone || 'Não informado',
      email: agendamento.value.profissional.email || 'Não informado',
      foto: agendamento.value.profissional.foto
    }
  } else {
    pessoaSelecionada.value = {
      titulo: 'Perfil do Paciente',
      nome: agendamento.value.usuario.nome || 'Não informado',
      telefone: agendamento.value.usuario.telefone || 'Não informado',
      email: agendamento.value.usuario.email || 'Não informado',
      foto: agendamento.value.usuario.foto
    }
  }
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
}
</script>

<template>
  
    <h1>Buscar Pratos</h1>

    <div class="person-card">
          <img
            :src="agendamento.usuario.foto || 'https://via.placeholder.com/150'"
            alt="Usuário"
            class="avatar"
          />
          <div class="info">
            <h2>
              {{ agendamento.usuario.nome || 'Nome Usuário' }}
            </h2>

            <p>
              <strong>Telefone:</strong>
              {{ agendamento.usuario.telefone }}
            </p>

            <button class="bnt-perfil" @click="verPerfil('paciente')">Ver Perfil</button>
          </div>
          </div>
    
</template> 