<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-8 place-items-center">
    <NuxtLink to="/Farmer/addProducts">
      <div class="w-36 h-36 sm:w-56 sm:h-56 bg-green-500 text-white border-4 border-green-700 rounded-2xl shadow-lg 
          flex flex-col justify-center items-center cursor-pointer hover:bg-green-600 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative">
        
        <UIcon name="i-heroicons-plus-circle" size="48" class="text-white mb-2 animate-bounce" />
        <h1 class="mt-2 text-lg sm:text-xl font-semibold text-center">Add Product</h1>
      </div>
    </NuxtLink>

    <NuxtLink to="/Farmer/featuredProducts">
      <div class="w-36 h-36 sm:w-56 sm:h-56 bg-gradient-to-br from-green-200 to-green-400 text-green-900 border-2 border-green-400 rounded-2xl shadow-xl 
          flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-300 hover:to-green-500 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">
        
        <div class="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <UIcon name="i-heroicons-cube" size="48" class="text-green-700 mb-2 animate-float" />
        <span class="text-lg sm:text-xl font-semibold text-center z-10">Products</span>
      </div>
    </NuxtLink>

    <NuxtLink to="/Farmer/reviews">
      <div class="w-36 h-36 sm:w-56 sm:h-56 bg-yellow-400 text-white border-4 border-yellow-600 rounded-2xl shadow-lg 
          flex flex-col justify-center items-center cursor-pointer hover:bg-yellow-500 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
        <UIcon name="i-heroicons-star-solid" size="32" class="mb-2 animate-bounce" />
        <h1 class="mt-2 text-lg sm:text-xl font-semibold text-center">Reviews</h1>
      </div>
    </NuxtLink>
  </div>
</template>
