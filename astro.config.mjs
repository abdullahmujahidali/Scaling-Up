import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Serve and copy the real asset folders.
 *
 * Astro's publicDir can only point at ONE directory, but this repo keeps
 * `assets/` (shared CSS/JS) and `exams/` (generated exam and quiz pages, owned
 * by exams/build.cjs) at the root. Handling them here keeps a SINGLE source of
 * truth: previously `assets/` and `public/assets/` both existed and edits to
 * one silently failed to appear, which is exactly the kind of breakage the
 * migration was meant to remove.
 *
 * TWO hooks are needed, and both matter:
 *   astro:build:done   copies the folders into dist/ for production.
 *   astro:server:setup adds dev middleware serving the same folders from the
 *                      repo root. Without it every /exams/*.html page 404s
 *                      under `npm run dev` while working fine once deployed —
 *                      a confusing split that cost real debugging time.
 */
function copyStaticDirs() {
  const dirs = [
    { from: 'assets', to: 'assets' },
    { from: 'exams', to: 'exams', filter: (f) => f.endsWith('.html') },
  ];
  return {
    name: 'copy-static-dirs',
    hooks: {
      // Dev: serve assets/ and exams/ straight from the repo root so that
      // `npm run dev` resolves the same URLs the built site does.
      'astro:server:setup': ({ server }) => {
        // Vite happily serves any project file in dev, which would expose
        // exams/questions/*.json — the ANSWER KEYS. They are never in the
        // built output, so block them here to make dev match production.
        server.middlewares.use((req, res, next) => {
          const p = decodeURIComponent((req.url || '').split('?')[0]);
          if (/\/exams\/questions\//.test(p)) {
            res.statusCode = 404;
            return res.end('Not found');
          }
          next();
        });

        server.middlewares.use((req, res, next) => {
          const url = decodeURIComponent((req.url || '').split('?')[0]);
          const match = dirs.find((d) => url.startsWith(`/${d.to}/`));
          if (!match) return next();

          const rel = url.slice(match.to.length + 2);
          // Reject traversal before touching the filesystem.
          if (!rel || rel.includes('..')) return next();
          // Only top-level files are public. Subdirectories are source, not
          // output — exams/questions/*.json holds the ANSWER KEYS, and serving
          // them would let anyone read the answers during an exam.
          if (rel.includes('/')) return next();

          const file = path.resolve(match.from, rel);
          const root = path.resolve(match.from);
          if (!file.startsWith(root + path.sep)) return next();
          if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
          if (match.filter && !match.filter(path.basename(file))) return next();

          const types = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.js': 'text/javascript; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.svg': 'image/svg+xml',
          };
          res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
          // Dev only: never cache, so edits show up on reload.
          res.setHeader('Cache-Control', 'no-store');
          res.end(fs.readFileSync(file));
        });
      },
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
