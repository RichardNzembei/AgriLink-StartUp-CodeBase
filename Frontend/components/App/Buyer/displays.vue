<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 justify-center items-center">
    <NuxtLink to="/Buyer/farmers">
      <div class="w-full h-36 sm:w-48 sm:h-48 bg-green-500 text-white border-4 border-green-700 rounded-2xl shadow-lg 
          flex flex-col justify-center items-center cursor-pointer hover:bg-green-600 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
        <UIcon name="i-heroicons-user-group-solid" size="28" class="mb-2 animate-bounce" />
        <h1 class="mt-2 text-lg sm:text-xl font-semibold">Farmers</h1>
      </div>
    </NuxtLink>
    <NuxtLink to="/Buyer/products">
      <div class="w-full h-36 sm:w-48 sm:h-48 bg-gradient-to-br from-green-200 to-green-400 text-green-900 border-2 border-green-400 rounded-2xl shadow-xl 
          flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-300 hover:to-green-500 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">
        
        <div class="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        
        <UIcon name="i-heroicons-cube-solid" size="28" class="mb-2 text-green-700 animate-float" />
        <span class="text-lg sm:text-xl font-semibold z-10">Products</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/Buyer/reviews">
      <div class="w-full h-36 sm:w-48 sm:h-48 bg-yellow-400 text-white border-4 border-yellow-600 rounded-2xl shadow-lg 
          flex flex-col justify-center items-center cursor-pointer hover:bg-yellow-500 
          transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
        <UIcon name="i-heroicons-star-solid" size="28" class="mb-2 animate-bounce" />
        <h1 class="mt-2 text-lg sm:text-xl font-semibold">Reviews</h1>
      </div>
    </NuxtLink>
  </div>
</template>