<template>
  <main class="about-page">
    <section class="about-content">
      <h1 class="title">About Me</h1>
      <p class="tagline">Building the intersection of technology, storytelling, and innovation.</p>

      <div class="about-card">
        <p>
          I am a driven and curious <strong>third year Sciences in Computer Science student</strong> with a strong interest in problem-solving, creativity, and continuous growth. I enjoy approaching challenges with intention and reflection, using technology not only as a logical discipline but as a medium for innovation and meaningful impact.
        </p>

        <p>
          Beyond computing, I have a deep passion for <strong>sports journalism and storytelling</strong>. This interest has led me to contribute as a writer for <strong>Mars’ Hill Magazine</strong> at my university, where I combine analytical thinking with creative expression to cover sports, campus culture, and student life. Writing allows me to explore the human side of competition and community, complementing my technical mindset.
        </p>

        <p>
          Adaptable, resilient, and focused, I thrive in fast-paced and high-pressure environments. I am motivated by learning, collaboration, and pushing beyond comfort zones to refine both my technical and creative skills. My goal is to grow continuously, create work that matters, and contribute meaningfully—whether through <span class="highlight">technology</span>, <span class="highlight">writing</span>, or <span class="highlight">teamwork</span>.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
/* Ensure Inter is loaded */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

.about-page {
  min-height: 100vh;
  color: white;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
}

.about-content {
  max-width: 850px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.1rem;
  color: #a0a0a0;
  margin-bottom: 3rem;
  font-weight: 300;
}

/* The "Glow" Card effect from the reference */
.about-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 20px;
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.about-card p {
  margin-bottom: 1.5rem;
  color: #e0e0e0;
}

.about-card p:last-child {
  margin-bottom: 0;
}

/* Highlighting specific terms like the reference image */
strong {
  color: #fff;
  font-weight: 600;
}

.highlight {
  color: #4a9eff; /* A soft blue highlight similar to the image */
  font-weight: 600;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .about-page {
    padding: 2rem 1rem; /* Reduces the massive 4rem vertical padding so the title isn't pushed too far down */
  }

  .title {
    font-size: 2.2rem; /* Scaled down slightly more to prevent word wrapping on very narrow phones */
  }

  .tagline {
    font-size: 0.95rem; /* Shrinks the subtitle */
    margin-bottom: 2rem; /* Pulls the card a bit closer to the header */
  }

  .about-card {
    padding: 1.5rem; /* Your excellent instinct to reduce the internal card padding */
    font-size: 1rem; /* Shrinks the paragraph text slightly so it doesn't feel overwhelming */
    line-height: 1.6; /* Tightens the vertical space between lines of text for easier mobile reading */
  }
}
</style>