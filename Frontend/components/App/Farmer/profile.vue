<template>
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-info">
            <img v-if="farmer.profileImage" :src="farmer.profileImage" alt="Farmer Profile"
              class="profile-image" />
            <div>
              <h2 class="profile-name">{{ farmer.fullName }}</h2>
              <p class="profile-type">{{ farmer.farmerType }}</p>
            </div>
          </div>
          <UButton class="logout-button" variant="outline" @click="logout">
            <UIcon name="lucide:log-out" class="logout-icon" />
          </UButton>
        </div>
        <div class="contact-section">
          <p class="contact-title">Contact Info</p>
          <ul class="contact-list">
            <li class="contact-item">
              <UIcon name="heroicons:envelope" size="24" class="contact-icon" />
              <span>{{ farmer.email }}</span>
            </li>
            <li class="contact-item">
              <UIcon name="heroicons:phone-solid" size="24" class="contact-icon" />
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
  import { useRouter } from "vue-router";
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const farmer = computed(() => ({
    fullName: userStore.user?.first_name
      ? `${userStore.user.first_name.toUpperCase()} ${userStore.user.last_name?.toUpperCase() || ""}`
      : "Guest",
    farmerType: userStore.user?.role || "Farmer",
    profileImage: userStore.user?.profileImage || "/profile.png",
    location: userStore.user?.location || "Unknown",
    email: userStore.user?.email || "N/A",
    phone: userStore.user?.phone || "N/A",
    followers: userStore.user?.followers || 0
  }));
  onMounted(() => {
    if (!userStore.user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        userStore.fetchUserData(storedUser.phone);
      }
    }
  });
  
  const logout = () => {
    localStorage.removeItem("user");
    userStore.user = null;
    router.push("/login");
  };
  </script>
  
  <style scoped>
  .profile-container {
    padding: 2rem 1rem;
    background: linear-gradient(to bottom, #e6f3ea, #f8fafc);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }
  
  .profile-card {
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    animation: fadeIn 0.5s ease-in;
  }
  
  .profile-card:hover {
    transform: translateY(-8px);
  }
  
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .profile-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .profile-image {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #22c55e;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .profile-image:hover {
    transform: scale(1.1) rotate(5deg);
  }
  
  .profile-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a3c34;
  }
  
  .profile-type {
    font-size: 1rem;
    color: #4b5563;
    font-weight: 500;
  }
  
  .logout-button {
    border-color: #ef4444;
    color: #ef4444;
    padding: 0.5rem;
    border-radius: 0.75rem;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .logout-button:hover {
    background: #ef4444;
    color: #ffffff;
  }
  
  .logout-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .contact-section {
    border-top: 2px solid #e5e7eb;
    padding-top: 1.5rem;
  }
  
  .contact-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a3c34;
    margin-bottom: 1rem;
  }
  
  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: #1f2937;
    transition: transform 0.3s ease;
  }
  
  .contact-item:hover {
    transform: translateX(4px);
  }
  
  .contact-icon {
    color: #22c55e;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (min-width: 768px) {
    .profile-container {
      padding: 3rem;
    }
    .profile-card {
      padding: 2.5rem;
    }
    .profile-name {
      font-size: 2rem;
    }
    .profile-image {
      width: 7rem;
      height: 7rem;
    }
  }
  </style>