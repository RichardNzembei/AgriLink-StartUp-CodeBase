<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6">

        <img src="../assets/img/logo.png" alt="Agriculture Market Connect Logo"
            class="w-28 sm:w-32 md:w-40 lg:w-40 xl:w-40 h-28 sm:h-32 md:h-40 lg:h-40 xl:h-40 mx-auto mb-6 rounded-full border-4 border-green-600 shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out" />
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-4 text-center">
            Welcome to AgriLink Africa Connect!
        </h1>
        <p class="text-gray-800 mb-8 text-center text-md sm:text-lg md:text-xl max-w-3xl px-4">
            At AgriLink Africa Connect, we bridge the gap between farmers and buyers, creating a seamless marketplace
            for local produce. Join us in strengthening Kenya’s agricultural economy by empowering farmers and providing
            buyers with fresh, locally-sourced products.
        </p>
        <div class="flex flex-wrap justify-center gap-12 w-full px-4">

            <div
                class="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-6 sm:space-y-0 max-w-md text-center sm:text-left">
                <div class="sm:w-1/2 space-y-4">
                    <h2 class="text-md sm:text-xl md:text-2xl font-semibold text-green-600">For Farmers</h2>
                    <p class="text-gray-700 text-sm sm:text-base md:text-lg">
                        Farmers can list their produce, set prices, and directly connect with buyers, opening up
                        opportunities for growth and sustainability.
                    </p>
                </div>
                <img src="../assets/img/farmer-ui.jpg" alt="Farmers"
                    class="w-full sm:w-40 md:w-48 lg:w-56 h-40 sm:h-48 object-cover rounded-lg shadow-md" />
            </div>
            <div
                class="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-6 sm:space-y-0 max-w-md text-center sm:text-left">
                <div class="sm:w-1/2 space-y-4">
                    <h2 class="text-md sm:text-xl md:text-2xl font-semibold text-green-600">For Buyers</h2>
                    <p class="text-gray-700 text-sm sm:text-base md:text-lg">
                        Buyers can browse fresh produce, connect with farmers, and negotiate for fair prices, ensuring
                        access to the best local products.
                    </p>
                </div>
                <img src="../assets/img/coonect.jpg" alt="Buyers"
                    class="w-full sm:w-40 md:w-48 lg:w-56 h-40 sm:h-48 object-cover rounded-lg shadow-md" />
            </div>

            <div
                class="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-6 sm:space-y-0 max-w-md text-center sm:text-left">
                <div class="sm:w-1/2 space-y-4">
                    <h2 class="text-md sm:text-xl md:text-2xl font-semibold text-green-600">Empowering Kenya</h2>
                    <p class="text-gray-700 text-sm sm:text-base md:text-lg">
                        AgriLink Africa Connect aims to boost Kenya’s agricultural economy by connecting local
                        farmers with buyers across the region.
                    </p>
                </div>
                <img src="../assets/img/link.jpg" alt="Map of Africa highlighting Kenya"
                    class="w-full sm:w-40 md:w-48 lg:w-56 h-40 sm:h-48 object-cover rounded-lg shadow-md" />
            </div>

        </div>
        <nuxt-link to="/register"
            class="bg-green-400 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 mt-10">
            Get Started
        </nuxt-link>

    </div>
</template>

<style scoped>
body {
    background-color: #fafafa;
}


.hover\:scale-105:hover {
    transform: scale(1.05);
}
</style>