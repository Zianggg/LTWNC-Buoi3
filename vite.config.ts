import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const productsPath = fileURLToPath(new URL('./src/data/products.json', import.meta.url));

function attachMockApi(server: ViteDevServer) {
  server.middlewares.use((req, res, next) => {
    const url = req.url?.split('?')[0];
    if (req.method !== 'GET' || url !== '/api/products') {
      next();
      return;
    }

    const body = readFileSync(productsPath, 'utf8');
    setTimeout(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(body);
    }, 500);
  });
}

function mockProductsApi(): Plugin {
  return {
    name: 'mock-products-api',
    configureServer: attachMockApi,
    configurePreviewServer: attachMockApi,
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mockProductsApi()],
});
