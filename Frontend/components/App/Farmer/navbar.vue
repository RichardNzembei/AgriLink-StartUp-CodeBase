<template>
    <aside 
        ref="sidebarRef"
        :class="{'translate-x-0': isSidebarOpen || !isMobile, '-translate-x-full': !isSidebarOpen && isMobile}"
        class="w-[280px] bg-white border-r border-gray-200 py-6 px-4 h-screen fixed z-50 flex flex-col shadow-lg transition-transform duration-300 ease-in-out"
      >
        <div class="mb-8 relative">
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-leaf" class="w-7 h-7 text-green-600" />
            <h2 class="text-2xl font-bold text-green-800">AgriLink</h2>
          </div>
          <p class="text-sm text-gray-500">Your Farming Companion</p>
          <button 
            @click="toggleSidebar"
            class="md:hidden absolute top-0 right-0 text-gray-500"
          >
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </button>
        </div>
        
        <nav class="flex flex-col gap-1 flex-grow">
          <NuxtLink 
            to="/Farmer/dashboard" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
            <span>Dashboard</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/dashboard'}"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/Farmer/addProducts" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
            <span>Add Product</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/addProducts'}"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/Farmer/featuredProducts" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-cube" class="w-5 h-5" />
            <span>My Products</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/featuredProducts'}"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/Farmer/reviews" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
            <span>Reviews</span>
            <span class="ml-auto bg-amber-500 text-white text-xs px-2 py-1 rounded-full">12</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/reviews'}"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/Farmer/community" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-users" class="w-5 h-5" />
            <span>Community</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/community'}"></span>
          </NuxtLink>
          
          <div class="h-px bg-gray-200 my-4"></div>
          
          <NuxtLink 
            to="/Farmer/profile" 
            @click="closeSidebar"
            class="flex items-center gap-4 py-3 px-4 rounded-lg text-gray-700 font-medium transition-all relative overflow-hidden hover:bg-green-50 hover:text-green-800 hover:translate-x-1"
            active-class="bg-green-100 text-green-800 font-semibold"
          >
            <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
            <span>My Profile</span>
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 opacity-0 transition-opacity" :class="{'opacity-100': $route.path === '/Farmer/profile'}"></span>
          </NuxtLink>
        </nav>
        
        <div class="mt-auto">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UIcon name="i-heroicons-sun" class="w-8 h-8 text-amber-500" />
            <div>
              <p class="text-sm font-medium text-gray-900">Good day for planting!</p>
              <small class="text-xs text-gray-500">24°C, Sunny</small>
            </div>
          </div>
        </div>
      </aside>
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



const exploreDashboard = () => {
  window.scrollTo({ top: 600, behavior: 'smooth' });
};
</script>