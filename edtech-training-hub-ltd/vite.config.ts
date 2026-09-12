import express from 'express';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const repoRoot = path.resolve(__dirname, '..');
const appRoot = path.resolve(__dirname);

function serveRepoRoot(): Plugin {
  const app = express();
  app.use((req, res, next) => {
    let p: string;
    try {
      p = decodeURIComponent(req.path);
    } catch {
      return next();
    }
    if (p === '/admin' || p === '/admin/') {
      return res.redirect(302, '/Admin/login.html');
    }
    if (p.startsWith('/admin/')) {
      return res.redirect(302, '/Admin' + p.slice('/admin'.length));
    }
    next();
  });
  app.use('/Admin', express.static(path.join(appRoot, 'Admin'), { index: ['index.html'], dotfiles: 'ignore' }));
  app.use(['/js', '/images'], express.static(repoRoot, { index: ['index.html'], dotfiles: 'ignore' }));

  return {
    name: 'serve-repo-root',
    configureServer(server) {
      server.middlewares.use(app);
    },
    configurePreviewServer(server) {
      server.middlewares.use(app);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serveRepoRoot()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});