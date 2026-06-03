import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.example
const envExamplePath = path.resolve(__dirname, '../.env.example');
if (!fs.existsSync(envExamplePath)) {
  console.log('No .env.example found, skipping env validation.');
  process.exit(0);
}

const envExample = fs.readFileSync(envExamplePath, 'utf-8');
const lines = envExample.split('\n');

const requiredVars: { key: string; type: string | null }[] = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;

  // Check for inline type comment e.g., PORT=3000 # type:number
  const match = trimmed.match(/^([A-Z0-9_]+)=(.*)/);
  if (match) {
    const key = match[1];
    let type = null;
    const typeMatch = trimmed.match(/#\s*type:([a-z]+)/);
    if (typeMatch) {
      type = typeMatch[1];
    }
    requiredVars.push({ key, type });
  }
}

let allPass = true;
const results: { Key: string; Status: string; Reason?: string }[] = [];

for (const { key, type } of requiredVars) {
  const value = process.env[key];
  if (!value) {
    results.push({ Key: key, Status: 'FAIL', Reason: 'Missing or empty' });
    allPass = false;
    continue;
  }

  if (type === 'number') {
    if (isNaN(Number(value))) {
      results.push({ Key: key, Status: 'FAIL', Reason: 'Not a number' });
      allPass = false;
      continue;
    }
  } else if (type === 'url') {
    try {
      new URL(value);
    } catch {
      results.push({ Key: key, Status: 'FAIL', Reason: 'Invalid URL' });
      allPass = false;
      continue;
    }
  } else if (type === 'boolean') {
    if (value !== 'true' && value !== 'false') {
      results.push({ Key: key, Status: 'FAIL', Reason: 'Not a boolean' });
      allPass = false;
      continue;
    }
  }
  
  results.push({ Key: key, Status: 'PASS' });
}

console.table(results);

if (!allPass) {
  console.error('\n❌ Environment validation failed. Please check your .env variables.');
  process.exit(1);
}

console.log('\n✅ Environment validation passed.');
process.exit(0);
