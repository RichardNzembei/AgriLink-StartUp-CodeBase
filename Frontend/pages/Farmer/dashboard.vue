<template>
    <AppFarmerNavbar />
    <div class="dashboard-container">
      <HomeHeader />
      <div class="dashboard-content">
        <HomeConsultation />
        <AppFarmerDisplays />
      </div>
    </div>
  </template>
  
  <script setup>
  useHead({
    title: 'AgriLink - Farmer Dashboard',
    meta: [
      { 
        name: 'description', 
        content: 'Your comprehensive farming management dashboard for better agricultural productivity.' 
      },
      { 
        property: 'og:title', 
        content: 'Farmer Dashboard | AgriLink Africa' 
      },
      { 
        property: 'og:description', 
        content: 'Manage your farm products, get support, and track your agricultural business.' 
      },
    ],
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    background-color: #f8fafc;
    min-height: 100vh;
    padding: 1rem;
    padding-top: 5rem;
    font-family: 'Poppins', sans-serif;
  }
  
  .dashboard-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .dashboard-container {
      padding: 2rem;
      padding-top: 6rem;
    }
  }
  </style>