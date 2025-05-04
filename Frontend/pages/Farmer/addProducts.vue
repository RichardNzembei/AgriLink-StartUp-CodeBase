<template>
  <div class="p-4 sm:p-6 bg-white min-h-screen">
    <NuxtLink to="/Farmer/dashboard" class="inline-block mb-4 sm:mb-6">
      <div class="flex items-center text-green-700 hover:text-green-800 transition-colors duration-300">
        <UIcon name="i-heroicons-arrow-left-solid" class="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float" />
        <span class="text-sm sm:text-base font-semibold">Back to Dashboard</span>
      </div>
    </NuxtLink>
    <section class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Add a Product</h1>
      <form @submit.prevent="submitProduct" class="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div>
          <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <UInput v-model="product.name" type="text" id="product-name" placeholder="Enter product name" required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            :style="{ backgroundColor: 'white', color: 'black' }" />
        </div>

        <div>
          <label for="product-price" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <UInput v-model="product.price" type="text" id="product-price" placeholder="Enter price" required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            :style="{ backgroundColor: 'white', color: 'black' }" />
        </div>
        <div>
          <label for="product-unit" class="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <select v-model="product.unit" id="product-unit"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 transition-all">
            <option value="" disabled selected>Select a unit</option>
            <option value="piece">Per Piece</option>
            <option value="kg">Per Kg</option>
            <option value="carton">Per Carton</option>
          </select>
        </div>
        <div>
          <label for="supply-amount" class="block text-sm font-medium text-gray-700 mb-1">Amount to Supply</label>
          <UInput v-model="product.supplyAmount" type="number" id="supply-amount" placeholder="Enter amount" required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            :style="{ backgroundColor: 'white', color: 'black' }" />
        </div>
        <div>
          <label for="product-category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select v-model="product.category" id="product-category"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 transition-all">
            <option value="" disabled selected>Select a category</option>
            <option value="cereals_grains">Cereals & Grains</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="legumes_pulses">Legumes & Pulses</option>
            <option value="tubers_root_crops">Tubers & Root Crops</option>
            <option value="oilseeds_nuts">Oilseeds & Nuts</option>
            <option value="spices_herbs">Spices & Herbs</option>
            <option value="dairy_animal_products">Dairy & Animal Products</option>
            <option value="livestock_poultry">Livestock & Poultry</option>
            <option value="cash_crops">Cash Crops</option>
            <option value="carton">Carton</option>
          </select>
        </div>

        <div>
          <label for="product-image" class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input type="file" id="product-image" @change="handleImageUpload" accept="image/*"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 transition-all" />
          <img v-if="imagePreview" :src="imagePreview" alt="Image preview"
            class="mt-4 w-32 h-32 object-cover rounded-lg shadow-sm" />
        </div>

        <button type="submit"
          class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
          :disabled="loading">
          {{ loading ? "Uploading..." : "Upload Product" }}
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">{{ errorMessage }}</p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();
const product = ref({ name: "", price: "", unit: "", supplyAmount: "", category: "" });
const imageFile = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const errorMessage = ref("");

const handleImageUpload = (event) => {
  if (!event || !event.target || !event.target.files) {
    console.error("File input event is undefined or invalid.");
    return;
  }

  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitProduct = async () => {
  if (
    !product.value.name ||
    !product.value.price ||
    !product.value.unit ||
    !product.value.supplyAmount ||
    !product.value.category ||
    !imageFile.value
  ) {
    errorMessage.value = "Please fill all fields and select an image!";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await productStore.uploadProduct(product.value, imageFile.value);
    product.value = { name: "", price: "", unit: "", supplyAmount: "", category: "" };
    imageFile.value = null;
    imagePreview.value = null;
  } catch (error) {
    errorMessage.value = "Failed to upload product. Please try again.";
    console.error("Upload error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input,
select {
  outline: none;
}

img {
  transition: opacity 0.3s ease;
}
</style>