import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL?.trim();
  const origin = siteUrl ? new URL(siteUrl).origin : undefined;
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-social-metadata',
        transformIndexHtml(html) {
          // Static crawlers need absolute media URLs; set the public origin before publishing.
          if (!origin) return html;
          return {
            html: html.replaceAll('content="/media/losta-masta-share.jpg"', `content="${origin}/media/losta-masta-share.jpg"`),
            tags: [
              { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
              { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
            ],
          };
        },
      },
    ],
  };
});
