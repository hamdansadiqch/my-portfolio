<template>
  <div class="page-wrapper">
    <Header />

    <main class="gallery-section">
      <h1 class="gallery-title">My Articles</h1>

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

      <div class="references-container">
        <h2 class="references-title">References</h2>
        <div class="references-list">
          <p class="reference-item">
            Chaudhry, H. S. (2025).  Spartan spotlight: Eli Hrychiw, The 300: Fuelling Spartan Spirit Beyond The Court. Mars’ Hill Magazine, 30(1) 23-24.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_01_homeland" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_01_homeland</a><br>
            Chaudhry, H. S. (2025).  Spartan spotlight: Joy Mofolasayo. Mars’ Hill Magazine, 30(2) 25.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_02_dystopia" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_02_dystopia</a><br>
            Chaudhry, H. S. (2025).  Inside TWU ICP's Culture Week, Spartan spotlight: Justin Kiplagat. Mars’ Hill Magazine, 30(3) 12-13, 23.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_03_memento" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_03_memento</a><br>
            Chaudhry, H. S. (2025).  Spartan spotlight: David Saavedra. Mars’ Hill Magazine, 30(4) 17.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_04_jubilee" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_04_jubilee</a><br>
            Chaudhry, H. S. (2026).  Christmas with Cal Townsend, Spartan spotlight: Tate Calles. Mars’ Hill Magazine, 30(5) 13-14, 26.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_05_supernova_d87e8c0a6fb456" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_05_supernova_d87e8c0a6fb456</a><br>
            Chaudhry, H. S. (2026).  Spartan spotlight: Carter Van der Waarde. Mars’ Hill Magazine, 30(6) 21.<br>
            <a href="https://issuu.com/marshillonline/docs/_volume_30_-_issue_06_redamancy" target="_blank">https://issuu.com/marshillonline/docs/_volume_30_-_issue_06_redamancy</a>
          </p>
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
  'Iss.01(1).png',
  'Iss.02(1).png',
  'Iss.02(2).png',
  'Iss.03(1).png',
  'Iss.03(2).png',
  'Iss.03(3).png',
  'Iss.04.png',
  'Iss.05(1).png',
  'Iss.05(2).png',
  'Iss.05(3).png',
  'Iss.06(1).png',
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

/* NEW STYLES FOR REFERENCES */
.references-container {
  margin-top: 3rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding-bottom: 2rem;
}

.references-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.reference-item {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.2rem;
  }
  .slideshow-container {
    max-width: 90%;
  }
  .references-container {
    max-width: 90%;
  }
}
</style>