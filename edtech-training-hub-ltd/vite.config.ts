import express from 'express';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const repoRoot = path.resolve(__dirname, '..');
const appRoot = path.resolve(__dirname);

function copyLegacySiteAssets(): Plugin {
  return {
    name: 'copy-legacy-site-assets',
    closeBundle() {
      const outputDir = path.resolve(__dirname, 'dist');
      fs.cpSync(path.join(appRoot, 'Admin'), path.join(outputDir, 'Admin'), { recursive: true });
      fs.cpSync(path.join(repoRoot, 'js'), path.join(outputDir, 'js'), { recursive: true });
      fs.cpSync(path.join(repoRoot, 'images'), path.join(outputDir, 'images'), { recursive: true });
    },
  };
}

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
    plugins: [react(), tailwindcss(), serveRepoRoot(), copyLegacySiteAssets()],
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