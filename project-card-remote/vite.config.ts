import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'projectCard',
      filename: 'remoteEntry.js',
      exposes: {
        './ProjectCardRemote': './src/components/ProjectCardRemote.tsx',
      },
      shared: ['react', 'react-dom', 'lucide-react'],
    }),
  ],
  resolve: {
    alias: {
      '@shell': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    target: 'esnext',
  },
});
