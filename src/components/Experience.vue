<template>
  <div class="pdf-container">
    <iframe
      :src="`${import.meta.env.BASE_URL}resume.pdf`"
      class="pdf-frame"
      title="My Resume"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Experience',
};
</script>

<style scoped>
.pdf-container {
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pdf-frame {
  width: 90%;
  height: 90vh;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>
