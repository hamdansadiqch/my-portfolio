<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue' 
</script>

<template>
  <Header />
  <router-view /> <!-- Shows Home, Socials, Experience, etc. -->
  <Footer /> 
</template>

<style>
/* Forces the background on the absolute highest level of the website */
body, html {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #000000 !important; 
}

#app {
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  padding-top: 60px; 
  padding-bottom: 60px; 
  color: #ffffff; 
  
  /* UPDATED TO .JPG HERE */
  background-image: url('./assets/image1.jpg') !important; 
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important; 
}

/* Adjust padding for mobile devices */
@media (max-width: 768px) {
  #app {
    padding-top: 80px; 
    padding-bottom: 80px;
  }
}
</style>