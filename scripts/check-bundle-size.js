import fs from 'fs';
import path from 'path';

// Max limits in KB
const MAX_TOTAL_SIZE = 1500;
const MAX_CHUNK_SIZE = 500;

const distPath = path.resolve(process.cwd(), 'dist/assets');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist/assets not found. Please run build first.');
  process.exit(1);
}

const files = fs.readdirSync(distPath);
let totalSize = 0;
let hasError = false;

console.log('📊 Bundle Size Check:');

files.forEach((file) => {
  if (file.endsWith('.js') || file.endsWith('.css')) {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    totalSize += sizeKB;

    if (sizeKB > MAX_CHUNK_SIZE) {
      console.error(
        `❌ Chunk ${file} exceeds limit: ${sizeKB.toFixed(2)} KB (Limit: ${MAX_CHUNK_SIZE} KB)`
      );
      hasError = true;
    } else {
      console.log(`✅ ${file}: ${sizeKB.toFixed(2)} KB`);
    }
  }
});

console.log('-----------------------------------');
if (totalSize > MAX_TOTAL_SIZE) {
  console.error(
    `❌ Total bundle size exceeds limit: ${totalSize.toFixed(2)} KB (Limit: ${MAX_TOTAL_SIZE} KB)`
  );
  hasError = true;
} else {
  console.log(`✅ Total bundle size: ${totalSize.toFixed(2)} KB (Limit: ${MAX_TOTAL_SIZE} KB)`);
}

if (hasError) {
  process.exit(1);
} else {
  console.log('🎉 All bundle size checks passed!');
  process.exit(0);
}
