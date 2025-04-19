<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4 sm:p-6">
      <!-- Header Section -->
      <header class="w-full max-w-6xl flex flex-col items-center text-center mb-8 sm:mb-12">
        <div class="relative">
          <img src="../assets/img/logo.png" alt="Agriculture Market Connect Logo"
            class="logo-image" />
        </div>
        
        <h1 class="main-heading">
          Welcome to <span class="text-gradient">AgriLink Africa Connect</span>
        </h1>
        
        <p class="subheading">
          Bridging farmers and buyers across Kenya with our seamless marketplace. 
          Empowering agriculture, strengthening communities, and delivering fresh, 
          locally-sourced products to your doorstep.
        </p>
      </header>
  
      <!-- Features Section -->
      <main class="w-full max-w-6xl">
        <div class="features-grid">
          <!-- Farmer Card -->
          <div class="feature-card group">
            <div class="image-container">
              <img src="../assets/img/farmer-ui.jpg" alt="Farmers" class="feature-image" />
              <h2 class="feature-title">For Farmers</h2>
            </div>
            <div class="feature-content">
              <p class="feature-description">
                List your produce, set competitive prices, and connect directly with buyers. 
                Grow your business with our transparent marketplace designed for agricultural success.
              </p>
              <ul class="feature-benefits">
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Direct buyer connections
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Fair pricing control
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Market insights
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Buyer Card -->
          <div class="feature-card group">
            <div class="image-container">
              <img src="../assets/img/coonect.jpg" alt="Buyers" class="feature-image" />
              <h2 class="feature-title">For Buyers</h2>
            </div>
            <div class="feature-content">
              <p class="feature-description">
                Discover the freshest local produce, connect directly with farmers, 
                and negotiate fair prices. Quality products straight from farm to you.
              </p>
              <ul class="feature-benefits">
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Farm-fresh quality
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Direct farmer connections
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Competitive pricing
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Impact Card -->
          <div class="feature-card group">
            <div class="image-container">
              <img src="../assets/img/link.jpg" alt="Map of Africa highlighting Kenya" class="feature-image" />
              <h2 class="feature-title">Our Impact</h2>
            </div>
            <div class="feature-content">
              <p class="feature-description">
                Strengthening Kenya's agricultural economy by connecting local farmers 
                with buyers nationwide. Together we grow.
              </p>
              <ul class="feature-benefits">
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Community empowerment
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Economic growth
                </li>
                <li class="benefit-item">
                  <svg class="benefit-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Sustainable agriculture
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- CTA Section -->
        <div class="cta-section">
          <nuxt-link to="/register" class="cta-button">
            Get Started Today
            <svg class="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </nuxt-link>
          <p class="cta-subtext">
            Join thousands of farmers and buyers already growing with AgriLink
          </p>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="page-footer">
        <p>© 2023 AgriLink Africa Connect. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  /* CSS Variables for Typography */
  :root {
    --font-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-heading: 'Poppins', var(--font-base);
    
    /* Fluid typography scales */
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
    --text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
    --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
    --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
    --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
    --text-3xl: clamp(1.75rem, 1.4rem + 1.75vw, 3rem);
    --text-4xl: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);
    --text-5xl: clamp(2.5rem, 1.75rem + 3.75vw, 4.5rem);
    
    /* Line heights */
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
  }
  
  /* Base font family */
  body {
    font-family: var(--font-base);
  }
  
  /* Logo Image */
  .logo-image {
    width: clamp(7rem, 6rem + 5vw, 10rem);
    height: auto;
    margin: 0 auto clamp(1.5rem, 1rem + 2vw, 2.5rem);
    border-radius: 50%;
    border: 4px solid #38a169;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .logo-image:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* Main Heading */
  .main-heading {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    line-height: var(--leading-tight);
    font-weight: 800;
    color: #1a202c;
    margin-bottom: clamp(1rem, 0.5rem + 2vw, 2rem);
  }
  
  @media (min-width: 768px) {
    .main-heading {
      font-size: var(--text-4xl);
    }
  }
  
  @media (min-width: 1024px) {
    .main-heading {
      font-size: var(--text-5xl);
    }
  }
  
  /* Subheading */
  .subheading {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: #4a5568;
    margin-bottom: clamp(2rem, 1.5rem + 2vw, 3rem);
    max-width: 60ch;
  }
  
  /* Features Grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: clamp(1rem, 0.5rem + 2vw, 2rem);
    margin-bottom: clamp(2rem, 1.5rem + 2vw, 3rem);
  }
  
  /* Feature Card */
  .feature-card {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  /* Image Container */
  .image-container {
    position: relative;
    height: clamp(12rem, 10rem + 10vw, 18rem);
    overflow: hidden;
  }
  
  .feature-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .feature-card:hover .feature-image {
    transform: scale(1.1);
  }
  
  .image-container::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  }
  
  /* Feature Title */
  .feature-title {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    color: white;
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover .feature-title {
    transform: translateY(-0.5rem);
  }
  
  /* Feature Content */
  .feature-content {
    padding: clamp(1rem, 0.75rem + 1vw, 1.5rem);
  }
  
  .feature-description {
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: #4a5568;
    margin-bottom: clamp(1rem, 0.75rem + 1vw, 1.5rem);
  }
  
  /* Feature Benefits */
  .feature-benefits {
    display: grid;
    gap: 0.5rem;
  }
  
  .benefit-item {
    display: flex;
    align-items: center;
    font-size: var(--text-sm);
    color: #2f855a;
  }
  
  .benefit-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    fill: currentColor;
  }
  
  /* CTA Section */
  .cta-section {
    text-align: center;
    margin-bottom: clamp(1.5rem, 1rem + 2vw, 3rem);
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    padding: clamp(0.75rem, 0.5rem + 1vw, 1rem) clamp(1.5rem, 1rem + 2vw, 2rem);
    background: linear-gradient(to right, #38a169, #2f855a);
    color: white;
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    border-radius: 9999px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background: linear-gradient(to right, #2f855a, #276749);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
  
  .cta-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
  }
  
  .cta-subtext {
    margin-top: 1rem;
    font-size: var(--text-sm);
    color: #718096;
  }
  
  /* Page Footer */
  .page-footer {
    width: 100%;
    max-width: 80rem;
    border-top: 1px solid #e2e8f0;
    padding-top: clamp(1rem, 0.5rem + 2vw, 1.5rem);
    margin-top: clamp(1rem, 0.5rem + 2vw, 2rem);
    text-align: center;
    font-size: var(--text-xs);
    color: #718096;
  }
  
  /* Text Gradient */
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #38a169, #2f855a);
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  header, main, footer {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  header { animation-delay: 0.1s; }
  main { animation-delay: 0.3s; }
  footer { animation-delay: 0.5s; }
  </style>