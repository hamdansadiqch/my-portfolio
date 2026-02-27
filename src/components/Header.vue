<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/experience" class="nav-link">Resume</router-link>
        <router-link to="/project" class="nav-link">Projects</router-link>
        <router-link to="/writings" class="nav-link">Writings</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background-color: #000000; /* Pure Black as seen in the photo */
  color: #ffffff;
  padding: 1.5rem 0; /* Slightly taller for that premium feel */
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  width: 100%; 
  z-index: 1000; 
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 0 1rem;
}

.nav {
  display: flex;
  gap: 0.5rem; /* Tighter gap to match the boxed look */
}

.nav-link {
  color: #888888; /* Muted grey for inactive links */
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 2px; /* Sharper corners like the photo */
  font-family: 'Inter', sans-serif; /* Cleaner font for that look */
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase; /* Match the professional style */
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffffff; /* Glow to white on hover */
}

/* This is the key: The white box with black text from the photo */
.nav-link.router-link-active {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-radius: 0; /* Sharp square edges */
}

/* --- Mobile Responsive Adjustments --- */
@media (max-width: 768px) {
  .header {
    padding: 1rem 0; /* Slightly reduces the top/bottom black space on phones */
  }

  .nav {
    flex-wrap: wrap; /* The magic rule: lets links drop to the next line */
    justify-content: center; /* Keeps the wrapped links perfectly centered */
    gap: 0.25rem; /* Reduces the gap slightly to save space */
  }

  .nav-link {
    padding: 0.5rem 0.8rem; /* Reduces the invisible box around the text */
    font-size: 0.75rem; /* Shrinks the text just a bit */
    letter-spacing: 0.5px; /* Tightens the letters to fit more words on one line */
  }
}
</style>