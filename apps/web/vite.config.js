import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tomoto/ui': resolve(__dirname, '../../packages/ui/src'),
      '@tomoto/lib': resolve(__dirname, '../../packages/lib/src'),
    },
  },
  server: {
    port: 3000,
  },
});
