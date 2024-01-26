<script setup lang="ts">
const props = defineProps<{
  modalActive: boolean;
}>();
</script>

<template>
  <transition name="modal-animation">
    <div v-show="props.modalActive" class="modal">
      <transition class="modal-animation-inner">
        <div v-show="props.modalActive" class="modal-inner">
          <!-- Modal -->
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.modal-animation {
  border: 1px solid #000;
}
</style>
