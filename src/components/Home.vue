<template>
  <main class="home">
    <div class="hero-container">
      
      <div class="hero-text">
        <h1>Hamdan Sadiq</h1>
        <p>
          Computer Science student at Trinity Western University. 
          Passionate about front-end development and robotics.
        </p>
        <a href="https://github.com/hamdansadiqch" target="_blank" class="github-btn">
          View My GitHub
        </a>
      </div>

      <div class="slideshow-container" @click="nextImage">
        <div class="image-wrapper">
          <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" class="hero-image" />
          
          <div class="slideshow-overlay">
            <span class="click-hint">Click to cycle</span>
            <div class="dots">
              <span v-for="(img, index) in images" :key="index" :class="['dot', { active: index === currentIndex }]"></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentIndex: 0,
      images: [
        // Remove the leading "/" so the browser looks inside the current folder
        { src: 'image3.jpg', alt: 'Current Profile' },
        { src: 'image2.jpg', alt: 'Teenage Profile' },
        { src: 'image.jpg', alt: 'Childhood Profile' }
      ]
    }
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.home {
  min-height: 85vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: white;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  width: 90%;
  gap: 5rem;
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: -1px;
}

.hero-text p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #a0a0a0;
  margin-bottom: 2.5rem;
  max-width: 450px;
}

.github-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: black;
  text-decoration: none;
  font-weight: 700;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.github-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-3px);
}

.slideshow-container {
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.hero-image {
  width: 100%;
  aspect-ratio: 3/4; 
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #333;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  transition: opacity 0.4s ease-in-out;
}

.slideshow-overlay {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}

.click-hint {
  font-size: 0.8rem;
  background: rgba(0,0,0,0.5);
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
}

.dot.active {
  background: white;
  width: 20px;
  border-radius: 4px;
}

@media (max-width: 850px) {
  .hero-container {
    flex-direction: column-reverse; /* Keeps the photo on top */
    text-align: center;
    padding: 2rem 0; /* Reduced padding to save screen space */
    gap: 2rem; /* Shrunk the 5rem gap so the image and text sit closer together */
  }
  
  .hero-text h1 {
    font-size: 2.5rem; /* Scaled down from 4rem so it fits on small phone screens */
  }

  .hero-text p {
    font-size: 1rem; /* Scaled down slightly for better mobile readability */
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
  }

  .slideshow-container {
    justify-content: center;
    width: 100%;
  }

  .image-wrapper {
    max-width: 280px; /* Shrinks the image slightly so it doesn't take up the entire phone height */
  }
}
</style>