<template>
  <nav class="bg-white p-3 fixed w-full z-10 md:top-0 md:bottom-auto bottom-0">
    <div class="flex justify-between w-full px-4 py-2 bg-white">
      <div class="flex justify-around w-full max-w-md mx-auto space-x-4 md:space-x-6">
        <UButton variant="ghost" size="sm" to="/Farmer/dashboard" aria-label="Home"
          class="hover:text-green-600 flex flex-col items-center w-20">
          <UIcon name="i-heroicons-home-solid" class="text-xl md:text-2xl mb-1" />
          <span class="text-xs md:text-sm">Home</span>
        </UButton>

        <UButton variant="ghost" size="sm" to="/Farmer/community" aria-label="Community"
          class="hover:text-green-600 flex flex-col items-center w-20">
          <UIcon name="i-heroicons-users-solid" class="text-xl md:text-2xl mb-1" />
          <span class="text-xs md:text-sm">Community</span>
        </UButton>

        <UButton variant="ghost" size="sm" to="/Farmer/profile" aria-label="Profile"
          class="hover:text-green-600 flex flex-col items-center w-20">
          <UIcon name="i-heroicons-user-solid" class="text-xl md:text-2xl mb-1" />
          <span class="text-xs md:text-sm">Profile</span>
        </UButton>

        <UButton variant="ghost" size="sm" to="/Farmer/notifications" aria-label="Notifications"
          class="hover:text-green-600 flex flex-col items-center w-20 relative">
          <UChip :text="count" size="sm" class="absolute -top-1 -right-1 bg-red-600 text-white" />
          <UIcon name="i-heroicons-bell-solid" class="text-xl md:text-2xl mb-1 text-green-600" />
          <span class="text-xs md:text-sm">Notifications</span>
        </UButton>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Your script setup code here
</script>

<style scoped>
nav {
  font-family: "Poppins", sans-serif;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  nav {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>