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
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '18.3.1' },
        'lucide-react': { singleton: true },
      },
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
