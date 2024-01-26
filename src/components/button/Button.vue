<script setup lang="ts">
const props = defineProps<{
  class: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
}>();
</script>

<template>
  <button :type="props.type" :class="props.class">
    <template v-if="props.class === 'fav__button'">
      <font-awesome-icon :icon="['fas', 'heart']" style="color: #ffffff" />
    </template>
    <template v-else>
      {{ props.text }}
    </template>
  </button>
</template>

<style scoped>
.submit-btn {
  margin-top: 10px;
  font-size: 20px;
  width: 100%;
  max-width: 220px;
  padding: 20px 10px;
  border-radius: 40px;
  background-color: #fff;
  color: rgb(0, 0, 0);
  transition: all 0.4s;
  border: 1px solid orange;
}

.submit-btn:hover {
  background-color: orange;
  color: #fff;
}

.add__button {
  width: 70%;
  border-radius: 40px;
  background-color: rgba(255, 165, 0, 0.3);
  color: #000;
  transition: all 0.4s;
}

.add__button:hover {
  background-color: rgba(255, 165, 0, 1);
  color: #fff;
}

.fav__button:focus,
button:focus-visible {
  outline: 2px auto rgb(0, 0, 0);
}

.add__button:focus,
button:focus-visible {
  outline: 2px auto rgb(0, 0, 0);
}

.fav__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 165, 0, 0.3);
  transition: all 0.4s;
}

.fav__button:hover {
  background-color: rgba(255, 165, 0, 1);
}

@media (min-width: 768px) {
}
</style>
