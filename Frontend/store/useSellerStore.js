import { defineStore } from "pinia";
import axios from "axios";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://agrilink-startup-codebase.onrender.com"
    : "http://localhost:5000";

export const useSellerStore = defineStore("sellerStore", {
  state: () => ({
    sellers: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSellers() {
      this.loading = true;
      try {
        const response = await axios.get(`${apiBaseUrl}/api/sellers`);
        this.sellers = response.data;
      } catch (error) {
        console.error("❌ Error fetching sellers:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
