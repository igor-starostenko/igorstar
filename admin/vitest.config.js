import { defineConfig } from 'vitest/config';
import path from 'path';

// Admin-portal unit tests. Pure-logic modules (models, conventions) are tested
// here; network-touching modules (content.js, contentful.js) are integration
// and are exercised against the live space when a PAT is present.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.{js,cjs,mjs}'],
    exclude: ['node_modules/**', '.next/**', '.snapshots/**'],
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src/') + '/' },
    ],
  },
});
