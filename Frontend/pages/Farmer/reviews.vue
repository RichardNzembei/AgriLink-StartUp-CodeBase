<template>
  <div style="min-height: 100vh; background-color: #f9fafb; font-family: 'Poppins', sans-serif; position: relative;">
    <!-- Mobile Menu Toggle -->
    <button 
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-[100] bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:bg-green-500 hover:scale-105"
    >
      <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
    </button>

    <div style="display: flex; min-height: 100vh;">
      <!-- Sidebar -->
      <AppFarmerNavbar />

      <!-- Main Content -->
      <main 
        :style="{ 'margin-left': isMobile && !isSidebarOpen ? '0' : '280px', 'padding': '2rem 1.5rem', 'transition': 'all 0.3s ease', 'flex': '1' }"
        :class="{ 'md:ml-[280px]': !isMobile || isSidebarOpen }"
      >
        <!-- Hero Section -->
        <section style="background: linear-gradient(to right, #22c55e, #16a34a); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
          <div style="position: relative; z-index: 10; width: 100%; max-width: 800px; text-align: center;">
            <h1 style="font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
              Your Reviews
            </h1>
            <p style="font-size: 1.125rem; color: #d1fae5; margin-bottom: 1.5rem;">
              See what customers are saying about your <strong style="color: white;">products</strong> and <strong style="color: white;">seller profile</strong>.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
              <UButton 
                size="lg"
                :class="{ 'bg-white text-[#166534]': activeTab === 'products', 'bg-transparent border-2 border-[rgba(255,255,255,0.3)] text-white': activeTab !== 'products' }"
                style="font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; transition: all 0.3s ease;"
                class="hover:-translate-y-1 hover:shadow-md"
                @click="activeTab = 'products'"
              >
                Product Reviews
                <UIcon name="i-heroicons-box" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
              </UButton>
              <UButton 
                size="lg"
                :class="{ 'bg-white text-[#166534]': activeTab === 'sellers', 'bg-transparent border-2 border-[rgba(255,255,255,0.3)] text-white': activeTab !== 'sellers' }"
                style="font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; transition: all 0.3s ease;"
                class="hover:-translate-y-1 hover:shadow-md"
                @click="activeTab = 'sellers'"
              >
                Seller Reviews
                <UIcon name="i-heroicons-user" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
              </UButton>
            </div>
          </div>
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);"></div>
        </section>

        <!-- Reviews Content -->
        <section style="max-width: 100%; margin: 0 auto; animation: fade-in 0.5s ease-out;">
       

          <!-- Filter and Sort -->
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; background-color: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <UInput 
              v-model="searchQuery" 
              placeholder="Search reviews..." 
              style="flex: 1; min-width: 200px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
              class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
            />
            <select 
              v-model="sortOrder" 
              style="min-width: 150px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
              class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <!-- Product Reviews Section -->
          <div v-if="activeTab === 'products'">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #1a3c34; margin-bottom: 1.5rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <UIcon name="i-heroicons-star" style="width: 1.5rem; height: 1.5rem; color: #facc15;" />
              My Product Reviews
            </h2>
            <div v-if="loading" style="text-align: center; color: #6b7280; font-size: 1rem; animation: pulse 1.5s infinite;">
              <UIcon name="i-heroicons-arrow-path" style="width: 1.5rem; height: 1.5rem; display: inline-block; margin-right: 0.5rem;" />
              Loading products...
            </div>
            <div v-else-if="productStore.error" style="color: #dc2626; font-size: 0.875rem; text-align: center; margin-top: 1rem;">
              {{ productStore.error }}
            </div>
            <div v-else-if="!filteredProducts.length" style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem;">
              No product reviews found.
            </div>
            <div v-else v-for="product in filteredProducts" :key="product.id"
                 style="background-color: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin-bottom: 1.5rem; transition: transform 0.3s ease;"
                 class="hover:transform hover:scale-[1.02]">
              <h3 style="font-size: 1.25rem; font-weight: 600; color: #1a3c34; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <UIcon name="i-heroicons-box" style="width: 1.25rem; height: 1.25rem; color: #3b82f6;" />
                {{ product.name }}
              </h3>
              <div v-if="product.reviews?.length">
                <ul style="display: grid; gap: 1rem;">
                  <li v-for="review in sortedReviews(product.reviews)" :key="review.userPhone"
                      style="background-color: #f9fafb; padding: 1rem; border-radius: 0.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                      <p style="font-size: 0.875rem; font-weight: 500; color: #1a3c34; display: flex; align-items: center; gap: 0.5rem;">
                        <UIcon name="i-heroicons-user" style="width: 1rem; height: 1rem; color: #22c55e;" />
                        {{ review.userPhone }}
                      </p>
                      <p style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem;">
                        <UIcon name="i-heroicons-clock" style="width: 1rem; height: 1rem;" />
                        {{ formatDate(review.createdAt) }}
                      </p>
                    </div>
                    <p style="font-size: 0.875rem; color: #4b5563; font-style: italic; margin-bottom: 0.5rem;">
                      "{{ review.comment }}"
                    </p>
                    <UButton 
                      size="sm"
                      @click="respondToReview(review.userPhone, product.id)"
                      style="background-color: transparent; border: 1px solid #d1d5db; color: #1a3c34; font-weight: 600; border-radius: 0.5rem; padding: 0.5rem 1rem; transition: all 0.3s ease;"
                      class="hover:bg-[#f9fafb]"
                    >
                      Respond
                    </UButton>
                  </li>
                </ul>
              </div>
              <p v-else style="font-size: 0.875rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem;">
                <UIcon name="i-heroicons-information-circle" style="width: 1rem; height: 1rem;" />
                No reviews yet for this product.
              </p>
            </div>
          </div>

          <!-- Seller Reviews Section -->
          <div v-if="activeTab === 'sellers'">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #1a3c34; margin-bottom: 1.5rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <UIcon name="i-heroicons-star" style="width: 1.5rem; height: 1.5rem; color: #facc15;" />
              My Seller Reviews
            </h2>
            <div v-if="sellerStore.loading" style="text-align: center; color: #6b7280; font-size: 1rem; animation: pulse 1.5s infinite;">
              <UIcon name="i-heroicons-arrow-path" style="width: 1.5rem; height: 1.5rem; display: inline-block; margin-right: 0.5rem;" />
              Loading seller profile...
            </div>
            <div v-else-if="sellerStore.error" style="color: #dc2626; font-size: 0.875rem; text-align: center; margin-top: 1rem;">
              {{ sellerStore.error }}
            </div>
            <div v-else-if="!filteredSellers.length" style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem;">
              No seller reviews found.
            </div>
            <div v-else v-for="seller in filteredSellers" :key="seller.sellerPhone"
                 style="background-color: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin-bottom: 1.5rem; transition: transform 0.3s ease;"
                 class="hover:transform hover:scale-[1.02]">
              <h3 style="font-size: 1.25rem; font-weight: 600; color: #1a3c34; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <UIcon name="i-heroicons-user-circle" style="width: 1.25rem; height: 1.25rem; color: #3b82f6;" />
                Seller Profile
              </h3>
              <div v-if="seller.reviews?.length">
                <ul style="display: grid; gap: 1rem;">
                  <li v-for="review in sortedReviews(seller.reviews)" :key="review.userPhone"
                      style="background-color: #f9fafb; padding: 1rem; border-radius: 0.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                      <p style="font-size: 0.875rem; font-weight: 500; color: #1a3c34; display: flex; align-items: center; gap: 0.5rem;">
                        <UIcon name="i-heroicons-user" style="width: 1rem; height: 1rem; color: #22c55e;" />
                        {{ review.userPhone }}
                      </p>
                      <p style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem;">
                        <UIcon name="i-heroicons-clock" style="width: 1rem; height: 1rem;" />
                        {{ formatDate(review.createdAt) }}
                      </p>
                    </div>
                    <p style="font-size: 0.875rem; color: #4b5563; font-style: italic; margin-bottom: 0.5rem;">
                      "{{ review.comment }}"
                    </p>
                    <UButton 
                      size="sm"
                      @click="respondToReview(review.userPhone, null)"
                      style="background-color: transparent; border: 1px solid #d1d5db; color: #1a3c34; font-weight: 600; border-radius: 0.5rem; padding: 0.5rem 1rem; transition: all 0.3s ease;"
                      class="hover:bg-[#f9fafb]"
                    >
                      Respond
                    </UButton>
                  </li>
                </ul>
              </div>
              <p v-else style="font-size: 0.875rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem;">
                <UIcon name="i-heroicons-information-circle" style="width: 1rem; height: 1rem;" />
                No reviews yet for your seller profile.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useProductStore } from "~/store/useProductStore";
