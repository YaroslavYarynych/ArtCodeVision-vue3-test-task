<script setup lang="ts">
import { router } from '../../router/router';
import { store } from '../../../store/store';
import Button from '../../button/Button.vue';
import Modal from '../../modal/Modal.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import ProductForm from '../../form/ProductForm.vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useRoute } from 'vue-router';
import { Card } from '../../utils/types';

const { params } = useRoute();

const fetchOneProduct = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${params.id}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error fetching product details data: ${error}`);
  }
};

const dataFromServer = ref<Card | null>(null);
let discountPrice = 0;

const formData = reactive({
  title: dataFromServer.value?.title || 'Error',
  description: dataFromServer.value?.description || 'Error',
  price: dataFromServer.value?.price.toString() || '0',
  rating: dataFromServer.value?.rating.toString() || '0',
  discountPercentage:
    dataFromServer.value?.discountPercentage.toString() || '0',
  stock: dataFromServer.value?.stock.toString() || '0',
  brand: dataFromServer.value?.brand || 'Error',
  category: dataFromServer.value?.category || 'Error',
  thumbnail: dataFromServer.value?.thumbnail || 'Error',
});

onMounted(async () => {
  const setDataFromServer = (data: any) => {
    dataFromServer.value = data;
    discountPrice = Math.round(
      +data?.price - (+data.price * +data.discountPercentage) / 100,
    );

    formData.title = data.title;
    formData.description = data.description;
    formData.price = data.price;
    formData.discountPercentage = data.discountPercentage;
    formData.rating = data.rating;
    formData.stock = data.stock;
    formData.brand = data.brand;
    formData.category = data.category;
    formData.thumbnail = data.thumbnail;
  };

  if (store.state.array.length > 0) {
    setDataFromServer(
      store.state.array.find((item) => +item.id === +params.id) || null,
    );
  } else {
    const data = await fetchOneProduct();
    setDataFromServer(data);
  }
});

const handleDelete = () => {
  fetch(`https://dummyjson.com/products/${params.id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(console.log);

  store.commit('delete', +params.id);

  router.push({ name: 'home' });
};

const modalActive = ref(false);

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

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();

  console.log(result, formData);

  if (result) {
    fetch(`https://dummyjson.com/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((error) => console.log(`Sth wrong with add product ${error}`));

    const updatedItem = {
      id: +params.id,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      rating: formData.rating,
      discountPercentage: formData.discountPercentage,
      stock: formData.stock,
      brand: formData.brand,
      category: formData.category,
      thumbnail: formData.thumbnail,
      images: [],
    };

    console.log(updatedItem);

    store.commit('update', updatedItem);

    router.push({ name: 'home' });
  }
};
</script>

<template>
  <div class="product-details-container">
    <div v-if="dataFromServer">
      <h1 class="product__title">{{ dataFromServer?.title }}</h1>
      <div class="product-container">
        <div class="images-container">
          <img :src="dataFromServer?.thumbnail" alt="" class="image" />
        </div>
        <div class="desc-container description">
          <div class="description__text">{{ dataFromServer?.description }}</div>
          <div class="tech-charachters">
            <div class="tech-charachters__text">Brand:</div>
            <div class="tech-charachters__value">
              {{ dataFromServer?.brand }}
            </div>
          </div>
          <div class="tech-charachters">
            <div class="tech-charachters__text">Stock:</div>
            <div class="tech-charachters__value">
              {{ dataFromServer?.stock }}
            </div>
          </div>
          <div class="tech-charachters">
            <div class="tech-charachters__text">Rating:</div>
            <div class="tech-charachters__value">
              {{ dataFromServer?.rating }}
            </div>
          </div>
          <div class="description__price price">
            <p class="price__full">{{ `${discountPrice}$` }}</p>
            <p class="price__discount">{{ `${dataFromServer?.price}$` }}</p>
          </div>

          <div class="product__separator" />
          <div class="button-container">
            <Button type="button" class="add__button" text="Add to cart" />
            <Button type="button" class="fav__button" text="" />
          </div>
        </div>
      </div>

      <div class="buttons">
        <button type="button" class="update" @click="toggleModal">
          Update
        </button>
        <button type="button" class="delete" @click="handleDelete">
          Delete
        </button>
      </div>
    </div>
    <div v-else>Product is loading...</div>
  </div>

  <Modal v-if="dataFromServer" :modalActive="modalActive">
    <div class="modal-content">
      <ProductForm
        :emplyData="formData"
        mainTilte="Update Product"
        @close="toggleModal"
        :handleSubmit="handleSubmit"
      />
    </div>
  </Modal>
</template>

<style scoped>
.modal-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(20, 20, 20, 0.9);
  border: 1px solid #000;
}

.product-details-container {
  max-width: 1024px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.product__title {
  margin-bottom: 50px;
  font-size: 30px;
}
.product-container {
  gap: 50px;
}

.desc-container {
  font-size: 20px;
  padding: 0 20px;
}

.images-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.image {
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  object-fit: cover;
}
.description__text {
  line-height: 30px;
  text-align: justify;
  margin-bottom: 20px;
}
.description__price {
  display: flex;
  gap: 10px;
  font-size: 30px;
  font-weight: 600;
  align-items: end;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.price__discount {
  text-decoration: line-through;
  text-decoration-color: gray;
  color: gray;
  font-size: 22px;
}

.product__separator::after {
  display: block;
  content: '';
  height: 1px;
  background: gray;
  border-radius: 1px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.tech-charachters {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  font-size: 18px;
}

.tech-charachters__value {
  font-weight: 700;
}

.buttons {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.delete,
.update {
  background-color: rgb(255, 165, 0, 0.5);
  color: #000;
  padding: 10px 70px;
  border-radius: 20px;
  transition: all 0.4s;
}
.delete:hover,
.update:hover {
  color: #fff;
  background-color: rgb(255, 165, 0, 1);
}
@media (min-width: 768px) {
  .product-container {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  .buttons {
    flex-direction: row;
  }

  .image {
    max-width: 400px;
    height: 300px;
  }

  .images-container {
    margin-bottom: 0;
  }
  .product__title {
    font-size: 50px;
  }
}
</style>
