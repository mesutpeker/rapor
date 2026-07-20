import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Proje sitesi https://mesutpeker.github.io/rapor/ altında yayımlanır.
  base: '/rapor/',
  plugins: [react(), tailwindcss()],
})
