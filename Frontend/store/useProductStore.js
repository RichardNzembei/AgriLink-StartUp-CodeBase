import { defineStore } from "pinia";
import axios from "axios";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://agrilink-startup-codebase.onrender.com"
    : "http://localhost:5000";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
  }),

  actions: {
    async uploadProduct(product, imageFile) {
      if (
        !product.name ||
        !product.price ||
        !product.unit ||
        !product.supplyAmount ||
        !imageFile
      ) {
        console.warn("⚠️ Missing product data!");
        return Promise.reject("Missing product details");
      }

      try {
        this.loading = true;
        console.log("🔄 Uploading product:", product.name);

        const userPhone =
          typeof window !== "undefined"
            ? localStorage.getItem("currentUserPhone")
            : null;
        if (!userPhone) {
          console.error("❌ User not logged in!");
          return Promise.reject("User not logged in");
        }

        product.ownerPhone = userPhone;
        product.price = parseFloat(product.price);
        if (isNaN(product.price) || product.price <= 0) {
          console.error("❌ Invalid product price:", product.price);
          return Promise.reject("Invalid product price");
        }

        console.log("📝 Final product data:", product);

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("unit", product.unit);
        formData.append("supplyAmount", product.supplyAmount);
        formData.append("image", imageFile);
        formData.append("ownerPhone", userPhone);

        const response = await axios.post(
          `${apiBaseUrl}/api/products`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("✅ Upload success:", response.data);
        this.products.push(response.data.product);
      } catch (error) {
        console.error("❌ Upload failed:", error);
        if (error.response) {
          console.error("🚨 Server response:", error.response.data);
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      try {
        this.loading = true;

        const userPhone =
          typeof window !== "undefined"
            ? localStorage.getItem("currentUserPhone")
            : null;
        if (!userPhone) {
          console.warn("⚠️ User phone number missing!");
          return;
        }

        console.log("🔄 Fetching products for:", userPhone);

        const response = await axios.get(`${apiBaseUrl}/api/products`, {
          params: { ownerPhone: userPhone },
        });

        this.products = response.data;

        console.log("✅ Products retrieved:", this.products.length);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        this.loading = false;
      }
    },

    async getAllProducts() {
      try {
        console.log("🔄 Fetching all products...");
        const response = await axios.get(`${apiBaseUrl}/api/allproducts`);
        console.log("✅ Products retrieved:", response.data.length);
        return response.data;
      } catch (error) {
        console.error("❌ Fetch error:", error);
        return [];
      }
    },

    async addProductReview(productId, userPhone, comment) {
      try {
        const review = { userPhone, comment };
        await axios.post(
          `${apiBaseUrl}/api/products/${productId}/reviews`,
          review
        );

        const product = this.products.find((p) => p.id === productId);
        if (product) {
          product.reviews = product.reviews ?? [];
          product.reviews.push(review);
        }
      } catch (error) {
        console.error("❌ Error adding product review:", error);
        throw error;
      }
    },

    async addSellerReview(sellerPhone, userPhone, comment) {
      try {
        const review = { userPhone, comment };
        await axios.post(
          `${apiBaseUrl}/api/sellers/${sellerPhone}/reviews`,
          review
        );

        // Update local state (optional, for immediate UI update)
        this.products.forEach((product) => {
          if (product.ownerPhone === sellerPhone) {
            product.sellerReviews = product.sellerReviews ?? [];
            product.sellerReviews.push(review);
          }
        });
      } catch (error) {
        console.error("❌ Error adding seller review:", error);
        throw error;
      }
    },
  },
});
