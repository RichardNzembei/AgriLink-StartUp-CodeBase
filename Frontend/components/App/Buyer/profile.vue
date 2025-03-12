<template>
    <div class="p-6 max-w-xl mx-auto">
        <div
            class="bg-white shadow-xl rounded-lg overflow-hidden p-6 space-x-4 transition-all duration-500 transform hover:scale-105">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-6 mt-6">
                    <img v-if="buyer.profileImage" :src="buyer.profileImage" alt="Buyer Profile"
                        class="w-24 h-24 rounded-full object-cover shadow-md border-4 border-blue-400 transform transition duration-500 hover:scale-110 hover:rotate-3" />
                    <div>
                        <h2
                            class="text-2xl font-bold text-gray-900 transition-opacity duration-700 opacity-80 hover:opacity-100">
                            {{ buyer.fullName }}
                        </h2>
                        <p class="text-sm text-gray-500 font-medium transition-opacity duration-500 hover:opacity-100">
                            {{ buyer.buyerType }}
                        </p>

                    </div>
                </div>
                <UButton class="text-red-500 hover:text-red-700" variant="outline" @click="logout">
                    Logout
                </UButton>
            </div>

            <div class="mt-6">
                <div class="flex justify-between items-center">
                    <p class="font-medium text-lg text-gray-900 border-b-2 border-blue-300 pb-1">
                        Contact Info
                    </p>
                </div>
                <ul class="mt-4 space-y-3">

                    <li
                        class="flex items-center space-x-2 text-gray-700 transition-transform duration-500 hover:translate-x-2">
                        <UIcon name="heroicons:envelope" size="20" class="text-blue-500" />
                        <span>{{ buyer.email }}</span>
                    </li>
                    <li
                        class="flex items-center space-x-2 text-gray-700 transition-transform duration-500 hover:translate-x-2">
                        <UIcon name="heroicons:phone-solid" size="20" class="text-blue-500" />
                        <span>{{ buyer.phone }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

// ✅ Compute buyer data dynamically
const buyer = computed(() => ({
    fullName: userStore.user?.first_name
        ? `${userStore.user.first_name.toUpperCase()} ${userStore.user.last_name?.toUpperCase() || ""}`
        : "Guest",
    buyerType: userStore.user?.role || "Buyer",
    profileImage: userStore.user?.profileImage || "/profile.png",
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

// ✅ Logout function
const logout = () => {
    localStorage.removeItem("user");
    userStore.user = null;
    router.push("/login");
};
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

h2,
p,
ul li {
    animation: fadeIn 1s ease-in-out;
}
</style>
