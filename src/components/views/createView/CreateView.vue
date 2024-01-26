<script setup lang="ts">
import { computed, reactive } from 'vue';
import { store } from '../../../store/store';
import { router } from '../../router/router';
// import BaseInput from '../../form/BaseInput.vue'
import useVueLidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import ProductForm from '../../form/ProductForm.vue';

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(5) },
    description: { required, minLength: minLength(10) },
    price: { required, minLength: minLength(1) },
    rating: { required },
    discountPercentage: { required },
    stock: { required },
    brand: { required },
    category: { required },
    thumbnail: { required, minLength: minLength(10) },
  };
});

const formData = reactive({
  title: '',
  description: '',
  price: '',
  rating: '',
  discountPercentage: '',
  stock: '',
  brand: '',
  category: '',
  thumbnail: '',
});

const v$ = useVueLidate(rules, formData);

const mainTilte = 'Create a new product';

const uniqueId = Math.floor(
  Math.random() * Math.floor(Math.random() * Date.now()),
);

const handleSubmit = async () => {
  const result = await v$.value.$validate();

  if (result) {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: uniqueId,
        title: formData.title,
        description: formData.description,
        price: +formData.price,
        rating: +formData.rating,
        discountPercentage: +formData.discountPercentage,
        stock: formData.stock,
        brand: formData.brand,
        category: formData.category,
        thumbnail: formData.thumbnail,
        images: [],
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((error) => console.log(`Sth wrong with add product ${error}`));

    const newItem = {
      id: uniqueId,
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      rating: +formData.rating,
      discountPercentage: +formData.discountPercentage,
      stock: formData.stock,
      brand: formData.brand,
      category: formData.category,
      thumbnail: formData.thumbnail,
      images: [],
    };

    store.commit('create', newItem);

    router.push({ name: 'home' });
  }
};
</script>

<template>
  <ProductForm
    :emplyData="formData"
    :handleSubmit="handleSubmit"
    :mainTilte="mainTilte"
  />
</template>

<style scoped></style>
