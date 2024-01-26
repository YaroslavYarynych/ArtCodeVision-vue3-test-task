<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/header/Header.vue';
</script>

<template>
  <div class="container">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
