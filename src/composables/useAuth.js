import { ref, computed } from 'vue'

const usuarioLogado = ref(JSON.parse(localStorage.getItem('usuarioLogado')) || null)

export function useAuth() {
  const carregarUsuario = () => {
    const dados = localStorage.getItem('usuarioLogado')
    usuarioLogado.value = dados ? JSON.parse(dados) : null
  }

  const tipoUsuario = computed(() => usuarioLogado.value?.tipo || null)
  const isPaciente = computed(() => tipoUsuario.value === 'paciente')
  const isProfissional = computed(() => tipoUsuario.value === 'profissional')

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    usuarioLogado.value = null
  }

  return {
    usuarioLogado,
    tipoUsuario,
    isPaciente,
    isProfissional,
    carregarUsuario,
    logout
  }
}