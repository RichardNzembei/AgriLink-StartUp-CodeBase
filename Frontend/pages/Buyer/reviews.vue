<template>
  <AppBuyerNavbar />
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
    <div class="max-w-4xl mx-auto bg-white  shadow-lg rounded-lg p-6 animate-fade-in">
      <h2 class="text-lg font-bold text-gray-800  mb-6 text-center flex items-center justify-center gap-2">
        <i class="fas fa-star text-yellow-400"></i> Seller Reviews
      </h2>

      <!-- Loading State -->
      <div v-if="sellerStore.loading" class="text-center text-gray-500 dark:text-gray-400 animate-pulse">
        <i class="fas fa-spinner fa-spin text-xl"></i> Loading sellers...
      </div>

      <!-- Error Message -->
      <div v-if="sellerStore.error" class="text-red-500 text-center font-medium bg-red-100 dark:bg-red-900 p-3 rounded-lg">
        {{ sellerStore.error }}
      </div>

      <!-- Sellers List -->
      <div v-for="seller in sellerStore.sellers" :key="seller.sellerPhone"
        class="bg-gray-50 dark:bg-gray-700 shadow-md p-5 rounded-lg mb-5 transition-transform hover:scale-[1.03]">

        <h3 class="text-lg text-gray-900 dark:text-white font-semibold flex items-center gap-2">
          <i class="fas fa-user-circle text-blue-500"></i> Seller: {{ seller.sellerPhone }}
        </h3>

        <!-- Reviews Section -->
        <div v-if="seller.reviews?.length">
          <ul class="mt-4 space-y-3">
            <li v-for="review in seller.reviews" :key="review.userPhone"
              class="border border-gray-300 dark:border-gray-600 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-3 transition-all hover:shadow-lg">

              <p class="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                <i class="fas fa-user text-green-500"></i> {{ review.userPhone }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 italic">"{{ review.comment }}"</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="fas fa-clock"></i> {{ formatDate(review.createdAt) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- No Reviews Message -->
        <p v-else class="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-3">
          <i class="fas fa-info-circle"></i> No reviews yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSellerStore } from "~/store/useSellerStore";

const sellerStore = useSellerStore();

onMounted(() => {
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

/* Responsive & Dark Mode Enhancements */
.container {
  max-width: 100%;
}

.dark-mode {
  background-color: #1a202c;
  color: #e2e8f0;
}

</style>
