<template>
  <nav class="bg-white p-3 fixed top-0 left-0 w-full z-10 shadow-md sm:top-0 sm:bottom-auto sm:flex sm:justify-between sm:space-x-6 sm:px-4 sm:py-2 sm:max-w-md sm:mx-auto sm:space-x-6 sm:items-center">
    <div class="flex justify-around w-full sm:w-auto sm:max-w-md sm:mx-auto space-x-6">
      <!-- Home -->
      <UButton variant="ghost" size="sm" to="/Farmer/dashboard" aria-label="Home"
        class="hover:text-green-600 flex flex-col items-center w-20">
        <UIcon name="i-heroicons-home-solid" size="24" class="mb-1" />
        <span class="text-sm sm:flex hidden">Home</span>
      </UButton>

      <!-- Community -->
      <UButton variant="ghost" size="sm" to="/Farmer/community" aria-label="Community"
        class="hover:text-green-600 flex flex-col items-center w-20">
        <UIcon name="i-heroicons-users-solid" size="24" class="mb-1" />
        <span class="text-sm sm:flex hidden">Community</span>
      </UButton>

      <!-- Profile -->
      <UButton variant="ghost" size="sm" to="/Farmer/profile" aria-label="Profile"
        class="hover:text-green-600 flex flex-col items-center w-20">
        <UIcon name="i-heroicons-user-solid" size="24" class="mb-1" />
        <span class="text-sm sm:flex hidden">Profile</span>
      </UButton>

      <!-- Notifications -->
      <UButton variant="ghost" size="sm" to="/Farmer/notifications" aria-label="Notifications"
        class="hover:text-green-600 flex flex-col items-center w-20 relative">
        <UChip :text="count" size="sm" class="absolute -top-1 -right-1 bg-red-600 text-white" />
        <UIcon name="i-heroicons-bell-solid" size="24" class="mb-1 text-green-600" />
        <span class="text-sm sm:flex hidden">Notifications</span>
      </UButton>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
  font-family: "Poppins", sans-serif;
}
@media (max-width: 640px) {
  nav {
    bottom: 0;
    top: auto;
    position: fixed;
  }
}
</style>
