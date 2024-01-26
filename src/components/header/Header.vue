<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header__logo">
      <img src="/logo.svg" alt="Logo" class="logo" srcset="" />
    </RouterLink>

    <RouterLink to="/create" class="header__link">Create</RouterLink>
  </header>
</template>

<style scoped>
.header {
  max-width: 100%;
  padding: 15px;
  height: 100px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
}

.header__link {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 18px;
  text-align: center;
  height: 50px;
  margin-top: 10px;
  padding: 0 15px;
  text-transform: uppercase;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid orange;
  transition: all 0.4s;
}

.logo {
  height: 100%;
  display: none;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.header__link:hover {
  background-color: orange;
  color: #fff;
}

@media (min-width: 768px) {
  .header {
    padding: 15px 120px;
  }

  .logo {
    display: block;
  }
}
</style>