import { useSellerStore } from "~/store/useSellerStore";
import { useUserStore } from "~/store/userStore";
import { onClickOutside } from '@vueuse/core';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const sellerStore = useSellerStore();
const userStore = useUserStore();
const router = useRouter();
const activeTab = ref("products");
const searchQuery = ref("");
const sortOrder = ref("newest");
const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const isMobile = ref(false);

onMounted(() => {
  userStore.fetchUsers();
  productStore.fetchProducts();
  sellerStore.fetchSellers();
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onClickOutside(sidebarRef, () => {
  if (isMobile.value && isSidebarOpen.value) {
    isSidebarOpen.value = false;
  }
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
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    console.error("Error formatting date:", error, "Received timestamp:", timestamp);
    return "Invalid Date";
  }
};

const filteredProducts = computed(() => {
  if (!userStore.user?.phone) return [];
  let products = productStore.products.filter(product => product.ownerPhone === userStore.user.phone);
  if (searchQuery.value) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.reviews.some(review => review.comment.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
  return products;
});

const filteredSellers = computed(() => {
  if (!userStore.user?.phone) return [];
  let sellers = sellerStore.sellers.filter(seller => seller.sellerPhone === userStore.user.phone);
  if (searchQuery.value) {
    sellers = sellers.filter(seller => 
      seller.reviews.some(review => review.comment.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
  return sellers;
});

const sortedReviews = (reviews) => {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.createdAt instanceof Object ? (a.createdAt._seconds || a.createdAt.seconds) * 1000 : a.createdAt);
    const dateB = new Date(b.createdAt instanceof Object ? (b.createdAt._seconds || b.createdAt.seconds) * 1000 : b.createdAt);
    return sortOrder.value === "newest" ? dateB - dateA : dateA - dateB;
  });
};

const respondToReview = (userPhone, productId) => {
  // Navigate to a review response page or open a modal (implementation depends on app structure)
  router.push(`/reviews/respond?userPhone=${userPhone}&productId=${productId || ''}`);
};

useHead({
  title: 'AgriLink - Reviews',
  meta: [
    { 
      name: 'description', 
      content: 'View and manage customer reviews for your products and seller profile on AgriLink.' 
    },
    { 
      property: 'og:title', 
      content: 'Reviews | AgriLink Africa' 
    },
    { 
      property: 'og:description', 
      content: 'See what customers are saying about your farm products and seller profile.' 
    },
  ],
});
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>