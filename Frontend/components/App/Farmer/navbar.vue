<template>
  <nav class="bg-white p-3 fixed top-0 left-0 w-full z-10 shadow-sm">
    <div class="flex justify-between w-full px-4 py-2 bg-white">
      <div class="flex justify-around w-full max-w-md mx-auto space-x-4 sm:space-x-6">
        <!-- Home -->
        <UButton variant="ghost" size="sm" to="/Farmer/dashboard" aria-label="Home"
          class="hover:text-green-600 flex flex-col items-center w-14 sm:w-20">
          <UIcon name="i-heroicons-home-solid" class="text-lg sm:text-2xl mb-1" />
          <span class="hidden sm:block text-xs sm:text-sm">Home</span>
        </UButton>

        <!-- Community -->
        <UButton variant="ghost" size="sm" to="/Farmer/community" aria-label="Community"
          class="hover:text-green-600 flex flex-col items-center w-14 sm:w-20">
          <UIcon name="i-heroicons-users-solid" class="text-lg sm:text-2xl mb-1" />
          <span class="hidden sm:block text-xs sm:text-sm">Community</span>
        </UButton>

        <!-- Profile -->
        <UButton variant="ghost" size="sm" to="/Farmer/profile" aria-label="Profile"
          class="hover:text-green-600 flex flex-col items-center w-14 sm:w-20">
          <UIcon name="i-heroicons-user-solid" class="text-lg sm:text-2xl mb-1" />
          <span class="hidden sm:block text-xs sm:text-sm">Profile</span>
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
}
</style>