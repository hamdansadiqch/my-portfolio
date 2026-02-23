<template>
  <main class="projects-page">
    <h1 class="page-title">Projects</h1>

    <div class="projects-grid">
      <div class="project-card">
        <div class="card-header">
          <span class="icon">🤖</span>
          <h3>Hamster Robot: Autonomous Maze Solver</h3>
        </div>
        <p class="description">
          A robotics project focused on programming a Hamster robot to navigate and map complex grids autonomously using specialized logic.
        </p>
        <div class="tech-stack">
          <span class="tag">Robotics</span>
          <span class="tag">Programming</span>
          <span class="tag">Logic</span>
        </div>
        <a href="https://github.com/hamdansadiqch" target="_blank" class="source-button">
          <i class="fab fa-github"></i> Source
        </a>
      </div>

      <div class="project-card">
        <div class="card-header">
          <span class="icon">🌐</span>
          <h3>Personal Portfolio</h3>
        </div>
        <p class="description">
          A modern, responsive portfolio website built using Vue.js and Vite, deployed via GitHub Pages with a minimalist dark aesthetic.
        </p>
        <div class="tech-stack">
          <span class="tag">Vue.js</span>
          <span class="tag">Vite</span>
          <span class="tag">GitHub Pages</span>
        </div>
        <a href="https://github.com/hamdansadiqch/my-portfolio" target="_blank" class="source-button">
          <i class="fab fa-github"></i> Source
        </a>
      </div>

      <div class="project-card">
        <div class="card-header">
          <span class="icon">📄</span>
          <h3>LinkedIn Profile Audit</h3>
        </div>
        <p class="description">
          A professional audit report created for CMPT 102, analyzing profile optimization and professional branding.
        </p>
        <div class="tech-stack">
          <span class="tag">CMPT 102</span>
          <span class="tag">Analysis</span>
          <span class="tag">Branding</span>
        </div>
        <a href="#" target="_blank" class="source-button">
          <i class="fab fa-github"></i> Source
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.projects-page {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 100px 2rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Project Card Base */
.project-card {
  background: #0a0a0a; /* Slightly lighter than pure black for depth */
  border: 1px solid #222;
  border-radius: 16px;
  padding: 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
}

/* NEON HOVER EFFECT */
.project-card:hover {
  transform: translateY(-5px);
  border-color: #00f2ff; /* Neon Cyan Outline */
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.4); /* Neon Glow */
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.project-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.description {
  color: #888;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

/* Tech Tags */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 2rem;
}

.tag {
  background: #1a1a1a;
  color: #ccc;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  border: 1px solid #333;
}

/* Source Button */
.source-button {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  transition: all 0.3s ease;
}

.source-button:hover {
  background: #fff;
  color: #000;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>