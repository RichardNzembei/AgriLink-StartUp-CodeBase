```vue
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
      :style="{
  marginLeft: isMobile && !isSidebarOpen ? '0' : '280px',
  padding: '2rem 1.5rem',
  transition: 'all 0.3s ease',
  flex: '1'
}"
:class="{ 'md:ml-[280px]': !isMobile || isSidebarOpen }"

      >
        <!-- Hero Section -->
        <section style="background: linear-gradient(to right, #22c55e, #16a34a); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
          <div style="position: relative; z-index: 10; width: 100%; max-width: 800px; text-align: center;">
            <h1 style="font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
              Add a New Product
            </h1>
            <p style="font-size: 1.125rem; color: #d1fae5; margin-bottom: 1.5rem;">
              Share your <strong style="color: white;">farm's produce</strong> with the AgriLink community.
            </p>
            <UButton 
              size="lg"
              @click="scrollToForm"
              style="background-color: white; color: #166534; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;"
              class="hover:-translate-y-1 hover:shadow-md"
            >
              Start Adding
              <UIcon name="i-heroicons-plus" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
            </UButton>
          </div>
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);"></div>
        </section>

        <!-- Form Section -->
        <section style="max-width: 800px; margin: 0 auto; animation: fade-in 0.5s ease-out;">

          <form @submit.prevent="submitProduct" style="background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); display: grid; gap: 1.5rem;">
            <div>
              <label for="product-name" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Product Name</label>
              <UInput 
                v-model="product.name" 
                type="text" 
                id="product-name" 
                placeholder="Enter product name" 
                required
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              />
            </div>
            <div>
              <label for="product-price" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Price (KSH)</label>
              <UInput 
                v-model.number="product.price" 
                type="number" 
                id="product-price" 
                placeholder="Enter price" 
                required
                min="0"
                step="0.01"
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              />
            </div>
            <div>
              <label for="product-unit" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Unit</label>
              <select 
                v-model="product.unit" 
                id="product-unit"
                required
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              >
                <option value="" disabled selected>Select a unit</option>
                <option value="piece">Per Piece</option>
                <option value="kg">Per Kg</option>
                <option value="carton">Per Carton</option>
              </select>
            </div>
            <div>
              <label for="supply-amount" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Amount to Supply</label>
              <UInput 
                v-model.number="product.supplyAmount" 
                type="number" 
                id="supply-amount" 
                placeholder="Enter amount" 
                required
                min="1"
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              />
            </div>
            <div>
              <label for="product-category" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Category</label>
              <select 
                v-model="product.category" 
                id="product-category"
                required
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              >
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
              </select>
            </div>
            <div>
              <label for="product-image" style="display: block; font-size: 0.875rem; font-weight: 500; color: #1a3c34; margin-bottom: 0.25rem;">Product Image</label>
              <input 
                type="file" 
                id="product-image" 
                @change="handleImageUpload" 
                accept="image/*"
                required
                style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
                class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
              />
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                alt="Image preview"
                style="margin-top: 1rem; width: 8rem; height: 8rem; object-fit: cover; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: opacity 0.3s ease;"
              />
            </div>
            <UButton 
              type="submit"
              block
              :disabled="loading || !isFormValid"
              style="background-color: #22c55e; color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem; transition: background 0.3s ease, transform 0.3s ease;"
              class="hover:bg-[#16a34a] hover:-translate-y-0.5 disabled:bg-[#9ca3af] disabled:cursor-not-allowed"
            >
              {{ loading ? 'Uploading...' : 'Upload Product' }}
            </UButton>
            <p v-if="errorMessage" style="color: #dc2626; font-size: 0.875rem; text-align: center; margin-top: 1rem;">{{ errorMessage }}</p>
            <p v-if="successMessage" style="color: #22c55e; font-size: 0.875rem; text-align: center; margin-top: 1rem;">{{ successMessage }}</p>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useProductStore } from "~/store/useProductStore";
import { onClickOutside } from '@vueuse/core';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();
const product = ref({ name: "", price: "", unit: "", supplyAmount: "", category: "" });
const imageFile = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const isMobile = ref(false);

const isFormValid = computed(() => 
  product.value.name.trim() &&
  product.value.price > 0 &&
  product.value.unit &&
  product.value.supplyAmount > 0 &&
  product.value.category &&
  imageFile.value
);

const handleImageUpload = (event) => {
  if (!event || !event.target || !event.target.files) {
    errorMessage.value = "Invalid file input.";
    return;
  }

  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      errorMessage.value = "Image size must be less than 5MB.";
      return;
    }
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitProduct = async () => {
  if (!isFormValid.value) {
    errorMessage.value = "Please fill all required fields correctly.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await productStore.uploadProduct(product.value, imageFile.value);
    successMessage.value = "Product uploaded successfully!";
    setTimeout(() => {
      router.push('/Farmer/profile');
    }, 1500);
  } catch (error) {
    errorMessage.value = error.message || "Failed to upload product. Please try again.";
    console.error("Upload error:", error);
  } finally {
    loading.value = false;
  }
};

const scrollToForm = () => {
  window.scrollTo({ top: 600, behavior: 'smooth' });
};

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

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

useHead({
  title: 'AgriLink - Add Product',
  meta: [
    { 
      name: 'description', 
      content: 'Add a new product to your AgriLink profile to share with the farming community.' 
    },
    { 
      property: 'og:title', 
      content: 'Add Product | AgriLink Africa' 
    },
    { 
      property: 'og:description', 
      content: 'Upload your farm products to connect with buyers on AgriLink.' 
    },
  ],
});
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>