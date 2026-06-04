import fs from 'fs'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Check if the real CFA data exists (it won't on the production server)
const basePath = __dirname;
const targetPath = path.normalize(path.join(basePath, './src/features/cfa/data/level1-v2/index.js'));
const hasRealCfaData = targetPath.startsWith(basePath) && fs.existsSync(targetPath);

/** @returns {import('vite').Plugin} */
function noDataImportPlugin() {
  return {
    name: 'no-data-import',
    resolveId(source, importer) {
      if (source.includes('/data/') && source.endsWith('.json')) {
        throw new Error(
          `[SECURITY] Direct JSON data import blocked: "${source}" ` +
          `in "${importer}". Fetch from the Fastify API instead.`
        )
      }
      return null
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    noDataImportPlugin(),
  ],
  resolve: {
    alias: {
      '@/features/cfa/data': hasRealCfaData 
        ? path.resolve(__dirname, './src/features/cfa/data') 
        : path.resolve(__dirname, './src/features/cfa/mock-data'),
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 1223,
  },
})
