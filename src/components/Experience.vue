<template>
  <div class="pdf-container">
    <a :href="pdfUrl" target="_blank" class="mobile-fallback-btn">
      View or Download Resume
    </a>

    <iframe
      :src="pdfUrl"
      class="pdf-frame"
      title="My Resume"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Experience',
  data() {
    return {
      pdfUrl: `${import.meta.env.BASE_URL}Resume.pdf`,
    };
  },
};
</script>

<style scoped>
.pdf-container {
  /* Changed from 100vh to ensure it fits perfectly between your header and footer */
  height: calc(100vh - 120px); 
  background: #ffffff;
  display: flex;
  flex-direction: column; /* Stacks the button and iframe vertically */
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.mobile-fallback-btn {
  display: none; /* Hidden by default on desktop */
  background-color: #18334f;
  color: yellow;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
}

.mobile-fallback-btn:hover {
  background-color: #0c1928;
}

.pdf-frame {
  width: 90%;
  height: 100%;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* --- Mobile Responsive Adjustments --- */
@media (max-width: 768px) {
  .pdf-frame {
    width: 100%; /* Stretches the PDF to the edge of the screen */
    border-radius: 0; /* Removes rounded corners for a native full-screen feel */
    box-shadow: none;
  }
  
  .mobile-fallback-btn {
    display: inline-block; /* Shows the button on mobile phones */
  }
}
</style>