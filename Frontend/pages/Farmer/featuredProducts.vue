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
              Your Featured Products
            </h1>
            <p style="font-size: 1.125rem; color: #d1fae5; margin-bottom: 1.5rem;">
              Showcase your <strong style="color: white;">farm's produce</strong> to the AgriLink community.
            </p>
            <UButton 
              size="lg"
              @click="addProduct"
              style="background-color: white; color: #166534; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;"
              class="hover:-translate-y-1 hover:shadow-md"
            >
              Add New Product
              <UIcon name="i-heroicons-plus" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
            </UButton>
          </div>
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);"></div>
        </section>

        <!-- Products Section -->
        <section style="max-width: 100%; margin: 0 auto; animation: fade-in 0.5s ease-out;">
   

          <!-- Filter and Search -->
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; background-color: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <UInput 
              v-model="searchQuery" 
              placeholder="Search products..." 
              style="flex: 1; min-width: 200px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
              class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
            />
            <select 
              v-model="filterCategory" 
              style="min-width: 150px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: white; color: #1f2937; font-size: 0.875rem; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
              class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
            >
              <option value="">All Categories</option>
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

          <!-- Product Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
            <UCard 
              v-for="(product, index) in filteredProducts" 
              :key="index"
              style="background-color: white; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; transition: transform 0.3s ease;"
              class="hover:transform hover:-translate-y-1"
            >
              <div style="position: relative; width: 100%; height: 12rem;">
                <img 
                  :src="product.imageUrl || '/default-product.jpg'" 
                  alt="Product Image" 
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
              </div>
              <div style="padding: 1rem;">
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #1a3c34; margin-bottom: 0.5rem;">{{ product.name }}</h3>
                <div style="display: flex; align-items: center; font-size: 0.875rem; color: #4b5563; margin-bottom: 0.5rem;">
                  <UIcon name="i-heroicons-currency-dollar" style="width: 1rem; height: 1rem; color: #22c55e; margin-right: 0.5rem;" />
                  <span>{{ product.price }} KSH per {{ product.unit }}</span>
                </div>
                <div style="display: flex; align-items: center; font-size: 0.875rem; color: #4b5563; margin-bottom: 0.5rem;">
                  <UIcon name="i-heroicons-scale" style="width: 1rem; height: 1rem; color: #22c55e; margin-right: 0.5rem;" />
                  <span>{{ product.supplyAmount }} {{ product.unit }}s available</span>
                </div>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                  <UButton 
                    size="sm"
                    @click="editProduct(product.id)"
                    style="flex: 1; background-color: #22c55e; color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.5rem; transition: all 0.3s ease;"
                    class="hover:bg-[#16a34a] hover:-translate-y-0.5"
                  >
                    Edit
                  </UButton>
                  <UButton 
                    size="sm"
                    @click="deleteProduct(product.id)"
                    style="flex: 1; background-color: #dc2626; color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.5rem; transition: all 0.3s ease;"
                    class="hover:bg-[#b91c1c] hover:-translate-y-0.5"
                  >
                    Delete
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
          <p v-if="!filteredProducts.length" style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem;">No products found.</p>
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
const searchQuery = ref("");
const filterCategory = ref("");
const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const isMobile = ref(false);

onMounted(() => {
  productStore.fetchProducts();
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

const filteredProducts = computed(() => {
  let products = productStore.products;
  if (searchQuery.value) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  if (filterCategory.value) {
    products = products.filter(product => 
      product.category === filterCategory.value
    );
  }
  return products;
});

const addProduct = () => {
  router.push('/farmer/addproducts');
};

const editProduct = (productId) => {
  router.push(`/products/edit/${productId}`);
};

const deleteProduct = async (productId) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productStore.deleteProduct(productId);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
};

useHead({
  title: 'AgriLink - Featured Products',
  meta: [
    { 
      name: 'description', 
      content: 'View and manage your featured products on AgriLink.' 
    },
    { 
      property: 'og:title', 
      content: 'Featured Products | AgriLink Africa' 
    },
    { 
      property: 'og:description', 
      content: 'Explore and manage your farm products listed on AgriLink.' 
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