import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': process.env.VITE_API_URL || 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      'services': path.resolve(__dirname, './src/services'),
      'types': path.resolve(__dirname, './src/types')
    }
  }
}); 