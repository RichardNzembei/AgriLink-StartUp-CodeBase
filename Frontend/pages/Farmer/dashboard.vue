<template>
    <AppFarmerNavbar />
    <div class="bg-white  px-4 py-6 mt-20">
        <HomeHeader />
        <HomeConsultation />
        <ProductAddProducts/>
        <ProductFeaturedProducts />
    </div>
</template>
<script setup>

useHead({
    title: 'AgriLink-Farmer',
    meta: [
        { name: 'description', content: 'Detailed crop management advice for maximizing your yield.' },
        { property: 'og:title', content: 'Crop Management - Consult.iO' },
        { property: 'og:description', content: 'Expert crop management tips to improve farm productivity.' },
    ],
});
</script>
<style scoped>
body {
    font-family: "Poppins", sans-serif;
}
</style>