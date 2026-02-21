import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/your-repo-name/',   // 👈 ADD THIS LINE
  plugins: [vue()],
})
