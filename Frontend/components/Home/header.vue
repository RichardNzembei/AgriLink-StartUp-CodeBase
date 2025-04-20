<template>
  <div class="header-container">
    <div>
      <h1 class="header-title">Hi {{ farmerName }}! 🌾</h1>
      <p class="header-subtitle">Explore our tools to boost your farming success!</p>
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

<style scoped>
.header-container {
  background: linear-gradient(to right, #22c55e20, #16a34a20);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.5s ease-out;
}

.header-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a3c34;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 1rem;
  color: #4b5563;
  font-weight: 400;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (min-width: 768px) {
  .header-container {
    padding: 2rem;
  }
  .header-title {
    font-size: 2rem;
  }
  .header-subtitle {
    font-size: 1.125rem;
  }
}
</style>