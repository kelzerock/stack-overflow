import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      '/socket.io/': {
        // Or the specific path your WebSocket server uses
        target: 'https://codelang.vercel.app', // Your WebSocket server address
        changeOrigin: true,
        secure: false, // Set to true if your WebSocket server uses HTTPS
        ws: true, // Crucial for WebSocket proxying
      },
      '/api': {
        target: 'https://codelang.vercel.app/',
        changeOrigin: true,
        secure: false,
        // ws: true,
      },
    },
  },
});
