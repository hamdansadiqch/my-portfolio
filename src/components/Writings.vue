<template>
  <div class="page-wrapper">
    <Header />

    <main class="gallery-section">
      <h1 class="gallery-title">My Articles</h1>

      <div class="slideshow-container" ref="slideshowRef" @click="nextImage">
        
        <button class="controls-btn fullscreen-btn" @click.stop="toggleFullscreen" title="Toggle Fullscreen">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        </button>

        <button class="controls-btn prev-btn" @click.stop="prevImage" title="Previous Image">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <img 
          :src="imageSources[currentIndex]" 
          alt="Gallery Slide" 
          class="display-image"
        />

        <button class="controls-btn next-btn" @click.stop="nextImage" title="Next Image">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div class="tile-overlay">
          <p class="instruction">CLICK IMAGE OR ARROWS TO CYCLE</p>
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
const slideshowRef = ref(null);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % imageSources.value.length;
};

const prevImage = () => {
  // Adding array length ensures we don't get a negative index in JavaScript
  currentIndex.value = (currentIndex.value - 1 + imageSources.value.length) % imageSources.value.length;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    if (slideshowRef.value?.requestFullscreen) {
      slideshowRef.value.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
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
  max-width: 500px; 
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: #111; /* fallback background */
}

/* Only scale on hover if NOT in fullscreen */
.slideshow-container:not(:fullscreen):hover {
  transform: scale(1.03);
}

.display-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Button Overlays (Arrows & Fullscreen) */
.controls-btn {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease, transform 0.2s ease;
  backdrop-filter: blur(4px);
}

.controls-btn:hover {
  background-color: rgba(0, 0, 0, 0.85);
  transform: scale(1.1);
}

.prev-btn {
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}
.prev-btn:hover {
  transform: translateY(-50%) scale(1.1); /* Preserve Y-translation */
}

.next-btn {
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}
.next-btn:hover {
  transform: translateY(-50%) scale(1.1); /* Preserve Y-translation */
}

.fullscreen-btn {
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
}

/* Bottom Overlay Elements */
.tile-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* Allows clicking through to the image */
}

.instruction {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 12px;
  opacity: 0.9;
}

/* Progress Dots */
.progress-bar-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap; /* Helps if there are many dots on small screens */
  justify-content: center;
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
  width: 24px; 
}

/* --- FULLSCREEN STYLES --- */
.slideshow-container:fullscreen {
  max-width: 100vw;
  height: 100vh;
  border-radius: 0;
  aspect-ratio: auto; /* Remove aspect ratio constraint */
  display: flex;
  justify-content: center;
  align-items: center;
}

.slideshow-container:fullscreen .display-image {
  object-fit: contain; /* Prevents cropping when in fullscreen */
}

/* References */
.references-container {
  margin-top: 3rem;
  width: 100%;
  max-width: 700px;
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
  word-break: break-word; /* Prevents long URLs from breaking layout */
}

.reference-item a {
  color: #fff;
  text-decoration: underline;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.reference-item a:hover {
  opacity: 1;
}

/* Mobile Responsiveness */
/* Mobile Responsiveness */
@media (max-width: 768px) {
  .gallery-section {
    padding: 30px 10px; /* Reduces the massive vertical padding on phones */
  }

  .gallery-title {
    font-size: 2.2rem;
    margin-bottom: 1.5rem; /* Pulls the slideshow closer to the title */
  }

  .slideshow-container {
    max-width: 100%; /* Allows the image to fill the screen width on very small phones */
    border-radius: 12px; /* Slightly smaller border radius for smaller screens */
  }

  .references-container {
    max-width: 100%;
    margin-top: 2rem;
  }

  .reference-item {
    font-size: 0.85rem; /* Shrinks the reference text slightly to fit better */
    margin-bottom: 1.5rem; /* Adds space between each distinct reference */
  }

  .controls-btn {
    width: 36px;
    height: 36px;
  }
  
  /* Make the arrows slightly smaller to avoid covering too much of the article text */
  .prev-btn svg, .next-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>