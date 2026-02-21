<template>
  <main class="home">
    <section class="hero">
      <h1>Welcome To My Portfolio</h1>
      <p class="subtitle"><i>Welcome to my page, my name is Hamdan Sadiq. I am currently pursuing an undergraduate Computer Science degree at Trinity Western University in Canada. Originally from Lahore, Pakistan I have lived most of my life in Dubai, UAE. I am passionate in whatever journey I embark on currently my journey is an exciting Computer Science degree in which I have developed a lot of interest in front end programming. My life quote is by my favorite Formula 1 driver Max Verstappen: "I believe I am the best because every driver needs to think like that or it's better to stay at home!"</i></p>
    </section>

    <section class="features">
      <div class="feature-card">
        <img src="/image.jpg" alt="Me as a kid" class="feature-image">
      </div>
      <div class="feature-card">
        <img src="/image2.jpg" alt="Me as a teen" class="feature-image">
      </div>
      <div class="feature-card">
        <img src="/image3.jpg" alt="Me as a teen" class="feature-image">
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  padding-top: 10px;
  min-height: 100vh;
  background-color: white;
}

.hero {
  text-align: center;
  padding: 2rem 1rem;
  background-color: #f5f5f5;
  margin-top: 0;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 0;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
}

.feature-image {
  width: 100%;
  height: 200px; /* Fixed height for consistency */
  object-fit: contain; /* Ensures image covers the space nicely */
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>