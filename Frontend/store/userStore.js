import { defineStore } from "pinia";

const apiBaseUrl = process.env.NODE_ENV === "production"
  ? "https://agrilink-solutions.onrender.com"
  : "http://localhost:5000";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("currentUser")) || null : null,
    users: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users")) || {} : {},
    userPhone: typeof window !== "undefined" ? localStorage.getItem("currentUserPhone") || null : null,
    users: [], 
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => state.user?.role || "farmer",
  },

  actions: {
    async fetchUsers() {
      try {
          const response = await fetch(`${apiBaseUrl}/api/user`);
          if (!response.ok) throw new Error("Failed to fetch users");
  
          const users = await response.json();
          console.log("Fetched farmers:", users); // Debugging log
  
          this.users = users; // Store all users in the state
          console.log("Updated users state:", this.users); // Verify state update
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  },
  
    async fetchUserData(phone) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/user/${phone}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();

        if (typeof window !== "undefined") {
          this.users[phone] = data;
          this.user = data;
          this.userPhone = phone;

          localStorage.setItem("users", JSON.stringify(this.users));
          localStorage.setItem("currentUser", JSON.stringify(data));
          localStorage.setItem("currentUserPhone", phone);
        }

        return data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    async login(phone, password) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();

        if (typeof window !== "undefined") {
          this.users[phone] = data.user;
          this.user = data.user;
          this.userPhone = phone;

          localStorage.setItem("users", JSON.stringify(this.users));
          localStorage.setItem("currentUser", JSON.stringify(data.user));
          localStorage.setItem("currentUserPhone", phone);
        }

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },

    switchUser(phone) {
      if (this.users[phone]) {
        this.user = this.users[phone];
        this.userPhone = phone;

        if (typeof window !== "undefined") {
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          localStorage.setItem("currentUserPhone", phone);
        }
      } else {
        console.error("User not found.");
      }
    },

    logout() {
      this.user = null;
      this.userPhone = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUserPhone");
      }
    },
  },
});
