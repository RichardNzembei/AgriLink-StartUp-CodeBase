<template>
  <AppBuyerNavbar />
  <div class="mt-20 mx-auto bg-gray-50 min-h-screen p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 animate-fade-in">
      <h2 class="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <i class="fas fa-star text-yellow-400"></i> Seller Reviews
      </h2>

      <div v-if="sellerStore.loading" class="text-center text-gray-500 animate-pulse">
        <i class="fas fa-spinner fa-spin"></i> Loading sellers...
      </div>
      <div v-if="sellerStore.error" class="text-red-500 text-center">{{ sellerStore.error }}</div>

      <div v-for="seller in sellerStore.sellers" :key="seller.sellerPhone"
        class="bg-white shadow-md p-4 rounded-lg mb-4 transition-transform hover:scale-105">
        <h3 class="text-xl font-semibold flex items-center gap-2">
          <i class="fas fa-user-circle text-blue-500"></i> Seller: {{ seller.sellerPhone }}
        </h3>

        <div v-if="seller.reviews?.length">
          <ul class="mt-2 space-y-3">
            <li v-for="review in seller.reviews" :key="review.userPhone"
              class="border p-4 rounded-lg bg-gray-100 shadow-sm flex flex-col gap-2">
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
</style>