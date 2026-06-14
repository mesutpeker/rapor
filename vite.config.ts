import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Göreceli yol: GitHub Pages alt dizininde (kullanıcı.github.io/repo/) varlıkların doğru yüklenmesini sağlar
  base: './',
  plugins: [react(), tailwindcss()],
})
