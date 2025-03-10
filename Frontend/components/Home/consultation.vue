<script setup lang="ts">
import type { _backgroundColor } from '#tailwind-config/theme';

</script>

<template>
    <UCard class="mb-6 bg-green-50" :style="{backgroundColor:'#d4edda'}">
        <template #header>
            <div class="flex items-center">
                <img src="/myproducts/consult.png" alt="Free Consultation" class="w-10 h-10 rounded-full mr-4" />
                <div>
                    <h2 class="text-sm font-semibold text-black">Free Consultation</h2>
                    <p class="text-xs text-gray-500">
                        Get free support from our customer service
                    </p>
                </div>
            </div>
        </template>
        <div class="space-x-8">
            <UButton variant="ghost" size="lg" aria-label="Chat" class="hover:bg-green-100 p-4 rounded-full">
                <UIcon name="i-heroicons-phone-solid" size="32" class="text-green-600" />
            </UButton>
            <UButton variant="ghost" size="lg" aria-label="Chat" class="hover:bg-green-100 p-4 rounded-full">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-solid" size="32" class="text-green-600" />
            </UButton>
        </div>
    </UCard>
</template>