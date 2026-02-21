<template>
  <main class="socials-page">
    <h1 class="page-title">My Socials</h1>
    <div class="socials-container">
      <!-- GitHub Card -->
      <div class="social-card" @click="openUrl('https://github.com/hamdansadiqch')">
        <div class="card-icon">
          <i class="fab fa-github"></i>
        </div>
        <img src="/github.png" alt="GitHub Logo" class="socials-image">
        <h3>GitHub</h3>
        <p>Check out my coding projects</p>
      </div>

      <!-- LinkedIn Card -->
      <div class="social-card" @click="openUrl('https://www.linkedin.com/in/hamdan-sadiq-7105b222b/')">
        <div class="card-icon">
          <i class="fab fa-linkedin"></i>
        </div>
        <img src="/linkedin.png" alt="Linkedin Logo" class="socials-image">
        <h3>LinkedIn</h3>
        <p>Connect with me professionally</p>
      </div>

      <div class="social-card" @click="openUrl('https://www.facebook.com/hamdan.sadiq.2025/')">
        <div class="card-icon">
          <i class="fab fa-facebook"></i>
        </div>
        <img src="/facebook.png" alt="FaceBook logo" class="socials-image">
        <h3>Facebook</h3>
        <p>Let’s connect on Facebook</p>
      </div>
      <div class="social-card" @click="openUrl('https://www.instagram.com/hamdansadiqch/')">
        <div class="card-icon">
          <i class="fab fa-instagram"></i>
        </div>
        <img src="/instagram.png" alt="Insta logo" class="socials-image">
        <h3>Instagram</h3>
        <p>See my life updates</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SocialsPage',
  methods: {
    openUrl(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
.socials-page {
  padding: 2rem;
  min-height: 100vh;
  text-align: center;
  background-color: white;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: black;
}

.socials-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.social-card {
  background: white;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px #18334f;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #555;
}

.social-card h3 {
  margin-bottom: 0.5rem;
  color: #222;
}

.social-card p {
  color: #666;
  margin: 0;
}

/* Font Awesome icons */
.fab {
  font-family: "Font Awesome 5 Brands";
}
.socials-image {
  width: 100%;
  height: 200px; /* Fixed height for consistency */
  object-fit: contain; /* Ensures image covers the space nicely */
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>