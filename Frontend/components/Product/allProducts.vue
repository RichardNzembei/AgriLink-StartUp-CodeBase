<template>
  <section class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Available Products</h2>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center">
      <p class="text-gray-500 text-lg">Loading products...</p>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg p-4 shadow-md bg-white transform transition duration-300 hover:scale-105"
      >
        <!-- Product Image -->
        <img
          :src="product.imageUrl"
          alt="Product Image"
          class="w-full h-40 object-cover rounded-t-lg"
        />

        <!-- Product Details -->
        <div class="p-3">
          <h3 class="font-bold text-lg text-gray-800">{{ product.name }}</h3>
          <p class="text-gray-700">Price: <span class="font-semibold">{{ product.price }}</span> per {{ product.unit }}</p>
          <p class="text-gray-700">Supply: <span class="font-semibold">{{ product.supplyAmount }}</span> {{ product.unit }}s</p>
          <p class="text-gray-600">Seller: <span class="text-blue-600 font-medium">{{ product.ownerPhone }}</span></p>
        </div>

        <!-- Contact Buttons -->
        <div class="flex justify-between items-center mt-4">
          <a
            :href="'tel:' + product.ownerPhone"
            class="flex items-center bg-blue-500 text-white px-3 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            <i class="fas fa-phone-alt mr-2"></i> Call
          </a>
          <a
            :href="'https://wa.me/' + product.ownerPhone"
            target="_blank"
            class="flex items-center bg-green-500 text-white px-3 py-2 rounded shadow hover:bg-green-600 transition"
          >
            <i class="fab fa-whatsapp mr-2"></i> WhatsApp
          </a>
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
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    products.value = await productStore.getAllProducts();
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
/* Add FontAwesome icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
