<template>
  <section class="p-6 bg-gray-50 min-h-screen">
    <div class="mb-6">
      <input v-model="searchQuery" type="text" placeholder="Search products by name, category,..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50 text-black" />
    </div>
    <div class="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 pb-2 mb-6">
      <button v-for="category in categories" :key="category.value" @click="setCategoryFilter(category.value)" :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex-shrink-0',
        category.value === selectedCategory
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]">
        {{ category.label }}
      </button>
    </div>
    <div v-if="loading" class="flex justify-center items-center">
      <p class="text-gray-500 text-lg">Loading products...</p>
    </div>

    <div v-else>
      <div v-if="filteredProducts.length === 0" class="text-center text-gray-500">
        <UIcon name="i-heroicons-exclamation-circle" class="w-8 h-8 mx-auto text-gray-400" />
        <p class="mt-2">No products found.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id"
          class="border rounded-lg shadow-md bg-white transition duration-300 hover:shadow-lg overflow-hidden">
          <div class="w-full h-48 sm:h-56 md:h-48 lg:h-56">
            <img :src="product.imageUrl" alt="Product Image" class="w-full h-full object-cover" />

          </div>

          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h3>

            <div class="flex items-center text-sm text-gray-600 mb-2">
              <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 mr-2 text-green-600" />
              <span>{{ product.price }} KSH per {{ product.unit }}</span>
            </div>

            <div class="flex items-center text-sm text-gray-600 mb-4">
              <UIcon name="i-heroicons-scale" class="w-4 h-4 mr-2 text-green-600" />
              <span>{{ product.supplyAmount }} {{ product.unit }}s available</span>
            </div>

            <div class="flex items-center text-sm text-gray-600 mb-4">
              <UIcon name="i-heroicons-user-circle" class="w-4 h-4 mr-2 text-green-600" />
              <span class="text-blue-600 font-medium">{{ product.ownerPhone }}</span>
            </div>
            <button @click="openModal(product)"
              class="w-full flex items-center justify-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
              <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-2" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal">
      <div
        class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 transform transition-all duration-300 ease-out"
        :class="{ 'scale-95 opacity-0': !selectedProduct, 'scale-100 opacity-100': selectedProduct }">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">{{ selectedProduct.name }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition-colors duration-300">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>
        <img :src="selectedProduct.imageUrl" alt="Product Image"
          class="w-full h-48 object-cover rounded-lg mb-4 shadow-sm" />

        <div class="space-y-4">
          <div class="flex items-center text-sm text-gray-700">
            <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 mr-2 text-green-600" />
            <span>Price: <span class="font-semibold">{{ selectedProduct.price }}</span> per {{ selectedProduct.unit
              }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <UIcon name="i-heroicons-scale" class="w-4 h-4 mr-2 text-green-600" />
            <span>Supply: <span class="font-semibold">{{ selectedProduct.supplyAmount }}</span> {{ selectedProduct.unit
              }}s</span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <UIcon name="i-heroicons-user-circle" class="w-4 h-4 mr-2 text-green-600" />
            <span>Seller: <span class="text-blue-600 font-medium">{{ selectedProduct.ownerPhone }}</span></span>
          </div>

          <div class="flex justify-between items-center mt-6">
            <a :href="'tel:' + formatPhone(selectedProduct.ownerPhone)"
              class="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600 transition-colors duration-300">
              <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            </a>
            <a :href="'https://wa.me/' + formatWhatsApp(selectedProduct.ownerPhone)" target="_blank"
              class="flex items-center justify-center bg-green-500 text-white p-3 rounded-full shadow hover:bg-green-600 transition-colors duration-300">
              <UIcon name="i-heroicons-chat-bubble-oval-left" class="w-5 h-5" />
            </a>
          </div>
          <div class="mt-6 border-t pt-4">
            <h4 class="text-md font-semibold text-gray-800 mb-3">Product Reviews</h4>
            <div v-if="(selectedProduct.reviews ?? []).length > 0" class="space-y-3">
              <div v-for="(review, index) in (selectedProduct.reviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <p v-else class="text-gray-500 text-sm">No reviews yet.</p>
            <input v-model="newProductReviews[selectedProduct.id]" type="text" placeholder="Write a review..."
              class="w-full p-2 mt-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" />
            <button @click="addProductReview(selectedProduct.id)"
              class="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              <span v-if="!loadingButtons[selectedProduct.id]">Submit Review</span>
              <UIcon v-else name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin mx-auto" />
            </button>
          </div>

          <div class="mt-6 border-t pt-4">
            <h4 class="text-md font-semibold text-gray-800 mb-3">Seller Reviews</h4>
            <div v-if="(selectedProduct.sellerReviews ?? []).length > 0" class="space-y-3">
              <div v-for="(review, index) in (selectedProduct.sellerReviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <p v-else class="text-gray-500 text-sm">No reviews yet.</p>
            <input v-model="newSellerReviews[selectedProduct.ownerPhone]" type="text" placeholder="Write a review..."
              class="w-full p-2 mt-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" />
            <button @click="addSellerReview(selectedProduct.ownerPhone)"
              class="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              <span v-if="!loadingButtons[selectedProduct.ownerPhone]">Submit Review</span>
              <UIcon v-else name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();
const products = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("All");
const categories = ref([
  { label: "All", value: "All" },
  { label: "Cereals & Grains", value: "cereals_grains" },
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Legumes & Pulses", value: "legumes_pulses" },
  { label: "Tubers & Root Crops", value: "tubers_root_crops" },
  { label: "Oilseeds & Nuts", value: "oilseeds_nuts" },
  { label: "Spices & Herbs", value: "spices_herbs" },
  { label: "Dairy & Animal Products", value: "dairy_animal_products" },
  { label: "Livestock & Poultry", value: "livestock_poultry" },
  { label: "Cash Crops", value: "cash_crops" },
  { label: "Carton", value: "carton" },
]);

const loadingButtons = ref({});
const newProductReviews = ref({});
const newSellerReviews = ref({});
const selectedProduct = ref(null);
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
});
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      (product.name?.toLowerCase() ?? "").includes(searchQuery.value.toLowerCase()) ||
      (product.category?.toLowerCase() ?? "").includes(searchQuery.value.toLowerCase()) ||
      (product.ownerPhone?.toLowerCase() ?? "").includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === "All" || product.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});
const setCategoryFilter = (category) => {
  selectedCategory.value = category;
};

const openModal = (product) => {
  selectedProduct.value = product;
};

const closeModal = () => {
  selectedProduct.value = null;
};

const formatPhone = (phone) => (phone.startsWith("0") ? "+254" + phone.slice(1) : phone);
const formatWhatsApp = (phone) => (phone.startsWith("0") ? "+254" + phone.slice(1) : phone);

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

.hover\:shadow-lg:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.transform {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.scale-95 {
  transform: scale(0.95);
  opacity: 0;
}

.scale-100 {
  transform: scale(1);
  opacity: 1;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>