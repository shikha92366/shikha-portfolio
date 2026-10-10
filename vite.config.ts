import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

function contactApiDevPlugin() {
  return {
    name: 'contact-api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/contact', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { default: handler } = await import('./api/contact.ts');
            const webRequest = new Request('http://localhost:5173/api/contact', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body,
            });

            const webResponse = await handler(webRequest);
            res.statusCode = webResponse.status;
            webResponse.headers.forEach((val: string, key: string) => {
              res.setHeader(key, val);
            });
            const text = await webResponse.text();
            res.end(text);
          } catch (err) {
            console.error('[Dev API Error]:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Server error' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    contactApiDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
