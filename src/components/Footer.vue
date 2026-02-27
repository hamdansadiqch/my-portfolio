<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="copyright">© 2025 Hamdan Sadiq. All Rights Reserved.</span>

      <div class="footer-socials">
        <a href="https://github.com/hamdansadiqch" target="_blank" class="footer-link" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/hamdan-sadiq-7105b222b/" target="_blank" class="footer-link" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://www.facebook.com/hamdan.sadiq.2025/" target="_blank" class="footer-link" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/hamdansadiqch/" target="_blank" class="footer-link" aria-label="Instagram">
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
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem; 
  background: #000000;
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
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem; /* Slightly smaller for better fit */
}

.footer-socials {
  display: flex;
  gap: 1.2rem; /* Compact spacing */
  align-items: center;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem; /* Smaller icons to fit footer height */
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
}

.footer-link:hover {
  opacity: 0.7;
  transform: translateY(-2px);
}

/* Force Font Awesome styles if they aren't loading */
.fab {
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

/* --- Mobile Responsive Adjustments --- */
@media (max-width: 600px) {
  .footer {
    padding: 0.6rem 1rem; /* Shrinks the top/bottom padding to keep the fixed bar thin */
  }

  .footer-content {
    flex-direction: column;
    gap: 6px; /* Tighter gap between the copyright and the icons */
    text-align: center;
  }

  .copyright {
    font-size: 0.65rem; /* Slightly smaller text to save space */
  }

  .footer-socials {
    gap: 1.5rem; /* Spreads the icons out slightly more so they are easier to tap with a thumb */
  }
}
</style>