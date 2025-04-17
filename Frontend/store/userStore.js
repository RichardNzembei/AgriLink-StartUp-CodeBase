import { defineStore } from "pinia";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://agrilink-startup-codebase.onrender.com"
    : "http://localhost:5000";

export const useUserStore = defineStore("user", {
  state: () => {
    let user = null;
    let users = {};
    let userPhone = null;

    if (typeof window !== "undefined") {
      console.log('userStore: Initializing state from localStorage');
      const storedUser = localStorage.getItem("currentUser");
      console.log('userStore: currentUser raw:', storedUser);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.role) {
            delete parsedUser.password; // Sanitize
            user = parsedUser;
            console.log('userStore: Parsed user:', user);
          } else {
            console.warn('userStore: Invalid user data in localStorage, clearing');
            localStorage.removeItem("currentUser");
          }
        } catch (error) {
          console.error("userStore: Error parsing currentUser from localStorage:", error);
          localStorage.removeItem("currentUser");
        }
      }

      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error("userStore: Error parsing users from localStorage:", error);
          localStorage.removeItem("users");
        }
      }

      userPhone = localStorage.getItem("currentUserPhone") || null;
      console.log('userStore: userPhone:', userPhone);
    }

    return {
      user,
      users,
      userPhone,
      usersList: [],
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => {
      if (!state.user) {
        console.warn('getUserRole: User is null, defaulting to "farmer"');
      }
      return state.user?.role || "farmer";
    },
  },

  actions: {
    initialize() {
      if (typeof window !== "undefined" && !this.user) {
        console.log('userStore: Manual initialization');
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && typeof parsedUser === 'object' && parsedUser.role) {
              delete parsedUser.password;
              this.user = parsedUser;
              this.userPhone = localStorage.getItem("currentUserPhone") || null;
              console.log('userStore: Initialized user:', this.user);
            } else {
              console.warn('userStore: Invalid user data during initialization, clearing');
              localStorage.removeItem("currentUser");
              localStorage.removeItem("currentUserPhone");
            }
          } catch (error) {
            console.error("userStore: Error initializing user from localStorage:", error);
            localStorage.removeItem("currentUser");
            localStorage.removeItem("currentUserPhone");
          }
        }
      }
    },

    async fetchUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/user`);
        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        console.log("Fetched users:", users);

        this.usersList = users;
        console.log("Updated usersList state:", this.usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchUserData(phone) {
      if (this.user && this.user.phone === phone) {
        console.log('userStore: Skipping fetchUserData, user already set:', this.user);
        return this.user;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/user/${phone}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        console.log("fetchUserData: Fetched user data:", data);

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

    async register(role, phone, first_name, last_name, email, password) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role,
            phone,
            first_name,
            last_name,
            email,
            password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        return await response.json();
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
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
        console.log("login: API response:", data);

        const user = {
          role: data.user?.role || data.role,
          phone: data.user?.phone || data.phone,
          first_name: data.user?.first_name || data.first_name,
          last_name: data.user?.last_name || data.last_name,
          email: data.user?.email || data.email,
        };

        if (!user.role) {
          throw new Error("Invalid user data: missing role");
        }

        if (typeof window !== "undefined") {
          this.users[phone] = user;
          this.user = user;
          this.userPhone = phone;

          localStorage.setItem("users", JSON.stringify(this.users));
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("currentUserPhone", phone);
          console.log("login: localStorage updated:", {
            currentUser: localStorage.getItem("currentUser"),
            userPhone: localStorage.getItem("currentUserPhone"),
          });
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