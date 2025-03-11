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
      if (!product.name || !product.price || !imageFile) {
        console.warn("⚠️ Missing product data!");
        return Promise.reject("Missing product details");
      }

      try {
        this.loading = true;
        console.log("🔄 Uploading product:", product.name);

        // Ensure localStorage is available
        const userPhone = typeof window !== "undefined" ? localStorage.getItem("currentUserPhone") : null;
        if (!userPhone) {
          console.error("❌ User not logged in!");
          return Promise.reject("User not logged in");
        }

        // ✅ Ensure userPhone is included
        product.ownerPhone = userPhone;

        // ✅ Ensure product price is correctly formatted
        product.price = parseFloat(product.price);
        if (isNaN(product.price) || product.price <= 0) {
          console.error("❌ Invalid product price:", product.price);
          return Promise.reject("Invalid product price");
        }

        // ✅ Debug: Print final product data
        console.log("📝 Final product data:", product);

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("image", imageFile);
        formData.append("ownerPhone", userPhone); // ✅ Ensure this is included

        const response = await axios.post(`${apiBaseUrl}/api/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

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

        // Ensure localStorage is available
        const userPhone = typeof window !== "undefined" ? localStorage.getItem("currentUserPhone") : null;
        if (!userPhone) {
          console.warn("⚠️ User phone number missing!");
          return;
        }

        console.log("🔄 Fetching products for:", userPhone);

        // Send user phone number as a query parameter
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
  },
});
