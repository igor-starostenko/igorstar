import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.js'],
    exclude: ['node_modules/**', 'out/**'],
  },
  resolve: {
    alias: {
      helpers: path.resolve(__dirname, 'src/helpers'),
      constants: path.resolve(__dirname, 'src/constants'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
});
