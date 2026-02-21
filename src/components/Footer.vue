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
  padding: 1.5rem 2rem; /* Matches header padding height */
  background-color: #000000; /* Pure Black */
  color: #ffffff; /* Clean White */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Inter', sans-serif; /* Cleaner, modern font matching the photo style */
  z-index: 999;
  border-top: 1px solid #222; /* Subtle separation from the body */
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase; /* Matches the header's professional feel */
  letter-spacing: 1px;
  font-size: 0.8rem;
}

.map-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.map-box small {
  color: #888888; /* Muted grey to match the inactive nav links */
  font-size: 11px;
  font-weight: 600;
}
</style>