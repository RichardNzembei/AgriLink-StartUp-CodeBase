<template>
    <section class="p-4">
      <h2 class="text-xl font-bold mb-4">Available Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="product in products" :key="product.id" class="border rounded-lg p-4 shadow-md">
          <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover rounded">
          <h3 class="font-bold mt-2">{{ product.name }}</h3>
          <p class="text-gray-700">Price: {{ product.price }} / {{ product.unit }}</p>
          <p class="text-gray-600">Seller: {{ product.farmerName }}</p>
  
          <!-- Contact Farmer -->
          <div class="mt-2">
            <a :href="'tel:' + product.farmerPhone" class="bg-blue-500 text-white px-3 py-1 rounded mr-2">Call</a>
            <a :href="'https://wa.me/' + product.farmerPhone" target="_blank" class="bg-green-500 text-white px-3 py-1 rounded">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useProductStore } from "~/store/useProductStore";
  
  const productStore = useProductStore();
  const products = ref([]);
  
  onMounted(async () => {
    products.value = await productStore.getAllProducts(); // Fetch all products
  });
  </script>
  