import fs from 'fs';
import path from 'path';

const envExamplePath = path.resolve(process.cwd(), '.env.example');
const envPath = path.resolve(process.cwd(), '.env');

if (!fs.existsSync(envExamplePath)) {
  console.log('No .env.example found, skipping env validation.');
  process.exit(0);
}

const exampleContent = fs.readFileSync(envExamplePath, 'utf8');
const expectedKeys = exampleContent
  .split('\n')
  .filter((line) => line && !line.trim().startsWith('#'))
  .map((line) => line.split('=')[0].trim())
  .filter(Boolean);

if (expectedKeys.length === 0) {
  console.log('No required keys found in .env.example, skipping env validation.');
  process.exit(0);
}

let actualKeys = Object.keys(process.env);

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const fileKeys = envContent
    .split('\n')
    .filter((line) => line && !line.trim().startsWith('#'))
    .map((line) => line.split('=')[0].trim())
    .filter(Boolean);
  actualKeys = [...actualKeys, ...fileKeys];
}

const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));

if (missingKeys.length > 0) {
  console.error(
    `❌ Missing required environment variables:\n${missingKeys.map((k) => ` - ${k}`).join('\n')}`
  );
  process.exit(1);
}

console.log('✅ Environment variables validated successfully.');
process.exit(0);
