import { defineStore } from "pinia";

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://agrilink-solutions.onrender.com'
  : 'http://localhost:5000';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  actions: {
    async fetchUserData(phone) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/user/${phone}`);
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
    
        const data = await response.json();
    
        // ✅ Store user data in Pinia & localStorage
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));
    
        return data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    ,
    async register(role, phone, first_name, last_name, email, password) {
      const response = await fetch(`${apiBaseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, phone, first_name, last_name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
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
    
        // ✅ Store phone number instead of token for future requests
        localStorage.setItem("userPhone", phone); // Store the phone number
        localStorage.setItem("user", JSON.stringify(data.user)); // Store full user data if needed
    
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    
    

    getUserRole() {
      return this.user?.role || 'farmer';
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});

