import { defineConfig } from 'vitest/config';
export default defineConfig({
  oxc: { jsx: { runtime: 'automatic' } },
  test: { include: ['test/**/*.test.ts', 'test/**/*.test.tsx'], environment: 'jsdom', clearMocks: true, restoreMocks: true,
    coverage: { provider: 'v8', include: ['src/**/*.{ts,tsx}', 'scripts/**/*.mjs'], reporter: ['text', 'json', 'json-summary'] } },
});
