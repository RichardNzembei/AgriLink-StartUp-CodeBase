<template>
  <div class="dashboard-grid">
    <NuxtLink to="/Farmer/addProducts" class="dashboard-card add-product-card">
      <div class="card-content">
        <UIcon name="i-heroicons-plus-circle" class="card-icon" />
        <h2 class="card-title">Add Product</h2>
        <p class="card-description">List your farm produce for sale</p>
      </div>
      <div class="card-pattern"></div>
    </NuxtLink>

    <NuxtLink to="/Farmer/featuredProducts" class="dashboard-card view-products-card">
      <div class="card-content">
        <UIcon name="i-heroicons-cube" class="card-icon" />
        <h2 class="card-title">My Products</h2>
        <p class="card-description">Manage your listed items</p>
      </div>
      <div class="card-pattern"></div>
    </NuxtLink>

    <NuxtLink to="/Farmer/reviews" class="dashboard-card reviews-card">
      <div class="card-content">
        <UIcon name="i-heroicons-star-solid" class="card-icon" />
        <h2 class="card-title">Customer Reviews</h2>
        <p class="card-description">See buyer feedback</p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.dashboard-card {
  position: relative;
  height: 240px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-content {
  position: relative;
  z-index: 10;
  color: white;
}

.card-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.dashboard-card:hover .card-icon {
  transform: scale(1.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  opacity: 0.9;
}

.card-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 10px 10px;
  opacity: 0.5;
}

.add-product-card {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 2px solid #34d399;
}

.view-products-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: 2px solid #60a5fa;
}

.reviews-card {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 2px solid #fbbf24;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .dashboard-card {
    height: 280px;
  }
}
</style>