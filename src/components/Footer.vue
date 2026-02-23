<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© 2025 Hamdan Sadiq. All Rights Reserved.</span>

      <div class="footer-socials">
        <a href="https://github.com/hamdansadiqch" target="_blank" class="social-link">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/hamdan-sadiq-7105b222b/" target="_blank" class="social-link">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://www.facebook.com/hamdan.sadiq.2025/" target="_blank" class="social-link">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/hamdansadiqch/" target="_blank" class="social-link">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #000000;
  color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Inter', sans-serif;
  z-index: 999;
  border-top: 1px solid #222;
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
}

/* Social Links Container */
.footer-socials {
  display: flex;
  gap: 1.5rem; /* Space between the icons */
  align-items: center;
}

.social-link {
  color: #ffffff;
  font-size: 1.2rem; /* Size of the icons */
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-link:hover {
  color: #888888; /* Muted grey on hover to match your design theme */
  transform: translateY(-3px); /* Subtle lift effect */
}

/* Font Awesome brands font declaration */
.fab {
  font-family: "Font Awesome 5 Brands";
}
</style>