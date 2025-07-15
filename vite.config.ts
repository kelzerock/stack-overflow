import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'https://codelang.vercel.app',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
