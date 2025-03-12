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
        <button @click="toggleDetails(product.id)"
          class="mt-2 bg-gray-200 w-full py-2 rounded hover:bg-gray-300 transition flex items-center justify-center">
          <i v-if="expandedProducts.includes(product.id)" class="fas fa-chevron-up"></i>
          <i v-else class="fas fa-chevron-down"></i>
        </button>

        <div v-if="expandedProducts.includes(product.id)" class="mt-4">
          <div class="flex justify-between items-center">
            <a :href="'tel:' + formatPhone(product.ownerPhone)"
              class="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition">
              <i class="fas fa-phone-alt"></i>
            </a>
            <a :href="'https://wa.me/' + formatWhatsApp(product.ownerPhone)" target="_blank"
              class="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>

          <div class="mt-4 border-t pt-2">
            <h4 class="text-md font-semibold text-gray-800 mb-2">Product Reviews</h4>
            <div v-if="(product.reviews ?? []).length > 0" class="space-y-2">
              <div v-for="(review, index) in (product.reviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-100 p-1 rounded text-xs">
                <p class="text-gray-700"><span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <p v-else class="text-gray-500 text-xs">No reviews yet.</p>
            <input v-model="newProductReviews[product.id]" type="text" placeholder="Review this product..."
              class="border rounded w-full p-2 text-xs text-gray-700" />
            <button @click="addProductReview(product.id)"
              class="mt-2 bg-blue-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-blue-600 transition">
              <i v-if="loadingButtons[product.id]" class="fas fa-spinner fa-spin"></i>
              <span v-else>Submit</span>

            </button>
          </div>
          <div class="mt-4 border-t pt-2">
            <h4 class="text-md font-semibold text-gray-800 mb-2">Seller Reviews</h4>
            <div v-if="(product.sellerReviews ?? []).length > 0" class="space-y-2">
              <div v-for="(review, index) in (product.sellerReviews ?? []).slice(0, 2)" :key="index"
                class="bg-gray-100 p-1 rounded text-xs">
                <p class="text-gray-700"><span class="font-semibold">{{ review.userPhone }}:</span> {{ review.comment }}
                </p>
              </div>
            </div>
            <input v-model="newSellerReviews[product.ownerPhone]" type="text" placeholder="Review this seller..."
              class="border rounded w-full p-2 text-xs text-gray-700" />
            <button @click="addSellerReview(product.ownerPhone)"
              class="mt-2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-green-600 transition">
              <i v-if="loadingButtons[product.ownerPhone]" class="fas fa-spinner fa-spin"></i>
              <span v-else>
                Submit</span>
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