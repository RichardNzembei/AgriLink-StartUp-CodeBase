<template>
  <div class="min-h-screen bg-gray-50 font-['Poppins'] relative">
    <!-- Mobile Menu Toggle -->
    <button 
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-[100] bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:bg-green-500 hover:scale-105"
    >
      <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
    </button>

    <div class="flex min-h-screen">
      <!-- Sidebar -->
    <AppFarmerNavbar/>

      <!-- Main Content -->
      <main 
        class="flex-1 py-8 px-6 transition-all duration-300"
        :class="{'md:ml-[280px]': !isMobile || isSidebarOpen}"
      >
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 mb-8 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-lg">
          <div class="relative z-10 lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Welcome back, <span class="bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-transparent">Farmer!</span>
            </h1>
            <p class="text-lg text-green-100 mb-6 leading-relaxed">
              Your farm is <strong class="text-white">85% productive</strong> this season. 
              <br class="hidden sm:block">Connect with experts and grow your business with AgriLink.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton 
                size="lg"
                @click="exploreDashboard" 
                variant="solid"
                class="bg-white text-green-800 font-semibold rounded-lg px-6 py-3 flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all"
              >
                Explore Dashboard
                <UIcon name="i-heroicons-arrow-right" class="ml-2 w-5 h-5" />
              </UButton>
              <UButton 
                size="lg"
                variant="outline"
                class="bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg px-6 py-3 hover:bg-white/10 transition-all"
              >
                Quick Tips
              </UButton>
            </div>
          </div>
          <div class="relative z-10 w-full lg:w-auto">
            <img 
              src="../../assets/img/istockphoto-522961501-2048x2048.jpg" 
              alt="Happy Farmer" 
              class="w-full max-w-md rounded-lg shadow-xl transform transition-transform hover:rotate-y-[-5deg]"
            />
            <div class="absolute -bottom-4 -right-4 bg-white rounded-xl p-6 shadow-xl flex gap-6">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-2 rounded-full">
                  <UIcon name="i-heroicons-chart-bar" class="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">24</h3>
                  <p class="text-sm text-gray-500">Active Products</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-2 rounded-full">
                  <UIcon name="i-heroicons-currency-dollar" class="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">$1,240</h3>
                  <p class="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)]"></div>
        </section>

        <!-- Dashboard Content -->
        <div class="max-w-full mx-auto animate-fade-in">
          <HomeConsultation />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'

const isSidebarOpen = ref(false)
const sidebarRef = ref(null)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false
  }
}

// Close sidebar when clicking outside
onClickOutside(sidebarRef, () => {
  if (isMobile.value && isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

useHead({
  title: 'AgriLink - Farmer Dashboard',
  meta: [
    { 
      name: 'description', 
      content: 'Your comprehensive farming management dashboard for better agricultural productivity.' 
    },
    { 
      property: 'og:title', 
      content: 'Farmer Dashboard | AgriLink Africa' 
    },
    { 
      property: 'og:description', 
      content: 'Manage your farm products, get support, and track your agricultural business.' 
    },
  ],
});

const exploreDashboard = () => {
  window.scrollTo({ top: 600, behavior: 'smooth' });
};
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Custom transform for hero image */
.hover\:rotate-y-\[-5deg\]:hover {
  transform: perspective(1000px) rotateY(-5deg);
}
</style>