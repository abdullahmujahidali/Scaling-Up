import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Copy the real asset folders into the build output.
 *
 * Astro's publicDir can only point at ONE directory, but this repo keeps
 * `assets/` (shared CSS/JS) and `exams/` (15 generated exam pages, owned by
 * exams/build.js) at the root. Copying them via a hook keeps a SINGLE source
 * of truth: previously `assets/` and `public/assets/` both existed and edits
 * to one silently failed to appear, which is exactly the kind of breakage the
 * migration was meant to remove.
 */
function copyStaticDirs() {
  const dirs = [
    { from: 'assets', to: 'assets' },
    { from: 'exams', to: 'exams', filter: (f) => f.endsWith('.html') },
  ];
  return {
    name: 'copy-static-dirs',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const out = new URL(dir).pathname;
        for (const d of dirs) {
          const src = path.resolve(d.from);
          if (!fs.existsSync(src)) continue;
          const dest = path.join(out, d.to);
          fs.mkdirSync(dest, { recursive: true });
          for (const f of fs.readdirSync(src)) {
            const s = path.join(src, f);
            if (fs.statSync(s).isDirectory()) continue;
            if (d.filter && !d.filter(f)) continue;
            fs.copyFileSync(s, path.join(dest, f));
          }
        }
      },
    },
  };
}

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, not
// the domain root, so every absolute asset path needs that prefix. The deploy
// workflow sets BASE_PATH; locally it is empty so `npm run dev` still works at /.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  outDir: './dist',
  base,
  // No publicDir: the static folders above are copied by the hook instead, so
  // nothing needs to be duplicated into a public/ directory.
  publicDir: './public',
  build: {
    // Emit /lessons/x.html rather than /lessons/x/index.html so the built URLs
    // match the existing hand-written links exactly — no href rewrites needed.
    format: 'file',
  },
  integrations: [copyStaticDirs()],
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
