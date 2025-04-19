<template>
    <UCard class="consultation-card">
      <template #header>
        <div class="consultation-header">
          <img 
            src="/myproducts/consult.png" 
            alt="Free Consultation" 
            class="consultation-image"
          />
          <div>
            <h2 class="consultation-title">Need Farming Advice?</h2>
            <p class="consultation-subtitle">
              Get instant support from our agricultural experts
            </p>
          </div>
        </div>
      </template>
      
      <div class="consultation-actions">
        <UButton 
          variant="ghost" 
          size="lg" 
          aria-label="Call Support" 
          class="action-button"
          @click="callSupport"
        >
          <UIcon name="i-heroicons-phone-solid" class="action-icon call-icon" />
          <span class="action-text">Call Now</span>
        </UButton>
        
        <UButton 
          variant="ghost" 
          size="lg" 
          aria-label="Chat on WhatsApp" 
          class="action-button"
          @click="chatOnWhatsApp"
        >
          <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-solid" class="action-icon chat-icon" />
          <span class="action-text">WhatsApp</span>
        </UButton>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  const phoneNumber = "+254716899396";
  
  const callSupport = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  
  const chatOnWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };
  </script>
  
  <style scoped>
  .consultation-card {
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    margin-bottom: 1.5rem;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  }
  
  .consultation-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .consultation-image {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #86efac;
  }
  
  .consultation-title {
    font-size: 1rem;
    font-weight: 600;
    color: #166534;
    margin-bottom: 0.25rem;
  }
  
  .consultation-subtitle {
    font-size: 0.875rem;
    color: #4d7c0f;
  }
  
  .consultation-actions {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding-top: 0.5rem;
  }
  
  .action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .action-button:hover {
    background-color: #dcfce7;
    transform: translateY(-2px);
  }
  
  .action-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .call-icon {
    color: #3b82f6;
  }
  
  .chat-icon {
    color: #22c55e;
  }
  
  .action-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1e3a8a;
  }
  
  @media (min-width: 768px) {
    .consultation-actions {
      justify-content: flex-start;
      gap: 3rem;
    }
  }
  </style>