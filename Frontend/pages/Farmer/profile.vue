```vue
<template>
  <div style="min-height: 100vh; background-color: #f9fafb; font-family: 'Poppins', sans-serif; position: relative;">
    <!-- Mobile Menu Toggle -->
    <button 
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-[100] bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:bg-green-500 hover:scale-105"
    >
      <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
    </button>

    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <AppFarmerNavbar />

      <!-- Main Content -->
      <main 
        :style="{ 'margin-left': isMobile && !isSidebarOpen ? '0' : '280px', 'padding': '2rem 1.5rem', 'transition': 'all 0.3s ease', 'flex': '1' }"
        :class="{ 'md:ml-[280px]': !isMobile || isSidebarOpen }"
      >
        <!-- Profile Hero Section -->
        <section style="background: linear-gradient(to right, #22c55e, #16a34a); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
          <div style="position: relative; z-index: 10; width: 100%; max-width: 800px; text-align: center;">
            <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
              <img 
                :src="farmer.profileImage" 
                alt="Profile Avatar" 
                style="width: 8rem; height: 8rem; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: transform 0.3s ease;"
                class="hover:transform hover:scale-105 hover:rotate-5"
              />
            </div>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
              {{ farmer.fullName }}
            </h1>
            <p style="font-size: 1.125rem; color: #d1fae5; margin-bottom: 1.5rem;">
              <strong style="color: white;">{{ farmer.farmerType }}</strong> | {{ farmer.location }}
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
              <UButton 
                size="lg"
                @click="editProfile"
                style="background-color: white; color: #166534; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;"
                class="hover:-translate-y-1 hover:shadow-md"
              >
                Edit Profile
                <UIcon name="i-heroicons-pencil" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
              </UButton>
              <UButton 
                size="lg"
                @click="addProduct"
                style="background-color: transparent; border: 2px solid rgba(255, 255, 255, 0.3); color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; transition: all 0.3s ease;"
                class="hover:bg-white/10"
              >
                Add Product
              </UButton>
            </div>
          </div>
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);"></div>
        </section>

        <!-- Profile Content -->
        <div style="max-width: 100%; margin: 0 auto; animation: fade-in 0.5s ease-out;">
      
          <!-- Profile Details -->
          <section style="background-color: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #1a3c34; margin-bottom: 1rem;">Contact Info</h2>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; font-size: 0.875rem; color: #4b5563;">
              <div style="display: flex; align-items: center; transition: transform 0.3s ease;"
                   class="hover:transform hover:translate-x-1">
                <UIcon name="i-heroicons-envelope" style="width: 1.25rem; height: 1.25rem; color: #22c55e; margin-right: 0.75rem;" />
                <span>{{ farmer.email }}</span>
              </div>
              <div style="display: flex; align-items: center; transition: transform 0.3s ease;"
                   class="hover:transform hover:translate-x-1">
                <UIcon name="i-heroicons-phone" style="width: 1.25rem; height: 1.25rem; color: #22c55e; margin-right: 0.75rem;" />
                <span>{{ farmer.phone }}</span>
              </div>
              <div style="display: flex; align-items: center; transition: transform 0.3s ease;"
                   class="hover:transform hover:translate-x-1">
                <UIcon name="i-heroicons-map-pin" style="width: 1.25rem; height: 1.25rem; color: #22c55e; margin-right: 0.75rem;" />
                <span>{{ farmer.location }}</span>
              </div>
            </div>
          </section>



          <!-- Settings -->
          <section style="background-color: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #1a3c34; margin-bottom: 1.5rem;">Settings</h2>
            <div style="display: grid; gap: 1rem;">
              <UButton 
                block
                @click="changePassword"
                style="background-color: transparent; border: 1px solid #d1d5db; color: #1a3c34; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem; transition: all 0.3s ease;"
                class="hover:bg-[#f9fafb]"
              >
                Change Password
              </UButton>
              <UButton 
                block
                @click="updateNotifications"
                style="background-color: transparent; border: 1px solid #d1d5db; color: #1a3c34; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem; transition: all 0.3s ease;"
                class="hover:bg-[#f9fafb]"
              >
                Notification Preferences
              </UButton>
              <UButton 
                block
                @click="logout"
                style="background-color: #dc2626; color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem; transition: all 0.3s ease;"
                class="hover:bg-[#b91c1c]"
              >
                Log Out
              </UButton>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useProductStore } from "~/store/useProductStore";
import { useUserStore } from "~/store/userStore";
import { onClickOutside } from '@vueuse/core';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const isMobile = ref(false);

const farmer = computed(() => ({
  fullName: userStore.user?.first_name
    ? `${userStore.user.first_name.toUpperCase()} ${userStore.user.last_name?.toUpperCase() || ""}`
    : "Guest",
  farmerType: userStore.user?.role || "Farmer",
  profileImage: userStore.user?.profileImage || "/default-avatar.jpg",
  location: userStore.user?.location || "Unknown",
  email: userStore.user?.email || "N/A",
  phone: userStore.user?.phone || "N/A",
  followers: userStore.user?.followers || 0
}));

onMounted(() => {
  productStore.fetchProducts();
  if (!userStore.user) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      userStore.fetchUserData(storedUser.phone);
    }
  }
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

// Close sidebar when clicking outside
onClickOutside(sidebarRef, () => {
  if (isMobile.value && isSidebarOpen.value) {
    isSidebarOpen.value = false;
  }
});

const editProfile = () => {
  router.push('/profile/edit');
};

const addProduct = () => {
  router.push('/products/add');
};

const editProduct = (productId) => {
  router.push(`/products/edit/${productId}`);
};

const viewAllProducts = () => {
  router.push('/products');
};

const changePassword = () => {
  router.push('/settings/password');
};

const updateNotifications = () => {
  router.push('/settings/notifications');
};

const logout = () => {
  localStorage.removeItem("user");
  userStore.user = null;
  router.push('/login');
};

useHead({
  title: 'AgriLink - Profile',
  meta: [
    { 
      name: 'description', 
      content: 'Manage your farmer profile, products, and settings with AgriLink.' 
    },
    { 
      property: 'og:title', 
      content: 'Profile | AgriLink Africa' 
    },
    { 
      property: 'og:description', 
      content: 'View and update your farmer profile and manage products.' 
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