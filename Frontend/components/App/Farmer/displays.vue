<template>
  <div class="displays-container">
    <NuxtLink to="/Farmer/addProducts" class="card-link">
      <div class="card card-add-product">
        <div class="card-overlay"></div>
        <div class="card-content">
          <UIcon name="i-heroicons-plus-circle" size="64" class="card-icon" />
          <h1 class="card-title">Add Product</h1>
          <p class="card-description">List your farm produce to reach new markets.</p>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink to="/Farmer/featuredProducts" class="card-link">
      <div class="card card-products">
        <div class="card-overlay"></div>
        <div class="card-content">
          <UIcon name="i-heroicons-cube" size="64" class="card-icon" />
          <h1 class="card-title">Products</h1>
          <p class="card-description">Manage and showcase your farm inventory.</p>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink to="/Farmer/reviews" class="card-link">
      <div class="card card-reviews">
        <div class="card-overlay"></div>
        <div class="card-content">
          <UIcon name="i-heroicons-star-solid" size="64" class="card-icon" />
          <h1 class="card-title">Reviews</h1>
          <p class="card-description">View feedback from customers and partners.</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.displays-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

.card-link {
  perspective: 1000px;
}

.card {
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card:hover {
  transform: rotateY(10deg) translateY(-10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  z-index: 1;
}

.card-add-product {
  background: url('/images/add-product-bg.jpg') center/cover no-repeat;
}

.card-products {
  background: url('/images/products-bg.jpg') center/cover no-repeat;
}

.card-reviews {
  background: url('/images/reviews-bg.jpg') center/cover no-repeat;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: #ffffff;
}

.card-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: pulse 2s infinite;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.card-description {
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover .card-description {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: 640px) {
  .displays-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  .card {
    height: 280px;
  }
  .card-title {
    font-size: 1.25rem;
  }
  .card-description {
    font-size: 0.75rem;
  }
  .card-icon {
    width: 48px;
    height: 48px;
  }
}

@media (min-width: 1024px) {
  .displays-container {
    gap: 2rem;
  }
  .card {
    height: 360px;
  }
  .card-title {
    font-size: 1.75rem;
  }
}
</style>