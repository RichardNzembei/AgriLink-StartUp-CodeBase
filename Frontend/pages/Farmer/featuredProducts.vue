<template>
  <div class="p-4 sm:p-6 bg-white min-h-screen">
    <NuxtLink to="/Farmer/dashboard" class="inline-block mb-4 sm:mb-6">
      <div class="flex items-center text-green-700 hover:text-green-800 transition-colors duration-300">
        <UIcon name="i-heroicons-arrow-left-solid" class="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float" />
        <span class="text-sm sm:text-base font-semibold">Back to Dashboard</span>
      </div>
    </NuxtLink>
    <section class="p-4 sm:p-6 bg-gray-50">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-bold text-gray-800">Featured Products</h2>

      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <UCard v-for="(product, index) in productStore.products" :key="index"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div class="relative w-full h-48 sm:h-56 md:h-48 lg:h-56">
            <img :src="product.imageUrl" alt="Product Image" class="w-full h-full object-cover" />

          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
            <div class="flex items-center text-sm text-gray-600 mb-2">
              <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 mr-2 text-green-600" />
              <span>{{ product.price }} KSH per {{ product.unit }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 mb-4">
              <UIcon name="i-heroicons-scale" class="w-4 h-4 mr-2 text-green-600" />
              <span>{{ product.supplyAmount }} {{ product.unit }}s available</span>
            </div>


          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
.UCard:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>