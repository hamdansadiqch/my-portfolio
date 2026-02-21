<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© 2025 Hamdan Sadiq. All Rights Reserved.</span>
      
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #18334f;
  color: rgb(225, 255, 0);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  z-index: 999;
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.map-box small {
  color: rgb(225, 255, 0);
  font-size: 12px;
}

</style>
