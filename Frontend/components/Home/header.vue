<template>
  <div class="header-container">
    <div class="welcome-section">
      <h1 class="welcome-heading">
        Hello, {{ farmerName }}! <span class="wave">👋</span>
      </h1>
      <p class="welcome-subtext">Here's what's happening with the market place</p>
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.welcome-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
}

.wave {
  display: inline-block;
  animation: wave 2s infinite;
}

.welcome-subtext {
  font-size: 0.875rem;
  color: #718096;
}

.search-section {
  width: 100%;
  max-width: 400px;
}

.search-input {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

@media (min-width: 768px) {
  .header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .welcome-heading {
    font-size: 1.75rem;
  }
}
</style>