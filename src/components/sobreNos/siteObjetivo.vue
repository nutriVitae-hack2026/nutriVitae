<template>
  <section class="funcionabilidade">
    <h2>Nosso objetivo</h2>

    <div class="conteudo">
      <img src="/img/logo.png" alt="logo" />
      <p>
        A NutriVitae tem como objetivo facilitar o acesso à saúde e à alimentação de qualidade,
        conectando pacientes a nutricionistas de forma simples, rápida e segura. Nossa plataforma
        foi desenvolvida para ajudar cada paciente a encontrar um profissional adequado às suas
        necessidades, permitindo pesquisar e conhecer nutricionistas de maneira prática. Queremos
        tornar a busca por acompanhamento nutricional mais acessível e contribuir para que mais
        pessoas encontrem o suporte necessário para cuidar da sua saúde e melhorar sua qualidade de
        vida.
      </p>
    </div>
  </section>
</template>

<style scoped>

.funcionabilidade {
  padding: 45px clamp(20px, 6vw, 80px);
  text-align: center;
  color: #f1edd2;
  background:
    linear-gradient(135deg, rgba(137, 162, 91, 0.2), transparent 45%),
    #536236;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.45);
}

.funcionabilidade h2 {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 400;
  margin: 0 0 25px;
}

.conteudo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 4vw, 45px);
  max-width: 800px;
  margin: 0 auto;
}

.conteudo img {
  width: clamp(70px, 10vw, 110px);
  height: clamp(70px, 10vw, 110px);
  border-radius: 50%;
  background: #f1edd2;
  padding: 8px;
  flex-shrink: 0;
}

.conteudo p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
  text-align: left;
}

@media (max-width: 700px) {
  .conteudo {
    flex-direction: column;
    text-align: center;
  }

  .conteudo p {
    text-align: center;
  }
}
</style>