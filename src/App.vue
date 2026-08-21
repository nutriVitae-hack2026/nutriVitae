<script setup>
import Header from './components/headerComponent.vue'
import Footer from './components/footerComponent.vue'
</script>

<template>
  <Header />
  <main class="page-shell">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
