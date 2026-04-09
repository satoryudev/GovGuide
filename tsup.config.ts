import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { embed: 'embed/index.ts' },
  outDir: 'public',
  format: ['iife'],
  globalName: 'TebikiChart',
  minify: true,
  clean: false,
  outExtension: () => ({ js: '.js' }),
})
