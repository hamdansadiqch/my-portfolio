<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/experience" class="nav-link">Resume</router-link>
        <router-link to="/project" class="nav-link">Project</router-link>
        <router-link to="/socials" class="nav-link">Socials</router-link>
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
</style>