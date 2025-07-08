import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/tests/**/*.ts',
  ],
  outDir: 'build',
  format: ['cjs'],
  clean: true,
  minify: true,
  platform: 'node',
});
