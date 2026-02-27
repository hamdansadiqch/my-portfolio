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
body {
  margin: 0;
  font-family: Arial, sans-serif;
  padding-top: 60px; /* For desktop header */
  padding-bottom: 60px; /* For desktop footer */
}

/* Adjust padding for mobile devices */
@media (max-width: 768px) {
  body {
    /* Increases padding slightly on phones in case the header/footer stack and get taller */
    padding-top: 80px; 
    padding-bottom: 80px;
  }
}
</style>