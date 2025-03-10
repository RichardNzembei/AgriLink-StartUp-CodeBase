<template>
    <div class="p-6 max-w-xl mx-auto">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden p-6 space-x-4 transition-all duration-500 transform hover:scale-105">
            <div class="flex items-center space-x-6 mt-6">
                <img v-if="farmer.profileImage" 
                    :src="farmer.profileImage" 
                    alt="Farmer Profile"
                    class="w-24 h-24 rounded-full object-cover shadow-md border-4 border-green-400 transform transition duration-500 hover:scale-110 hover:rotate-3" />
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 transition-opacity duration-700 opacity-80 hover:opacity-100">
                        {{ farmer.fullName }}
                    </h2>
                    <p class="text-sm text-gray-500 font-medium transition-opacity duration-500 hover:opacity-100">
                        {{ farmer.farmerType }}
                    </p>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <span class="font-semibold text-green-600">
                            {{ farmer.followers }} Followers
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex justify-between items-center">
                    <p class="font-medium text-lg text-gray-900 border-b-2 border-green-300 pb-1">
                        Contact Info
                    </p>
                </div>
                <ul class="mt-4 space-y-3">
                    <li class="flex items-center space-x-2 text-gray-700 transition-transform duration-500 hover:translate-x-2">
                        <UIcon name="heroicons:link" size="24" class="text-green-500" />
                        <span>{{ farmer.location }}</span>
                    </li>
                    <li class="flex items-center space-x-2 text-gray-700 transition-transform duration-500 hover:translate-x-2">
                        <UIcon name="heroicons:envelope" size="20" class="text-green-500" />
                        <span>{{ farmer.email }}</span>
                    </li>
                    <li class="flex items-center space-x-2 text-gray-700 transition-transform duration-500 hover:translate-x-2">
                        <UIcon name="heroicons:phone-solid" size="20" class="text-green-500" />
                        <span>{{ farmer.phone }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

// ✅ Compute farmer data dynamically
const farmer = computed(() => ({
  fullName: userStore.user?.first_name
    ? `${userStore.user.first_name.toUpperCase()} ${userStore.user.last_name?.toUpperCase() || ""}`
    : "Guest",
  farmerType: userStore.user?.role || "Farmer",
  profileImage: userStore.user?.profileImage || "https://via.placeholder.com/150",
  location: userStore.user?.location || "Unknown",
  email: userStore.user?.email || "N/A",
  phone: userStore.user?.phone || "N/A",
  followers: userStore.user?.followers || 0
}));

// ✅ Fetch user data when component loads
onMounted(() => {
  if (!userStore.user) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      userStore.fetchUserData(storedUser.phone);
    }
  }
});
</script>

<style>
/* Extra animation for a better feel */
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

h2, p, ul li {
    animation: fadeIn 1s ease-in-out;
}
</style>
