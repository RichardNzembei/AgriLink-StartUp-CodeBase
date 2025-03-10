<template>
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Featured Products</h2>
        <ULink to="/Farmer/products" class="text-green-500 text-sm">See All</ULink>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <UCard v-for="(product, index) in productStore.products" :key="index" class="text-center">
          <img :src="product.imageUrl" alt="Product Image" class="w-full h-40 object-cover rounded-t-lg" />
          <div class="p-2">
            <h3 class="text-sm font-semibold">{{ product.name }}</h3>
            <p class="text-sm text-gray-500">{{ product.price }}</p>
          </div>
        </UCard>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useProductStore } from "~/store/useProductStore";
  
  const productStore = useProductStore();
  
  onMounted(() => {
    productStore.fetchProducts();
  });
  </script>
  