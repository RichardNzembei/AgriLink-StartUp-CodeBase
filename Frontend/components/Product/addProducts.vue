<template>
  <section class="p-4">
    <button @click="toggleForm"
      class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-between w-full transition-all">
      <span>{{ showForm ? "Hide Product Form" : "Add Product" }}</span>
      <svg :class="{ 'rotate-180': showForm }" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <transition name="slide-fade">
      <form v-if="showForm" @submit.prevent="submitProduct"
        class="mt-4 p-4 border rounded-lg shadow-lg bg-white flex flex-col space-y-3">
        <UInput v-model="product.name" type="text" placeholder="Product Name" required
          class="border p-2 rounded focus:ring focus:ring-blue-300"
          :style="{ backgroundColor: 'white', color: 'black' }" />

        <UInput v-model="product.price" type="text" placeholder="Price" required
          class="border p-2 rounded focus:ring focus:ring-blue-300"
          :style="{ backgroundColor: 'white', color: 'black' }" />
        <select v-model="product.unit" class="border p-2 rounded focus:ring focus:ring-blue-300 bg-white text-black">
          <option value="piece">Per Piece</option>
          <option value="kg">Per Kg</option>
          <option value="carton">Per Carton</option>
        </select>

        <UInput v-model="product.supplyAmount" type="number" placeholder="Amount to Supply" required
          class="border p-2 rounded focus:ring focus:ring-blue-300"
          :style="{ backgroundColor: 'white', color: 'black' }" />

        <input type="file" @change="handleImageUpload" accept="image/*"
          class="border p-2 rounded focus:ring focus:ring-blue-300 bg-white text-black" />


        <img v-if="imagePreview" :src="imagePreview" alt="Image preview"
          class="w-32 h-32 object-cover mt-2 rounded shadow-md" />


        <button type="submit" class="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          :disabled="loading">
          {{ loading ? "Uploading..." : "Upload Product" }}
        </button>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </form>
    </transition>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();
const product = ref({ name: "", price: "", unit: "", supplyAmount: "" });
const imageFile = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const errorMessage = ref("");
const showForm = ref(false);

const toggleForm = () => {
  showForm.value = !showForm.value;
};

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
  if (!product.value.name || !product.value.price || !product.value.unit || !product.value.supplyAmount || !imageFile.value) {
    errorMessage.value = "Please fill all fields and select an image!";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await productStore.uploadProduct(product.value, imageFile.value);
    product.value = { name: "", price: "", unit: "", supplyAmount: "" };
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

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
