import { defineConfig } from 'astro/config';

// Static site. Every page is prerendered to plain HTML at build time, so the
// output stays deployable anywhere (and openable from disk after `npm run build`).
export default defineConfig({
  output: 'static',
  outDir: './dist',
  publicDir: './public',
  build: {
    // Emit /lessons/0046-....html rather than /lessons/0046-.../index.html so
    // the built URLs match the existing hand-written links exactly. Without
    // this, every href in 81 pages would need rewriting.
    format: 'file',
  },
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
