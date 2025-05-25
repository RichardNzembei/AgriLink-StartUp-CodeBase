<<<<<<< HEAD

=======
<<<<<<< Updated upstream
=======
>>>>>>> 61e73ef (farmers Dashboard redo)
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const navItems = [
  { to: '/Farmer/dashboard', label: 'Home', icon: 'i-lucide-home', color: 'text-blue-500' },
  { to: '/Farmer/community', label: 'Community', icon: 'i-heroicons-globe-alt-solid', color: 'text-green-500' },
  { to: '/Farmer/addproducts', label: 'Add', icon: 'i-heroicons-plus', color: 'text-orange-500' },
  { to: '/Farmer/reviews', label: 'Reviews', icon: 'i-heroicons-chat-bubble-left-right-solid', color: 'text-orange-500' },
  { to: '/Farmer/insights', label: 'Insights', icon: 'i-heroicons-light-bulb', color: 'text-orange-500' },
];

const isMenuOpen = ref(false);
const lastScrollPosition = ref(0);
const isHeaderVisible = ref(true);
const isNavVisible = ref(true);

<<<<<<< HEAD
=======
const adjustMainPadding = () => {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  if (header && main && window.innerWidth < 768) {
    const headerHeight = header.offsetHeight;
    const navHeight = isNavVisible.value ? nav.offsetHeight : 0;
    main.style.paddingTop = `${headerHeight}px`;
    main.style.paddingBottom = `${navHeight}px`;
  } else if (main) {
    main.style.paddingTop = '3.5rem'; // 56px for desktop
    main.style.paddingBottom = '0';
  }
};

>>>>>>> 61e73ef (farmers Dashboard redo)
const handleScroll = () => {
  if (window.innerWidth < 768) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
<<<<<<< HEAD
=======
    // Header visibility
>>>>>>> 61e73ef (farmers Dashboard redo)
    if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 50) {
      isHeaderVisible.value = false;
    } else {
      isHeaderVisible.value = true;
    }
    
<<<<<<< HEAD
    if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 50) {
      isNavVisible.value = true;
    } else if (currentScrollPosition < lastScrollPosition.value - 10) {
      isNavVisible.value = false;
    }
    
    lastScrollPosition.value = currentScrollPosition;
=======
    // Nav visibility
    if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 50) {
      isNavVisible.value = false;
    } else if (currentScrollPosition < lastScrollPosition.value) {
      isNavVisible.value = true;
    }
    
    lastScrollPosition.value = currentScrollPosition;
    adjustMainPadding();
>>>>>>> 61e73ef (farmers Dashboard redo)
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
<<<<<<< HEAD
=======
  window.addEventListener('resize', adjustMainPadding);
  adjustMainPadding(); // Initial adjustment
>>>>>>> 61e73ef (farmers Dashboard redo)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
<<<<<<< HEAD
});
</script>

=======
  window.removeEventListener('resize', adjustMainPadding);
});
</script>

>>>>>>> Stashed changes
>>>>>>> 61e73ef (farmers Dashboard redo)
<template>
  <!-- Desktop Header -->
  <header class="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center py-3">
        <!-- Branding with ElevateYou and tagline -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <Icon name="i-lucide-activity" class="h-6 w-6 text-teal-500" />
            <h1 class="text-xl font-bold text-gray-800">AgriLink</h1>
          </div>
          <div class="hidden lg:flex items-center gap-1 text-sm text-gray-500">
            <span class="text-blue-700">Fresh.</span>
            <span class="text-green-500">Local.</span>
            <span class="text-orange-500">Connected.</span>
          </div>
        </div>

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
        <!-- Community -->
        <UButton variant="ghost" size="sm" to="/Farmer/community" aria-label="Community"
          class="hover:text-green-600 flex flex-col items-center w-14 sm:w-20">
          <UIcon name="i-heroicons-users-solid" class="text-lg sm:text-2xl mb-1" />
          <span class="hidden sm:block text-xs sm:text-sm">Community</span>
        </UButton>
=======
>>>>>>> 61e73ef (farmers Dashboard redo)
        <!-- Main Navigation -->
        <nav class="flex items-center gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
<<<<<<< HEAD
            class=" px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            :class="route.path === item.to ? `${item.color} bg-gray-50` : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
       <div class="flex items-center gap-2">
        <Icon :name="item.icon" class="h-6 w-6 " />
        <span>{{ item.label }}</span>
       </div>
          </RouterLink>
        </nav>
=======
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            :class="route.path === item.to ? `${item.color} bg-gray-50` : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <div class="flex items-center gap-2">
              <Icon :name="item.icon" class="h-6 w-6" />
              <span>{{ item.label }}</span>
            </div>
          </RouterLink>
        </nav>
>>>>>>> Stashed changes
>>>>>>> 61e73ef (farmers Dashboard redo)

        <!-- Profile Dropdown Trigger -->
        <RouterLink 
          to="/Farmer/profile" 
          class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Profile and settings"
        >
          <div class="relative">
            <img 
              src="../../../public/profile.png" 
              alt="User profile" 
              class="h-8 w-8 rounded-full border-2 border-white"
            >
            <div class="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span class="hidden lg:inline text-sm font-medium text-gray-700">Profile</span>
          <Icon name="i-lucide-chevron-down" class="h-4 w-4 text-gray-500" />
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- Mobile Header -->
  <header 
    class="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-200 to-green-400 shadow-md transition-transform duration-300"
    :class="{ '-translate-y-full': !isHeaderVisible }"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Branding -->
        <div class="flex items-center gap-2">
          <Icon name="i-lucide-activity" class="h-6 w-6 text-white" />
          <div>
            <h1 class="text-lg font-bold text-black">AgriLink</h1>
            <p class="text-xs text-black/90">
              <span class="font-medium">Fresh.</span> • 
              <span class="font-medium">Local.</span> • 
              <span class="font-medium">Connected</span>
            </p>
          </div>
        </div>

        <!-- Profile Link -->
        <RouterLink 
          to="/Farmer/profile"
          class="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <div class="relative">
            <img 
              src="../../../public/profile.png" 
              alt="Profile" 
              class="h-8 w-8 rounded-full border-2 border-white/80"
            >
            <div class="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <nav 
    class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300"
    :class="{ 'translate-y-full': !isNavVisible }"
  >
    <div class="container mx-auto px-2 py-1">
      <div class="flex justify-around items-center">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center p-2 text-xs font-medium"
          :class="route.path === item.to ? item.color : 'text-gray-500'"
        >
          <Icon :name="item.icon" class="h-6 w-6 mb-1" />
        </RouterLink>
      </div>
    </div>
  </nav>
<<<<<<< HEAD

  <!-- Main Content Area -->
  <main class="pt-16 md:pt-14 pb-16 md:pb-0 px-4">
    <slot />
  </main>
=======
<<<<<<< Updated upstream
=======

  <!-- Main Content Area -->
  <main class="px-4">
    <slot />
  </main>
>>>>>>> Stashed changes
>>>>>>> 61e73ef (farmers Dashboard redo)
</template>

<style scoped>
.router-link-active {
  font-weight: 600;
}

.router-link-exact-active {
  position: relative;
}

.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  @apply bg-teal-500;
}
</style>