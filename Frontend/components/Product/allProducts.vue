<template>
  <section class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-xl sm:text-md font-bold mb-6 text-center text-gray-800">Available Products</h2>

    <div v-if="loading" class="flex justify-center items-center">
      <p class="text-gray-500 text-lg">Loading products...</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id"
        class="border rounded-lg p-4 shadow-md bg-white transition duration-300 hover:shadow-lg">
        <img :src="product.imageUrl" alt="Product Image" class="w-full h-40 object-cover rounded-t-lg" />

        <div class="p-3">
          <h3 class="font-bold text-lg text-gray-800">{{ product.name }}</h3>
          <p class="text-gray-700 text-sm">Price: <span class="font-semibold">{{ product.price }}</span> per {{ product.unit }}</p>
          <p class="text-gray-700 text-sm">Supply: <span class="font-semibold">{{ product.supplyAmount }}</span> {{ product.unit }}s</p>
        </div>

        <button @click="openModal(product)"
          class="mt-2 bg-gray-200 w-full py-2 rounded hover:bg-gray-300 transition flex items-center justify-center">
          <i class="fas fa-eye mr-2"></i> View More
        </button>
      </div>
    </div>

    <!-- Modal (Only visible when a product is selected) -->
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button @click="selectedProduct = null" class="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          <i class="fas fa-times text-xl"></i>
        </button>

        <img :src="selectedProduct.imageUrl" alt="Product Image" class="w-full h-48 object-cover rounded" />
        <h3 class="font-bold text-lg text-gray-800 mt-3">{{ selectedProduct.name }}</h3>
        <p class="text-gray-700 text-sm">Price: <span class="font-semibold">{{ selectedProduct.price }}</span> per {{ selectedProduct.unit }}</p>
        <p class="text-gray-700 text-sm">Supply: <span class="font-semibold">{{ selectedProduct.supplyAmount }}</span> {{ selectedProduct.unit }}s</p>
        <p class="text-gray-600 text-sm">Seller: <span class="text-blue-600 font-medium">{{ selectedProduct.ownerPhone }}</span></p>

        <div class="mt-4 flex gap-4">
          <a :href="'tel:' + formatPhone(selectedProduct.ownerPhone)"
            class="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition">
            <i class="fas fa-phone-alt"></i>
          </a>
          <a :href="'https://wa.me/' + formatWhatsApp(selectedProduct.ownerPhone)" target="_blank"
            class="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition">
            <i class="fab fa-whatsapp"></i>
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
const loadingButtons = ref({});
const newProductReviews = ref({});
const newSellerReviews = ref({});
const expandedProducts = ref([]);
const selectedProduct = ref(null);

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
const openModal = (product) => {
  selectedProduct.value = product;
};
const toggleDetails = (productId) => {
  if (expandedProducts.value.includes(productId)) {
    expandedProducts.value = expandedProducts.value.filter(id => id !== productId);
  } else {
    expandedProducts.value.push(productId);
  }
};
const formatPhone = (phone) => phone.startsWith("0") ? "+254" + phone.slice(1) : phone;
const formatWhatsApp = (phone) => phone.startsWith("0") ? "+254" + phone.slice(1) : phone;

const addProductReview = async (productId) => {
  const reviewText = newProductReviews.value[productId];
  if (!reviewText) return;

  loadingButtons.value[productId] = true;

  const userPhone = typeof window !== "undefined" ? localStorage.getItem("currentUserPhone") : null;
  if (!userPhone) {
    console.error("❌ User not logged in!");
    loadingButtons.value[productId] = false;
    return;
  }

  try {
    await productStore.addProductReview(productId, userPhone, reviewText);
    newProductReviews.value[productId] = "";
  } catch (error) {
    console.error("❌ Error adding product review:", error);
  } finally {
    loadingButtons.value[productId] = false;
  }
};

const addSellerReview = async (sellerPhone) => {
  const reviewText = newSellerReviews.value[sellerPhone];
  if (!reviewText) return;

  loadingButtons.value[sellerPhone] = true;

  const userPhone = typeof window !== "undefined" ? localStorage.getItem("currentUserPhone") : null;
  if (!userPhone) {
    console.error("❌ User not logged in!");
    loadingButtons.value[sellerPhone] = false;
    return;
  }

  try {
    await productStore.addSellerReview(sellerPhone, userPhone, reviewText);
    newSellerReviews.value[sellerPhone] = "";
  } catch (error) {
    console.error("❌ Error adding seller review:", error);
    alert("Failed to add seller review. Please try again.");
  } finally {
    loadingButtons.value[sellerPhone] = false;
  }
};

</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .text-sm {
    font-size: 0.75rem;
  }
}
</style>