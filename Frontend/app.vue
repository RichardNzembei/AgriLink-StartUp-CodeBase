<template>

  <div class="bg-white dark:bg-white min-h-screen">
    <NuxtPage />
  </div>

</template>
<script setup>
import { useHead } from 'nuxt/app';
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ]
});

if (process.client && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
</script>
