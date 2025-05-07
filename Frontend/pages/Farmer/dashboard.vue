<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Navbar -->
    <AppFarmerNavbar />

    <!-- Main Content -->
    <div class="py-8 px-4 space-y-8">
      <!-- Personalized Greeting -->
      <section class="bg-white rounded-xl shadow-sm p-6 transform transition-all hover:shadow-md">
        <h1 class="text-2xl font-semibold text-gray-800 animate-fade-in">
          Hi {{ farmerName }}! 👋
        </h1>
        <p class="text-sm text-gray-500 mt-1">Your hub for markets, insights, and community connections.</p>
      </section>

      <!-- Market Prices -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Market Prices</h2>
        <div v-if="marketPrices.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="item in marketPrices"
            :key="item.id"
            class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            role="button"
            tabindex="0"
            @click="navigateTo(`/market/${item.id}`)"
            @keypress.enter="navigateTo(`/market/${item.id}`)"
          >
            <div>
              <p class="text-sm font-medium text-gray-700">{{ item.crop }}</p>
              <p class="text-xs text-gray-500">{{ item.location }}</p>
            </div>
            <p class="text-sm font-semibold text-green-600">{{ item.price }} KES/kg</p>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">Loading market prices...</div>
      </section>

      <!-- Weather Update -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Weather Update</h2>
        <div v-if="weather" class="flex items-center space-x-4 animate-fade-in">
          <img :src="weather.icon" alt="Weather Icon" class="w-12 h-12" />
          <div>
            <p class="text-lg font-medium text-gray-700">{{ weather.temperature }}°C</p>
            <p class="text-sm text-gray-500">{{ weather.description }}</p>
            <p class="text-xs text-gray-400">{{ weather.location }}</p>
          </div>
        </div>
        <div v-else-if="weatherError" class="text-sm text-red-500">{{ weatherError }}</div>
        <div v-else class="text-sm text-gray-500">Loading weather...</div>
      </section>

      <!-- Consultation -->
      <section class="bg-green-50 rounded-xl shadow-sm p-6" :style="{ backgroundColor: '#d4edda' }">
        <div class="flex items-center space-x-4 mb-4">
          <img src="/myproducts/consult.png" alt="Free Consultation" class="w-12 h-12 rounded-full" />
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Free Consultation</h2>
            <p class="text-sm text-gray-500">Connect with experts for personalized support</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <UButton
            variant="ghost"
            size="lg"
            aria-label="Call Support"
            class="hover:bg-green-100 p-3 rounded-full transform transition-transform hover:scale-105"
            @click="callSupport"
          >
            <UIcon name="i-heroicons-phone-solid" class="text-green-600 text-2xl" />
          </UButton>
          <UButton
            variant="ghost"
            size="lg"
            aria-label="Chat on WhatsApp"
            class="hover:bg-green-100 p-3 rounded-full transform transition-transform hover:scale-105"
            @click="chatOnWhatsApp"
          >
            <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-solid" class="text-green-600 text-2xl" />
          </UButton>
        </div>
      </section>

      <!-- Community Feed -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Community Feed</h2>
        <div v-if="communityPosts.length" class="space-y-4">
          <div
            v-for="post in communityPosts"
            :key="post.id"
            class="border-b pb-4 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
            role="button"
            tabindex="0"
            @click="navigateTo(`/community/${post.id}`)"
            @keypress.enter="navigateTo(`/community/${post.id}`)"
          >
            <div class="flex items-center space-x-3">
              <img :src="post.authorAvatar" alt="Author Avatar" class="w-10 h-10 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-gray-700">{{ post.author }}</p>
                <p class="text-xs text-gray-500">{{ post.time }}</p>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-700">{{ post.content }}</p>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">No community posts yet.</div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '~/store/userStore';
import { useRouter } from 'nuxt/app';

const userStore = useUserStore();
const router = useRouter();

// Compute farmer name or default to "Guest"
const farmerName = computed(() => {
  return userStore.user?.first_name
    ? userStore.user.first_name.charAt(0).toUpperCase() + userStore.user.first_name.slice(1)
    : 'Guest';
});

// On mount: fetch user data, weather, and market prices
onMounted(async () => {
  if (!userStore.user) {
    const storedPhone = userStore.userPhone || localStorage.getItem('currentUserPhone');
    if (typeof storedPhone === 'string') {
      try {
        if (userStore.users[storedPhone]) {
          userStore.switchUser(storedPhone);
        } else {
          await userStore.fetchUserData(storedPhone);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  }
  fetchWeather();
  fetchMarketPrices();
});

// Support contacts
const phoneNumber = '+254716899396';
const callSupport = () => {
  window.location.href = `tel:${phoneNumber}`;
};
const chatOnWhatsApp = () => {
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};

// Navigation
const navigateTo = (path) => {
  router.push(path);
};

// Weather section
const weather = ref(null);
const weatherError = ref(null);

const fetchWeather = async () => {
  try {
    setTimeout(() => {
      weather.value = {
        temperature: 24,
        description: 'Partly Cloudy',
        location: 'Nairobi, KE',
        icon: 'https://openweathermap.org/img/wn/02d.png',
      };
    }, 1000);
  } catch (error) {
    weatherError.value = 'Failed to load weather data.';
    console.error('Weather fetch error:', error);
  }
};

// Market prices section
const marketPrices = ref([]);

const fetchMarketPrices = async () => {
  try {
    setTimeout(() => {
      marketPrices.value = [
        { id: 1, crop: 'Maize', location: 'Nairobi', price: 50 },
        { id: 2, crop: 'Tomatoes', location: 'Kisumu', price: 80 },
        { id: 3, crop: 'Potatoes', location: 'Eldoret', price: 40 },
        { id: 4, crop: 'Onions', location: 'Mombasa', price: 60 },
      ];
    }, 1000);
  } catch (error) {
    console.error('Market prices fetch error:', error);
  }
};

// Community posts section
const communityPosts = ref([
  {
    id: 1,
    author: 'John Farmer',
    authorAvatar: '/avatars/john.jpg',
    time: '2 hours ago',
    content: 'Just harvested my maize crop! Any tips for storage?',
  },
  {
    id: 2,
    author: 'Mary Grower',
    authorAvatar: '/avatars/mary.jpg',
    time: '5 hours ago',
    content: 'Looking for buyers for my tomatoes in Nairobi.',
  },
]);
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

section {
  width: 100%;
  transition: background-color 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
}

button,
[role='button'] {
  touch-action: manipulation;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
