<template>
  <nav class="bg-white  p-4 fixed top-0 left-0 w-full z-10">
    <div class="flex justify-center items-center max-w-7xl mx-auto">


      <!-- Links -->
      <div class="flex space-x-4">
        <UButton variant="ghost" size="sm" to="/Buyer/dashboard" aria-label="Home"
          class="hover:text-green-600 flex flex-col items-center">
          <UIcon name="i-heroicons-home-solid" size="24" class="mb-1" />
          <span class="text-sm">Home</span>
        </UButton>
        <UButton variant="ghost" size="sm" to="/Buyer/products" aria-label="Reviews"
          class="hover:text-green-600 flex flex-col items-center">
          <UIcon name="i-heroicons-shopping-bag-solid" size="24" class="mb-1" />
          <span class="text-sm">Products</span>
        </UButton>

        <UButton variant="ghost" size="sm" to="/Buyer/reviews" aria-label="Reviews"
          class="hover:text-green-600 flex flex-col items-center">
          <UIcon name="i-heroicons-chat-bubble-left-right-solid" size="24" class="mb-1" />
          <span class="text-sm">Reviews</span>
        </UButton>


        <UButton variant="ghost" size="sm" to="/Buyer/profile" aria-label="Profile"
          class="hover:text-green-600 flex flex-col items-center">
          <UIcon name="i-heroicons-user-solid" size="24" class="mb-1" />
          <span class="text-sm">Profile</span>
        </UButton>

      </div>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>
nav {
  font-family: "Poppins", sans-serif;
}
</style>