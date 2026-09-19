import fs from 'fs';
import path from 'path';

const nativePath = path.resolve('node_modules/rollup/dist/native.js');
if (fs.existsSync(nativePath)) {
  const content = `import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const wasmNative = require('@rollup/wasm-node/dist/native.js');

export const parse = wasmNative.parse;
export const parseAsync = wasmNative.parseAsync;
export const xxhashBase64Url = wasmNative.xxhashBase64Url;
export const xxhashBase36 = wasmNative.xxhashBase36;
export const xxhashBase16 = wasmNative.xxhashBase16;
export const flushLlvmCoverage = wasmNative.flushLlvmCoverage;
export default wasmNative;
`;
  fs.writeFileSync(nativePath, content, 'utf8');
  console.log('[AgriShield X] Rollup WASM compatibility patch applied successfully.');
}