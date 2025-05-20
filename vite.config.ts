import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Set relative base URL
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});