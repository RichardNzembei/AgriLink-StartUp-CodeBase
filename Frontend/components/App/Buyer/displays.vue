<template>
    <div class=" sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 justify-center items-center">
      
      <!-- Farmers Card -->
      <NuxtLink to="/Buyer/farmers">
        <div class="w-36 h-36 sm:w-56 sm:h-56 bg-green-500 text-white border-4 border-green-700 rounded-2xl shadow-lg 
            flex flex-col justify-center items-center cursor-pointer hover:bg-green-600 
            transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
          <UIcon name="i-heroicons-user-group-solid" size="36" class="mb-2 animate-bounce" />
          <h1 class="mt-2 text-lg sm:text-xl font-semibold">Farmers</h1>
        </div>
      </NuxtLink>
  
      <!-- Products Card -->
      <NuxtLink to="/Buyer/products">
        <div class="w-36 h-36 sm:w-56 sm:h-56 bg-gradient-to-br from-green-200 to-green-400 text-green-900 border-2 border-green-400 rounded-2xl shadow-xl 
            flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-300 hover:to-green-500 
            transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">
          
          <div class="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          
          <UIcon name="i-heroicons-cube-solid" size="36" class="mb-2 text-green-700 animate-float" />
          <span class="text-lg sm:text-xl font-semibold z-10">Products</span>
        </div>
      </NuxtLink>
  
      <!-- Reviews Card -->
      <NuxtLink to="/Buyer/reviews">
        <div class="w-36 h-36 sm:w-56 sm:h-56 bg-yellow-400 text-white border-4 border-yellow-600 rounded-2xl shadow-lg 
            flex flex-col justify-center items-center cursor-pointer hover:bg-yellow-500 
            transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
          <UIcon name="i-heroicons-star-solid" size="36" class="mb-2 animate-bounce" />
          <h1 class="mt-2 text-lg sm:text-xl font-semibold">Reviews</h1>
        </div>
      </NuxtLink>

  
    </div>
  </template>
  