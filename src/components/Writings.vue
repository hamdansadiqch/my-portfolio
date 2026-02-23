<template>
  <div class="page-wrapper">
    <Header />

    <main class="gallery-section">
      <h1 class="gallery-title">My Projects</h1>

      <div class="slideshow-container" @click="cycleImage">
        <img 
          :src="imageSources[currentIndex]" 
          alt="Gallery Slide" 
          class="display-image"
        />
        
        <div class="tile-overlay">
          <p class="instruction">CLICK TO CYCLE</p>
          <div class="progress-bar-container">
            <div 
              v-for="(dot, index) in imageSources" 
              :key="index" 
              :class="['progress-dot', { active: index === currentIndex }]"
            ></div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imageSources = ref([
  'Iss.01.png',
  'Iss.02(1).png',
  'Iss.02(2).png',
  'Iss.03(1).png',
  'Iss.03(2).png',
  'Iss.03(3).png',
  'Iss.04.png',
  'Iss.05(1).png',
  'Iss.05(2).png',
  'Iss.05(3).png',
  'Iss.06.png',
]);

const currentIndex = ref(0);

const cycleImage = () => {
  currentIndex.value = (currentIndex.value + 1) % imageSources.value.length;
};
</script>

<style scoped>
/* Main Page Container */
.page-wrapper {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* Use the font-family from your main site here */
  font-family: 'Inter', sans-serif; 
}

/* Centering Logic */
.gallery-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

/* Title Styling */
.gallery-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  letter-spacing: -1px;
}

/* Slideshow Tile */
.slideshow-container {
  position: relative;
  width: 100%;
  max-width: 500px; /* Adjust to match your original tile size */
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slideshow-container:hover {
  transform: scale(1.03);
}

.display-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Bottom Overlay Elements */
.tile-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.instruction {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 12px;
  opacity: 0.9;
}

/* Progress Dots (The White Pill Bars) */
.progress-bar-container {
  display: flex;
  gap: 8px;
}

.progress-dot {
  width: 16px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background-color: #fff;
  width: 24px; /* Slight expansion for active state */
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.2rem;
  }
  .slideshow-container {
    max-width: 90%;
  }
}
</style>