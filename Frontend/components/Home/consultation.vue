<template>
  <UCard class="consultation-card">
    <template #header>
      <div class="consultation-header">
        <div class="image-wrapper">
          <img 
            src="/myproducts/consult.png" 
            alt="Free Consultation" 
            class="consultation-image"
          />
          <div class="pulse-effect"></div>
        </div>
        <div class="header-content">
          <h2 class="consultation-title">Need Farming Advice?</h2>
          <p class="consultation-subtitle">
            Get instant help from our agricultural experts
          </p>
          <div class="expert-status">
            <span class="status-dot"></span>
            <span class="status-text">Experts available now</span>
          </div>
        </div>
      </div>
    </template>
    
    <div class="consultation-actions">
      <UButton 
        block
        size="xl"
        color="green"
        aria-label="Call Support" 
        class="action-button call-button"
        @click="callSupport"
      >
        <UIcon name="i-heroicons-phone-solid" class="action-icon" />
        <span class="action-text">Call Expert</span>
      </UButton>
      
      <UButton 
        block
        size="xl"
        color="emerald"
        aria-label="Chat on WhatsApp" 
        class="action-button whatsapp-button"
        @click="chatOnWhatsApp"
      >
        <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis-solid" class="action-icon" />
        <span class="action-text">Chat on WhatsApp</span>
      </UButton>
    </div>
    
    <div class="consultation-footer">
      <p class="response-time">
        <UIcon name="i-heroicons-clock-solid" class="footer-icon" />
        Average response time: <strong>2 minutes</strong>
      </p>
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
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: none;
  border-radius: 1.25rem;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.consultation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(34, 197, 94, 0.2);
}

.consultation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.consultation-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1.5rem 1rem;
}

.image-wrapper {
  position: relative;
  width: 5rem;
  height: 5rem;
}

.consultation-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.pulse-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 50%;
  z-index: 1;
  animation: pulse 2s infinite;
}

.header-content {
  flex: 1;
}

.consultation-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #166534;
  margin-bottom: 0.375rem;
  line-height: 1.3;
}

.consultation-subtitle {
  font-size: 0.9375rem;
  color: #4d7c0f;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.expert-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.status-text {
  font-size: 0.8125rem;
  color: #4d7c0f;
  font-weight: 500;
}

.consultation-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.consultation-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #dcfce7;
  background: rgba(220, 252, 231, 0.3);
}

.response-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #4d7c0f;
  margin: 0;
}

.footer-icon {
  width: 1rem;
  height: 1rem;
  color: #22c55e;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .consultation-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .expert-status {
    justify-content: center;
  }
  
  .consultation-actions {
    grid-template-columns: 1fr;
  }
  
  .consultation-title {
    font-size: 1.25rem;
  }
}
</style>