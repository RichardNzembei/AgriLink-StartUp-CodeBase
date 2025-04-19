<template>
  <nav class="nav-container">
    <div class="nav-content">
      <!-- Logo/Branding (optional) -->
      <div class="brand-container">
        <nuxt-link to="/" class="brand-link">
          <span class="brand-icon">
            <UIcon name="i-heroicons-leaf-solid" class="icon" />
          </span>
          <span class="brand-text hidden sm:inline">AgriLink</span>
        </nuxt-link>
      </div>

      <!-- Primary Navigation -->
      <div class="nav-links">
        <UButton 
          v-for="link in navigationLinks" 
          :key="link.name"
          :to="link.to"
          :aria-label="link.name"
          variant="ghost"
          size="sm"
          class="nav-button"
          :class="{ 'active-nav': $route.path.startsWith(link.to) }"
        >
          <div class="button-content">
            <UIcon :name="link.icon" class="nav-icon" />
            <span class="nav-text">{{ link.name }}</span>
          </div>
        </UButton>
      </div>

      <!-- User Profile/Controls -->
      <div class="user-controls">
        <UDropdown 
        :items="userMenuItems" 
        :popper="{ placement: 'bottom-start' }
        
        ">
          <UButton 
            variant="ghost"
            aria-label="User menu"
            class="user-button"
          >
            <UIcon name="i-heroicons-user-circle-solid" class="user-icon" />
            <span class="user-name hidden sm:inline">Profile</span>
          </UButton>

          <template #item="{ item }">
            <span class="dropdown-item">
              <UIcon :name="item.icon" class="dropdown-icon" />
              <span>{{ item.label }}</span>
            </span>
          </template>
        </UDropdown>

        <!-- Notification Bell -->
        <UButton 
          variant="ghost"
          size="sm"
          aria-label="Notifications"
          class="notification-button"
          @click="notificationsOpen = true"
        >
          <UIcon name="i-heroicons-bell-solid" class="notification-icon" />
          <span v-if="unreadCount > 0" class="notification-badge">
            {{ unreadCount }}
          </span>
        </UButton>
      </div>
    </div>

    <!-- Mobile Bottom Bar (for smaller screens) -->
    <div class="mobile-nav">
      <UButton 
        v-for="link in mobileNavigationLinks" 
        :key="link.name"
        :to="link.to"
        :aria-label="link.name"
        variant="ghost"
        size="sm"
        class="mobile-nav-button"
        :class="{ 'active-mobile-nav': $route.path.startsWith(link.to) }"
      >
        <div class="mobile-button-content">
          <UIcon :name="link.icon" class="mobile-nav-icon" />
          <span class="mobile-nav-text">{{ link.name }}</span>
        </div>
      </UButton>
    </div>

    <!-- Notifications Panel -->
    <UModal v-model="notificationsOpen">
      <UCard>
        <template #header>
          <div class="notification-header">
            <h3>Notifications</h3>
            <UButton 
              color="gray" 
              variant="ghost" 
              icon="i-heroicons-x-mark-20-solid" 
              @click="notificationsOpen = false"
            />
          </div>
        </template>

        <div class="notification-list">
          <div v-for="notification in notifications" :key="notification.id" class="notification-item">
            <div class="notification-content">
              <UIcon :name="notification.icon" class="notification-item-icon" />
              <div>
                <p class="notification-title">{{ notification.title }}</p>
                <p class="notification-message">{{ notification.message }}</p>
                <p class="notification-time">{{ notification.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const route = useRoute();

// Navigation data
const navigationLinks = [
  { name: 'Home', to: '/Farmer/dashboard', icon: 'i-heroicons-home-solid' },
  { name: 'Community', to: '/Farmer/community', icon: 'i-heroicons-users-solid' },
  { name: 'Market', to: '/Farmer/market', icon: 'i-heroicons-shopping-bag-solid' },
  { name: 'Resources', to: '/Farmer/resources', icon: 'i-heroicons-book-open-solid' },
];

const mobileNavigationLinks = [
  { name: 'Home', to: '/Farmer/dashboard', icon: 'i-heroicons-home-solid' },
  { name: 'Community', to: '/Farmer/community', icon: 'i-heroicons-users-solid' },
  { name: 'Market', to: '/Farmer/market', icon: 'i-heroicons-shopping-bag-solid' },
  { name: 'Profile', to: '/Farmer/profile', icon: 'i-heroicons-user-solid' },
];

// User menu
const userMenuItems = [
  [
    {
      label: 'My Profile',
      icon: 'i-heroicons-user-circle-solid',
      click: () => navigateTo('/Farmer/profile')
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth-solid',
      click: () => navigateTo('/Farmer/settings')
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle-solid',
      click: () => signOut()
    }
  ]
];

// Notifications
const notificationsOpen = ref(false);
const unreadCount = ref(3);
const notifications = ref([
  {
    id: 1,
    icon: 'i-heroicons-check-circle-solid',
    title: 'Order Confirmed',
    message: 'Your tomatoes order has been confirmed by buyer',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'i-heroicons-chat-bubble-left-ellipsis-solid',
    title: 'New Message',
    message: 'You have a new message from AgriCo-op',
    time: '5 hours ago'
  },
  {
    id: 3,
    icon: 'i-heroicons-exclamation-triangle-solid',
    title: 'Weather Alert',
    message: 'Heavy rain expected in your region tomorrow',
    time: '1 day ago'
  }
]);

const signOut = () => {
  // Handle sign out logic
  console.log('Signing out...');
};
</script>

<style scoped>
/* CSS Variables */
.nav-container {
  --nav-height: 4rem;
  --mobile-nav-height: 3.5rem;
  --primary-color: #38a169;
  --primary-hover: #2f855a;
  --text-color: #2d3748;
  --text-light: #718096;
  --bg-color: #ffffff;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --transition: all 0.2s ease-in-out;
}

/* Base Navbar Styles */
.nav-container {
  background-color: var(--bg-color);
  border-bottom: 1px solid #f7fafc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  height: var(--nav-height);
  box-shadow: var(--shadow);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

/* Branding */
.brand-container {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #38a169;
  transition: var(--transition);
}

.brand-link:hover {
  color: #2f855a;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  font-weight: 600;
  font-size: 1.125rem;
  display: none;
}

@media (min-width: 640px) {
  .brand-text {
    display: inline;
  }
}

.icon {
  font-size: 1.5rem;
}

/* Navigation Links */
.nav-links {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  color: var(--text-color);
  transition: var(--transition);
}

.nav-button:hover {
  background-color: #f0fff4;
  color: #38a169;
}

.nav-button.active-nav {
  color: #38a169;
  background-color: #f0fff4;
  font-weight: 500;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.nav-text {
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  .nav-text {
    font-size: 0.875rem;
  }
}

/* [Continue with the rest of your CSS, converting each @apply to standard CSS] */
/* User Controls */
.user-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  transition: var(--transition);
}

.user-button:hover {
  background-color: #f7fafc;
}

.user-icon {
  font-size: 1.25rem;
}

.user-name {
  font-size: 0.875rem;
  display: none;
}

@media (min-width: 640px) {
  .user-name {
    display: inline;
  }
}

.notification-button {
  position: relative;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: var(--transition);
}

.notification-button:hover {
  background-color: #f7fafc;
}

.notification-icon {
  font-size: 1.25rem;
}

.notification-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #f56565;
  color: white;
  font-size: 0.75rem;
  border-radius: 9999px;
  height: 1.25rem;
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #edf2f7;
  justify-content: space-around;
  align-items: center;
  height: var(--mobile-nav-height);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 767px) {
  .mobile-nav {
    display: flex;
  }
}

.mobile-nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: var(--text-color);
  transition: var(--transition);
}

.mobile-nav-button:hover {
  color: #38a169;
}

.mobile-nav-button.active-mobile-nav {
  color: #38a169;
}

.mobile-button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-nav-icon {
  font-size: 1.125rem;
}

.mobile-nav-text {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* [Continue with the rest of your CSS...] */
</style>