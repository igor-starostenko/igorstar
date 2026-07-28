import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.js'],
    exclude: ['node_modules/**', 'out/**'],
    hookTimeout: 60000,
    testTimeout: 60000,
  },
  resolve: {
    alias: [
      { find: /^helpers/, replacement: path.resolve(__dirname, 'src/helpers') },
      { find: /^constants/, replacement: path.resolve(__dirname, 'src/constants') },
      { find: /^components/, replacement: path.resolve(__dirname, 'src/components') },
      { find: /^pages/, replacement: path.resolve(__dirname, 'src/pages') },
      { find: /^src\//, replacement: path.resolve(__dirname, 'src/') + '/' },
      { find: /^hooks/, replacement: path.resolve(__dirname, 'src/hooks') },
      { find: /^contentClient/, replacement: path.resolve(__dirname, 'src/contentClient.js') },
      { find: /^global\.css\.js$/, replacement: path.resolve(__dirname, 'src/global.css.js') },
      { find: /^site-config\.cjs$/, replacement: path.resolve(__dirname, 'site-config.cjs') },
    ],
  },
  optimizeDeps: {
    extensions: ['.js', '.jsx'],
  },
});
