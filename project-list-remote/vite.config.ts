import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'projectList',
      filename: 'remoteEntry.js',
      exposes: {
        './ProjectListRemote': './src/components/ProjectListRemote.tsx',
      },
    shared: ['react', 'react-dom', 'axios', 'lucide-react'],
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
