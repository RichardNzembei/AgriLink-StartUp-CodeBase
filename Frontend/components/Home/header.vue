<template>
    <div class="mb-6">
        <div>
            <h1 class="text-lg font-semibold text-black">
                Hi {{ farmerName }}! 👋
            </h1>
            <p class="text-sm text-gray-500">Enjoy our services!</p>
        </div>

        <UInput v-model="search" placeholder="Search here..." size="md" icon="i-heroicons-magnifying-glass"
            class="mb-6" :style="{backgroundColor:'white', color:'black'}" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const search = ref("");

// ✅ Compute user name dynamically
const farmerName = computed(() => userStore.user?.first_name.charAt(0).toUpperCase() + userStore.user?.first_name.slice(1) || "Guest");

// ✅ Fetch user data when component loads
onMounted(() => {
  if (!userStore.user) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      userStore.fetchUserData(storedUser.phone);
    }
  }
});
</script>
