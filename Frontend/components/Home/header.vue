<template>
  <div class="mb-6">
    <div>
      <h1 class="text-lg font-semibold text-black">
        Hi {{ farmerName }}! 👋
      </h1>
      <p class="text-sm text-gray-500">Enjoy our services!</p>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const search = ref("");
const farmerName = computed(() => {
  return userStore.user?.first_name
    ? userStore.user.first_name.charAt(0).toUpperCase() + userStore.user.first_name.slice(1)
    : "Guest";
});
onMounted(async () => {
  if (!userStore.user) {
    const storedPhone = userStore.userPhone || localStorage.getItem("currentUserPhone");
    if (storedPhone) {
      if (userStore.users[storedPhone]) {
        userStore.switchUser(storedPhone);
      } else {
        await userStore.fetchUserData(storedPhone);
      }
    }
  }
});
</script>
