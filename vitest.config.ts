import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./test/setupEnv.ts'],
    // Integration tests share the local `prisma dev` database, which is
    // single-connection — running test files in parallel makes them drop
    // each other's connections.
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'server-only': path.resolve(__dirname, './test/serverOnlyShim.ts'),
    },
  },
});
