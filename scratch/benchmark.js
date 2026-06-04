const { performance } = require('perf_hooks');

const buf = Buffer.alloc(500 * 1024); // 500KB fake ciphertext

// 1. Array.from + JSON.stringify
let start = performance.now();
const arr = Array.from(buf);
JSON.stringify(arr);
console.log('Array.from + JSON.stringify:', performance.now() - start, 'ms');

// 2. Base64
start = performance.now();
const b64 = buf.toString('base64');
JSON.stringify(b64);
console.log('Base64:', performance.now() - start, 'ms');

// 3. Watermark
function sessionIdToBits(sessionId) {
  return Array.from(sessionId).flatMap((c) =>
    c.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number),
  );
}
start = performance.now();
for(let i=0; i<1000; i++) {
  sessionIdToBits("12345678");
}
console.log('sessionIdToBits 1000x:', performance.now() - start, 'ms');
