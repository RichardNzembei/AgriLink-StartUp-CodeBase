
<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Navbar -->
    <AppFarmerNavbar />

    <!-- Main Content -->
    <div class="py-8 px-4 space-y-8">
      <!-- Header -->
      <div class="bg-green-700 text-white p-4 rounded-2xl shadow-md">
        <h1 class="text-xl font-bold">Yearly Farming Insights</h1>
        <p class="text-sm">Tracking your 2025 progress</p>
      </div>
  
      <!-- Summary Cards -->
      <div class="flex space-x-4 overflow-x-auto">
        <div
          v-for="(item, idx) in summaryCards"
          :key="idx"
          class="min-w-[160px] bg-white shadow rounded-xl p-4 text-center"
        >
          <div class="text-3xl">{{ item.icon }}</div>
          <p class="text-md font-semibold mt-2">{{ item.title }}</p>
          <p class="text-sm text-gray-600">{{ item.value }}</p>
        </div>
      </div>
  
      <!-- Crop Performance -->
      <div class="shadow rounded-xl p-4 bg-white">
        <h2 class="font-bold mb-4">Crop Performance</h2>
        <div v-for="(item, idx) in yieldData" :key="idx" class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span>{{ item.crop }}</span>
            <span>{{ item.yield }} / {{ item.target }} kg</span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full">
            <div
              class="h-2 rounded-full"
              :class="{
                'bg-green-500': item.yield / item.target >= 0.8,
                'bg-yellow-500': item.yield / item.target >= 0.5 && item.yield / item.target < 0.8,
                'bg-red-500': item.yield / item.target < 0.5
              }"
              :style="{ width: (item.yield / item.target * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
  
  <!-- Expenses Chart -->
<div class="shadow rounded-xl p-4 bg-white">
  <h2 class="font-bold mb-4">Input Usage & Expenses</h2>
  <div class="w-full h-64">
    <v-chart :option="chartOptions" autoresize class="w-full h-full" />
  </div>
  <button class="mt-4 w-full border border-gray-300 py-2 rounded-md">Download Report</button>
</div>

  
      <!-- Tips Section -->
      <div class="shadow rounded-xl p-4 bg-white space-y-4">
        <h2 class="font-bold">Tips & Recommendations</h2>
        <div
          v-for="(tip, idx) in tips"
          :key="idx"
          class="flex gap-3 items-start bg-gray-50 p-3 rounded-xl"
        >
          <div class="text-xl">{{ tip.icon }}</div>
          <div>
            <p class="font-semibold text-sm">{{ tip.title }}</p>
            <p class="text-xs text-gray-600">{{ tip.tip }}</p>
          </div>
        </div>
      </div>
  
      <!-- Floating Action Button -->
      <button class="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg text-white bg-green-600 text-2xl">
        +
      </button>
    </div>
    </div>
  </template>
  
  <script setup>
  const summaryCards = [
    { title: 'Total Yield', value: '12,400 kg', icon: '🌽' },
    { title: 'Revenue', value: 'KES 540,000', icon: '💰' },
    { title: 'Expenses', value: 'KES 190,000', icon: '🧾' },
    { title: 'Active Fields', value: '6', icon: '🧑‍🌾' }
  ];
  
  const yieldData = [
    { crop: 'Maize', yield: 8000, target: 10000 },
    { crop: 'Tomatoes', yield: 4400, target: 5000 }
  ];
  
  const chartOptions = {
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
    series: [
      {
        name: 'Expenses',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: '{b}: {c} KES ({d}%)'
        },
        data: [
          { value: 20000, name: 'Seeds' },
          { value: 40000, name: 'Fertilizer' },
          { value: 80000, name: 'Labor' },
          { value: 50000, name: 'Irrigation' }
        ]
      }
    ]
  };
  
  const tips = [
    { title: 'Prepare for Long Rains', tip: 'Apply mulch to retain soil moisture', icon: '🌧' },
    { title: 'Soil Check', tip: 'Consider liming if pH drops below 5.5', icon: '🧪' },
    { title: 'Market Alert', tip: 'Maize prices rising in Wote market', icon: '📈' }
  ];
  </script>
  
  <style scoped>
  /* Add any scoped styles if needed */
  </style>