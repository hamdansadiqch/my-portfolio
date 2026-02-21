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
  /* Match the site theme */
  background-color: #000000; 
  padding-top: 100px; /* Space for the fixed header */
  padding-bottom: 100px; /* Space for the fixed footer */
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  /* High contrast white text */
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  /* Match the header/footer black */
  background: #000000; 
  border-radius: 10px;
  padding: 2rem 1.5rem;
  /* Replace blue shadow with a clean white border like the photo theme */
  border: 1px solid #ffffff; 
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-card:hover {
  transform: translateY(-5px);
  /* Subtle white glow on hover */
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  background-color: #111111;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  /* Icon becomes bright white */
  color: #ffffff;
}

.social-card h3 {
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.social-card p {
  /* Muted grey to match the footer details */
  color: #888888; 
  margin: 0;
}

/* Font Awesome icons */
.fab {
  font-family: "Font Awesome 5 Brands";
}

.socials-image {
  width: 100%;
  height: 200px; 
  object-fit: contain; 
  border-radius: 4px;
  margin-bottom: 1rem;
  /* Keep image crisp on black background */
  filter: brightness(0.9);
}
</style>