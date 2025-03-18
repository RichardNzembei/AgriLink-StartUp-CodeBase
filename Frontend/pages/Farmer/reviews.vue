<template>
  <div class=" mx-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
    <NuxtLink to="/Farmer/dashboard" class="inline-block mb-4 sm:mb-6">
      <div class="flex items-center text-green-700 hover:text-green-800 transition-colors duration-300">
        <UIcon name="i-heroicons-arrow-left-solid" class="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float" />
        <span class="text-sm sm:text-base font-semibold">Back to Dashboard</span>
      </div>
    </NuxtLink>
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 animate-fade-in">
      <div class="flex justify-center mb-8">
        <button @click="activeTab = 'products'" :class="[
          'px-6 py-2 rounded-l-lg text-sm sm:text-base font-semibold transition-colors duration-300',
          activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]">
          <i class="fas fa-box mr-2"></i> Product Reviews
        </button>
        <button @click="activeTab = 'sellers'" :class="[
          'px-6 py-2 rounded-r-lg text-sm sm:text-base font-semibold transition-colors duration-300',
          activeTab === 'sellers' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]">
          <i class="fas fa-user-circle mr-2"></i> Seller Reviews
        </button>
      </div>

      <!-- Product Reviews Section -->
      <div v-if="activeTab === 'products'">
        <h2 class="text-lg sm:text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <i class="fas fa-star text-yellow-400"></i> My Product Reviews
        </h2>

        <div v-if="loading" class="text-center text-gray-500 animate-pulse">
          <i class="fas fa-spinner fa-spin"></i> Loading your products...
        </div>
        <div v-if="productStore.error" class="text-red-500 text-center">{{ productStore.error }}</div>

        <div v-for="product in filteredProducts" :key="product.id"
          class="bg-white shadow-md p-4 rounded-lg mb-4 transition-transform hover:scale-105">
          <h3 class="text-xl text-black font-semibold flex items-center gap-2">
            <i class="fas fa-box text-blue-500"></i> {{ product.name }}
          </h3>

          <div v-if="product.reviews?.length">
            <ul class="mt-2 space-y-3">
              <li v-for="review in product.reviews" :key="review.userPhone"
                class="border p-4 rounded-lg bg-gray-50 shadow-sm flex flex-col gap-2">
                <p class="text-gray-700 font-medium flex items-center gap-2">
                  <i class="fas fa-user text-green-500"></i> {{ review.userPhone }}
                </p>
                <p class="text-gray-600 italic">"{{ review.comment }}"</p>
                <p class="text-xs text-gray-500 flex items-center gap-1">
                  <i class="fas fa-clock"></i> {{ formatDate(review.createdAt) }}
                </p>
              </li>
            </ul>
          </div>

          <p v-else class="text-gray-500 flex items-center gap-1">
            <i class="fas fa-info-circle"></i> No reviews yet. !
          </p>
        </div>
      </div>

      <!-- Seller Reviews Section -->
      <div v-if="activeTab === 'sellers'">
        <h2 class="text-lg sm:text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <i class="fas fa-star text-yellow-400"></i> My Overal Reviews
        </h2>

        <div v-if="sellerStore.loading" class="text-center text-gray-500 animate-pulse">
          <i class="fas fa-spinner fa-spin"></i> Loading your Overal profile...
        </div>
        <div v-if="sellerStore.error" class="text-red-500 text-center">{{ sellerStore.error }}</div>

        <div v-for="seller in filteredSellers" :key="seller.sellerPhone"
          class="bg-white shadow-md p-4 rounded-lg mb-4 transition-transform hover:scale-105">


          <div v-if="seller.reviews?.length">
            <ul class="mt-2 space-y-3">
              <li v-for="review in seller.reviews" :key="review.userPhone"
                class="border p-4 rounded-lg bg-gray-50 shadow-sm flex flex-col gap-2">
                <p class="text-gray-700 font-medium flex items-center gap-2">
                  <i class="fas fa-user text-green-500"></i> {{ review.userPhone }}
                </p>
                <p class="text-gray-600 italic">"{{ review.comment }}"</p>
                <p class="text-xs text-gray-500 flex items-center gap-1">
                  <i class="fas fa-clock"></i> {{ formatDate(review.createdAt) }}
                </p>
              </li>
            </ul>
          </div>

          <p v-else class="text-gray-500 flex items-center gap-1">
            <i class="fas fa-info-circle"></i> No reviews yet. Your customers will share their feedback soon!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "~/store/useProductStore";
import { useSellerStore } from "~/store/useSellerStore";
import { useUserStore } from "~/store/userStore";

const productStore = useProductStore();
const sellerStore = useSellerStore();
const userStore = useUserStore();
const products = ref([]);
const loading = ref(false);
const activeTab = ref("products"); // Default to product reviews

onMounted(async () => {
  loading.value = true;
  try {
    const fetchedProducts = await productStore.getAllProducts();
    products.value = fetchedProducts.map((product) => ({
      ...product,
      name: product.name ?? "Unnamed Product",
      category: product.category ?? "Uncategorized",
      ownerPhone: product.ownerPhone ?? "Unknown Seller",
    }));
    console.log("Normalized Products:", products.value);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
  sellerStore.fetchSellers();
});

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown date";
  try {
    if (typeof timestamp === "object" && ("_seconds" in timestamp || "seconds" in timestamp)) {
      return new Date((timestamp._seconds || timestamp.seconds) * 1000).toLocaleString();
    }
    if (timestamp instanceof Date) return timestamp.toLocaleString();
    if (typeof timestamp === "string") {
      const parsedDate = new Date(timestamp);
      return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleString();
    }
  } catch (error) {
    console.error("Error formatting date:", error, "Received timestamp:", timestamp);
  }
  return "Invalid Date";
};
const filteredProducts = computed(() => {
  if (!userStore.userPhone) return [];
  return products.value.filter(product => product.ownerPhone === userStore.userPhone);
});
const filteredSellers = computed(() => {
  if (!userStore.userPhone) return [];
  return sellerStore.sellers.filter(seller => seller.sellerPhone === userStore.userPhone);
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

@media (min-width: 640px) {
  .text-2xl {
    font-size: 1.875rem;
  }

  .text-3xl {
    font-size: 2.25rem;
  }
}
</style>