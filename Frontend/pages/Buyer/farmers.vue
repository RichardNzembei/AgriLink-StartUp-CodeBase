<template>
  <div class="p-4 sm:p-6 bg-gray-50 min-h-screen">
    <NuxtLink to="/Buyer/dashboard" class="inline-block mb-4 sm:mb-6">
      <div class="flex items-center text-green-700 hover:text-green-800 transition-colors duration-300">
        <UIcon name="i-heroicons-arrow-left-solid" class="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float" />
        <span class="text-sm sm:text-base font-semibold">Back to Dashboard</span>
      </div>
    </NuxtLink>
    <transition name="fade">
      <div v-if="Farmers.length">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Active Farmers</h1>
        <div v-for="farmer in Farmers" :key="farmer.id" class="mb-6 sm:mb-8">
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center mb-4">
              <UIcon name="i-heroicons-user-circle-solid" class="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-green-600" />
              <div>
                <p class="text-base sm:text-lg font-semibold text-gray-800">
                  {{ toTitleCase(farmer.first_name) }} {{ toTitleCase(farmer.last_name) }}
                </p>
                <button
                  @click="openModal(farmer.phone)"
                  class="text-sm text-green-600 hover:text-green-700 underline"
                >
                  {{ farmer.phone }}
                </button>
              </div>
            </div>
            <div v-if="getFarmerProducts(farmer.phone).length">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-for="product in getFarmerProducts(farmer.phone)"
                  :key="product.id"
                  class="bg-white p-4 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p class="text-sm font-semibold text-green-800 flex items-center">
                    <UIcon name="i-heroicons-shopping-bag-solid" class="w-4 h-4 mr-2 text-green-600" />
                    {{ toTitleCase(product.name) }}
                  </p>

                  <p class="text-xs text-gray-600 mt-2 flex items-center">
                    <UIcon name="i-heroicons-currency-dollar-solid" class="w-4 h-4 mr-2 text-green-600" />
                    Price: Ksh {{ product.price }} per {{ product.unit }}
                  </p>

                  <p class="text-xs text-gray-600 mt-2 flex items-center">
                    <UIcon name="i-heroicons-scale-solid" class="w-4 h-4 mr-2 text-green-600" />
                    Quantity: {{ product.supplyAmount }} {{ product.unit }}s
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 text-sm flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-100">
              <UIcon name="i-heroicons-exclamation-circle-solid" class="w-5 h-5 mr-2 text-green-600" />
              <span>No products posted by this farmer.</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center">No active farmers found.</p>
    </transition>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Contact Farmer</h2>
        <p class="text-sm text-gray-600 mb-6">Choose an option to contact {{ selectedPhone }}:</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="callFarmer(selectedPhone)"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Call
          </button>
          <button
            @click="whatsappFarmer(selectedPhone)"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            WhatsApp
          </button>
        </div>
        <button
          @click="closeModal"
          class="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";
import { useProductStore } from "~/store/useProductStore";

const products = ref([]);
const productStore = useProductStore();
const userStore = useUserStore();
const isModalOpen = ref(false);
const selectedPhone = ref("");
onMounted(async () => {
  await userStore.fetchUsers();
  try {
    products.value = await productStore.getAllProducts();
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }
});
const Farmers = computed(() => userStore.users.filter((user) => user.role === "farmer"));
const getFarmerProducts = (phone) => {
  return products.value.filter((product) => product.ownerPhone === phone);
};
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const formatWhatsApp = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    return `+254${cleaned.slice(1)}`;
  } else if (!cleaned.startsWith("+")) {
    return `+254${cleaned}`;
  }
  return cleaned;
};
const openModal = (phone) => {
  selectedPhone.value = phone;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
const callFarmer = (phone) => {
  window.location.href = `tel:${phone}`;
};
const whatsappFarmer = (phone) => {
  const formattedPhone = formatWhatsApp(phone);
  window.open(`https://wa.me/${formattedPhone}`, "_blank");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>