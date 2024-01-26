<script setup lang="ts">
import { defineProps } from 'vue';
import Button from '../button/Button.vue';
import { Card } from '../utils/types';

const props = defineProps<{
  item: Card;
}>();

const discountPrice = Math.round(
  +props.item.price -
    (+props.item.price * +props.item.discountPercentage) / 100,
);
</script>

<template>
  <div class="container">
    <router-link
      :to="{ name: 'details', params: { id: item.id } }"
      class="link"
    >
      <img
        :src="item.thumbnail"
        alt=""
        @error="($event.target as HTMLImageElement).src = './favicon.png'"
        class="product__image"
      />
    </router-link>
    <router-link
      :to="{ name: 'details', params: { id: item.id } }"
      class="link"
    >
      <h1 class="title">{{ item.title }}</h1>
    </router-link>
    <div class="price">
      <p class="discount_price">
        {{ `${discountPrice}$` }}
      </p>
      <p class="full_price">{{ `${item.price}$` }}</p>
    </div>

    <div class="product__separator" />

    <div class="char-container">
      <p class="brand__title">Brand:</p>
      <div class="product__char">{{ item.brand.slice(0, 20) }}</div>
    </div>
    <div class="char-container">
      <p class="brand__title">Rating:</p>
      <div class="product__char">{{ item.rating }}</div>
    </div>
    <div class="char-container">
      <p class="brand__title">Stock:</p>
      <div class="product__char">{{ item.stock }}</div>
    </div>

    <div class="button-container">
      <Button type="button" class="add__button" text="Add to cart" />
      <Button type="button" class="fav__button" text="" />
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 10px;
  text-align: center;
  width: 280px;
  padding: 20px;
  background-color: rgba(240, 240, 240, 0.3);
  transition: all 0.5s;
  cursor: pointer;
}

.container:hover {
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.5);
}

.title {
  margin-top: 15px;
  font-size: 20px;
  height: 50px;
  color: #000;
  font-weight: 500;
}

.link {
  text-decoration: none;
}
.product__image {
  width: 220px;
  border-radius: 15px;
  height: 140px;
  object-fit: cover;
}

.price {
  display: flex;
  gap: 10px;
  font-weight: bold;
}

.full_price {
  text-decoration: line-through;
  color: gray;
  font-size: 22px;
  line-height: 28px;
}

.discount_price {
  font-size: 22px;
  line-height: 28px;
}

.product__separator::after {
  display: block;
  content: '';
  height: 1px;
  background: gray;
  border-radius: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.char-container {
  display: flex;
  justify-content: space-between;
}
.product__char {
  font-weight: 700;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.fav__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 165, 0, 0.3);
  transition: all 0.4s;
}

.fav__button:hover {
  background-color: rgba(255, 165, 0, 1);
}
</style>
