<template>
  <section class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-xl sm:text-md font-bold mb-6 text-center text-gray-800">Available Products</h2>

    <div v-if="loading" class="flex justify-center items-center">
      <p class="text-gray-500 text-lg">Loading products...</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id"
        class="border rounded-lg p-4 shadow-md bg-white transition duration-300 hover:shadow-lg">
        <img :src="product.imageUrl" alt="Product Image" class="w-full h-40 object-cover rounded-t-lg" />

        <div class="p-3">
          <h3 class="font-bold text-lg text-gray-800">{{ product.name }}</h3>
          <p class="text-gray-700 text-sm">Price: <span class="font-semibold">{{ product.price }}</span> per {{
            product.unit }}</p>
          <p class="text-gray-700 text-sm">Supply: <span class="font-semibold">{{ product.supplyAmount }}</span> {{
            product.unit }}s</p>
          <p class="text-gray-600 text-sm">Seller: <span class="text-blue-600 font-medium">{{ product.ownerPhone
              }}</span></p>
        </div>
        <button @click="openModal(product)"
          class="mt-2 bg-gray-200 w-full py-2 rounded hover:bg-gray-300 transition flex items-center justify-center">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">{{ selectedProduct.name }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <img :src="selectedProduct.imageUrl" alt="Product Image" class="w-full h-48 object-cover rounded-lg mb-4" />

        <div class="space-y-4">
          <p class="text-gray-700 text-sm">Price: <span class="font-semibold">{{ selectedProduct.price }}</span> per {{
            selectedProduct.unit }}</p>
          <p class="text-gray-700 text-sm">Supply: <span class="font-semibold">{{ selectedProduct.supplyAmount }}</span> {{
            selectedProduct.unit }}s</p>
          <p class="text-gray-600 text-sm">Seller: <span class="text-blue-600 font-medium">{{ selectedProduct.ownerPhone
              }}</span></p>

          <div class="flex justify-between items-center">
            <a :href="'tel:' + formatPhone(selectedProduct.ownerPhone)"
              class="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition">
              <i class="fas fa-phone-alt"></i>
            </a>
            <a :href="'https://wa.me/' + formatWhatsApp(selectedProduct.ownerPhone)" target="_blank"
              class="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>

          <div class="mt-4 border-t pt-2">
            <h4 class="text-md font-semibold text-gray-800 mb-2">Product Reviews</h4>
            <div v-if="(selectedProduct.reviews ?? []).length > 0" class="space-y-2">
              <div v-for="(review, index) in (selectedProduct.reviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-100 p-1 rounded text-xs">
                <p class="text-gray-700"><span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <p v-else class="text-gray-500 text-xs">No reviews yet.</p>
            <input v-model="newProductReviews[selectedProduct.id]" type="text" placeholder="Review this product..."
              class="border rounded w-full p-2 text-xs text-gray-700 bg-white" />
            <button @click="addProductReview(selectedProduct.id)"
              class="mt-2 bg-blue-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-blue-600 transition">
              <i v-if="loadingButtons[selectedProduct.id]" class="fas fa-spinner fa-spin"></i>
              <span v-else>Submit</span>
            </button>
          </div>

          <div class="mt-4 border-t pt-2">
            <h4 class="text-md font-semibold text-gray-800 mb-2">Seller Reviews</h4>
            <div v-if="(selectedProduct.sellerReviews ?? []).length > 0" class="space-y-2">
              <div v-for="(review, index) in (selectedProduct.sellerReviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-100 p-1 rounded text-xs">
                <p class="text-gray-700"><span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <input v-model="newSellerReviews[selectedProduct.ownerPhone]" type="text" placeholder="Review this seller..."
              class="border rounded w-full p-2 text-xs text-gray-700 bg-white" />
            <button @click="addSellerReview(selectedProduct.ownerPhone)"
              class="mt-2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-green-600 transition">
              <i v-if="loadingButtons[selectedProduct.ownerPhone]" class="fas fa-spinner fa-spin"></i>
              <span v-else>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();
const products = ref([]);
const loading = ref(false);
const loadingButtons = ref({});
const newProductReviews = ref({});
const newSellerReviews = ref({});
const expandedProducts = ref([]);
const selectedProduct = ref(null); // Track the selected product for the modal

onMounted(async () => {
  loading.value = true;
  try {
    products.value = await productStore.getAllProducts();
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
});

const toggleDetails = (productId) => {
  if (expandedProducts.value.includes(productId)) {
    expandedProducts.value = expandedProducts.value.filter(id => id !== productId);
  } else {
    expandedProducts.value.push(productId);
  }
};

const openModal = (product) => {
  selectedProduct.value = product; // Set the selected product for the modal
};

const closeModal = () => {
  selectedProduct.value = null; // Clear the selected product to close the modal
};

const formatPhone = (phone) => phone.startsWith("0") ? "+254" + phone.slice(1) : phone;
const formatWhatsApp = (phone) => phone.startsWith("0") ? "+254" + phone.slice(1) : phone;

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
    alert("Failed to add seller review. Please try again.");
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
</style>