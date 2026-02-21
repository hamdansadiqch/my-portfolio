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
  padding-top: 60px; /* For header */
  padding-bottom: 60px; 
}
</style>
