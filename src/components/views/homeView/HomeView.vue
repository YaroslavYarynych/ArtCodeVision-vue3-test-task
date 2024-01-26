<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { store } from '../../../store/store';
import ProductCard from '../../productCard/ProductCard.vue';

const searchTerm = ref<string>('');
const sortBy = ref<string>('Default');
const sortOptions = ref<string[]>([
  'Default',
  'Price: High to low',
  'Price: Low to high',
  'A-Z',
  'Z-A',
  'Top rating',
]);
const getData = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
};

onMounted(async () => {
  if (store.state.array.length === 0) {
    const data = await getData();
    store.commit('set', data);
  }
  console.log('mounted');
});

const getFilteredAndSortedData = computed(() => {
  let filteredData = { ...store.state };

  if (searchTerm.value) {
    filteredData.array = filteredData.array.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }

  switch (sortBy.value) {
    case 'Z-A':
      filteredData.array = filteredData.array.sort((a, b) =>
        b.title.localeCompare(a.title),
      );
      break;
    case 'A-Z':
      filteredData.array = filteredData.array.sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      break;
    case 'Price: High to low':
      filteredData.array = filteredData.array.sort((a, b) => b.price - a.price);
      break;

    case 'Price: Low to high':
      filteredData.array = filteredData.array.sort((a, b) => a.price - b.price);
      break;

    case 'Top rating':
      filteredData.array = filteredData.array.sort(
        (a, b) => b.rating - a.rating,
      );
      break;

    default:
      return filteredData.array;
  }

  return filteredData.array;
});
</script>

<template>
  <main>
    <div class="search-container">
      <input v-model="searchTerm" placeholder="Search by name" />
      <div class="sort">
        <p class="sort__text">Sort By</p>
        <select v-model="sortBy" class="select">
          <option
            v-for="(item, y) in sortOptions"
            :key="y"
            :value="item"
            class="options"
            :disabled="item === 'Default'"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="getFilteredAndSortedData.length > 0" class="card-container">
      <div v-for="item in getFilteredAndSortedData">
        <ProductCard :item="item" :key="item.id" />
      </div>
    </div>
    <div v-else>Data is loading...</div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-container {
  display: flex;
  flex-direction: row;
  max-width: 1440px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 20px;
}
.search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  margin-top: 30px;
}

.select {
  width: 200px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  appearance: none;
  height: 40px;
  border: 2px solid orange;
  background-color: transparent !important;
  background-image: none;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right #ddd;
  outline: 0;
  background-position-x: 170px;
}

.options {
  font-size: 20px;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  color: orange;
  background-color: #fff;
  background-image: none;
}

input {
  padding: 5px 10px;
  width: 255px;
  height: 40px;
  border: 2px solid orange;
  border-radius: 10px;
}
input:focus {
  border: 2px solid #000;
}

input:focus::placeholder {
  color: #000;
}

input::placeholder {
  font-size: 16px;
}

.sort {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

@media only screen and (min-width: 768px) {
  .card-container {
    padding: 20px;
  }

  .search-container {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    width: 80%;
    max-width: 1175px;
    justify-content: space-between;
  }

  .select {
    width: 268px;
    padding: 5px 20px;
    font-size: 16px;
    border-radius: 10px;
    height: 40px;
    appearance: none;
    border: 2px solid orange;
    background-color: transparent !important;
    background-image: none;
    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
      no-repeat right #ddd;
    outline: 0;
    background-position-x: 240px;
  }

  input {
    width: 200px;
    height: 40px;
  }

  input::placeholder {
    font-size: 16px;
  }
  .sort__text {
    font-size: 20px;
  }
}
</style>
