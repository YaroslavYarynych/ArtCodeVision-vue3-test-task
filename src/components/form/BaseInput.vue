<script setup lang="">
const props = defineProps([
  'placeholder',
  'label',
  'modelValue',
  'errors',
  'class',
]);
</script>
<template>
  <label :class="props.class">{{ props.label }}</label>
  <input
    :value="props.modelValue"
    :placeholder="props.placeholder"
    @input="$emit('update:modelValue', $event.target?.value)"
  />
  <span v-for="error in props.errors" :key="error.$uid" class="error-message">{{
    `${error.$message}, please add a ${props.label}`
  }}</span>
</template>

<style scoped>
input {
  width: 80%;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid orange;
  font-size: 18px;
}

input::placeholder {
  font-size: 20px;
}

.error-message {
  display: block;
  color: red;
  margin-left: 10px;
}

input:focus::placeholder {
  color: #000;
}

input:focus {
  border: 2px solid black;
}

.create-label {
  font-size: 22px;
  margin-left: 8px;
}

.modal-label {
  color: #fff;
}
</style>
