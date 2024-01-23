import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/lp-tsn/' : undefined, // for GitHub Pages
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Лосиный Парк - заказ пропусков',
        short_name: 'Заказ пропусков',
        description: 'СНТСН Лосиный Парк. Заказ пропусков.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'moose_logo_192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'moose_logo_512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'], // patterns to determine the files to be precached
        globDirectory: 'dist/', // directory where the files are located
        swDest: 'dist/sw.js', // output path for the generated service worker file
        navigateFallback: '/index.html', // fallback URL for navigation requests
        runtimeCaching: [
          {
            urlPattern: /^https?.*/, // matches all http and https requests
            handler: 'NetworkFirst', // network-first strategy for navigation requests
            options: {
              cacheName: 'https-calls',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              networkTimeoutSeconds: 10, // fall back to cache if network does not respond within 10 seconds
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // matches image files
            handler: 'CacheFirst', // cache-first strategy for image files
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: mode !== 'production',
  },
  server: {
    port: 8000,
  },
}));
