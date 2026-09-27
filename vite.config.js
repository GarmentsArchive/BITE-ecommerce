import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    // Honour the port the harness assigns; fall back to 3000 when
    // run by hand. Nothing here is tied to a specific port.
    port: Number(process.env.PORT) || 3000,
    open: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
