<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/experience" class="nav-link">My Experience</router-link>
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
  background-color: #0f5158;
  color: rgb(242, 255, 2);
  padding: 1rem 0;
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
  justify-content: center; /* Changed from space-between to center */
  align-items: center;
  padding: 0 1rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: rgb(225, 255, 0);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.nav-link.router-link-exact-active {
  background-color: #155930;
}
</style>