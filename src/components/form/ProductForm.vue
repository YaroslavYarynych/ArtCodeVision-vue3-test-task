<script setup lang="ts">
import { computed, reactive } from 'vue';
import useVueLidate from '@vuelidate/core';
import { required, minLength, helpers, numeric } from '@vuelidate/validators';
import Button from '../button/Button.vue';
import BaseInput from '../form/BaseInput.vue';

const props = defineProps<{
  handleSubmit: () => void;
  emplyData: {
    title: string;
    description: string;
    price: string;
    rating: string;
    discountPercentage: string;
    stock: string;
    brand: string;
    category: string;
    thumbnail: string;
  };
  mainTilte: string;
}>();

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(5) },
    description: { required, minLength: minLength(10) },
    price: { required, numeric, minLength: minLength(1) },
    rating: { required, numeric },
    discountPercentage: { required, numeric },
    stock: { required, numeric },
    brand: { required },
    category: { required },
    thumbnail: {
      required,
      minLength: minLength(10),
      rfc: helpers.regex(/(http[s]*:\/\/)/i),
    },
  };
});
const originalData = { ...props.emplyData };

let formData = reactive(props.emplyData);

const v$ = useVueLidate(rules, formData);

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
  Object.assign(formData, originalData);
};
</script>

<template>
  <div class="create-container">
    <div
      :class="props.mainTilte === 'Update Product' && 'update-header-container'"
    >
      <h1
        :class="
          props.mainTilte === 'Update Product' ? 'update-title' : 'create-title'
        "
      >
        {{ props.mainTilte }}
      </h1>
      <font-awesome-icon
        v-if="props.mainTilte === 'Update Product'"
        :icon="['fas', 'xmark']"
        class="icon"
        @click="close"
      />
    </div>

    <form @submit.prevent="handleSubmit" method="post">
      <div class="input-container">
        <div class="column">
          <BaseInput
            v-model="formData.title"
            placeholder="Write title..."
            :errors="v$.title.$errors"
            label="Title"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />
          <BaseInput
            v-model="formData.description"
            placeholder="Write description..."
            :errors="v$.description.$errors"
            label="Description"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />
          <BaseInput
            v-model="formData.price"
            placeholder="Add a price..."
            :errors="v$.price.$errors"
            label="Price"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />
          <BaseInput
            v-model="formData.discountPercentage"
            placeholder="Add a Discount %"
            :errors="v$.discountPercentage.$errors"
            label="Discount %"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />
        </div>
        <div class="column second-column">
          <BaseInput
            v-model="formData.rating"
            placeholder="Add rating"
            :errors="v$.rating.$errors"
            label="Rating"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />

          <BaseInput
            v-model="formData.stock"
            placeholder="Add stock..."
            :errors="v$.stock.$errors"
            label="Stock"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />

          <BaseInput
            v-model="formData.brand"
            placeholder="Add brand..."
            :errors="v$.brand.$errors"
            label="Brand"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />

          <BaseInput
            v-model="formData.category"
            placeholder="Add category..."
            :errors="v$.category.$errors"
            label="Category"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />

          <BaseInput
            v-model="formData.thumbnail"
            placeholder="Add image..."
            :errors="v$.thumbnail.$errors"
            label="Image"
            :class="
              mainTilte === 'Update Product' ? 'modal-label' : 'create-label'
            "
          />
        </div>
      </div>
      <div :class="props.mainTilte === 'Update Product' && 'btn-container'">
        <button
          class="close-update-btn"
          v-if="props.mainTilte === 'Update Product'"
          @click="close"
          type="button"
        >
          Close
        </button>

        <Button type="submit" class="submit-btn" :text="props.mainTilte" />
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 15px;
}

.update-title {
  color: #fff;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  flex: 1;
}
.create-label {
  font-size: 22px;
  margin-left: 8px;
}

.input-container {
  width: 100%;
}

form input {
  width: 80%;
  padding: 13px;
  border-radius: 20px;
  border: 2px solid orange;
}

.create-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 20px auto;
}

.create-title {
  font-size: 30px;
  margin: 0 auto;
}

.update-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
}

.icon {
  color: #fff;
  height: 50px;
  cursor: pointer;
}

.close-update-btn {
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

.close-update-btn:hover {
  background-color: orange;
  color: #fff;
}

.btn-container {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (min-width: 768px) {
  .btn-container {
    flex-direction: row;
  }
  .column {
    display: flex;
    align-items: center;
    margin-top: 0;
  }

  .input-container {
    display: flex;
  }

  .create-title {
    font-size: 50px;
  }

  .column input::placeholder {
    font-size: 18px;
  }

  .column input {
    font-size: 18px;
  }
  form input {
    padding: 20px;
  }
  .update-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 30px;
    width: 82%;
  }
}
</style>
