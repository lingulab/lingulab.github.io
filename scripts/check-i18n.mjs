import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dict = JSON.parse(readFileSync(join(root, 'src/i18n/tr.json'), 'utf8'));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(join(root, 'src')).filter((f) => ['.astro', '.ts'].includes(extname(f)));
const used = new Map();
const re = /\bt\(\s*(['"])([^'"`$]+)\1\s*\)/g;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(re)) used.set(m[2], file.replace(root, ''));
  if (/\bt\(\s*`[^`]*\$\{/.test(text)) {
    console.error(`Dynamic key in ${file}. Keys must be string literals.`);
    process.exitCode = 1;
  }
}

const resolve = (key) => key.split('.').reduce((n, p) => (n == null ? undefined : n[p]), dict);
const missing = [...used].filter(([key]) => resolve(key) === undefined);

function leaves(node, prefix = '') {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return [prefix];
  return Object.entries(node).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
}
const unused = leaves(dict).filter((leaf) => ![...used.keys()].some((k) => k === leaf || leaf.startsWith(`${k}.`)));

const others = readdirSync(join(root, 'src/i18n')).filter((f) => f.endsWith('.json') && f !== 'tr.json');
for (const file of others) {
  const other = JSON.parse(readFileSync(join(root, 'src/i18n', file), 'utf8'));
  const have = new Set(leaves(other));
  const gaps = leaves(dict).filter((k) => !have.has(k));
  if (gaps.length) console.warn(`${file} lacks ${gaps.length} keys that tr.json has (falls back to tr).`);
}

if (unused.length) console.warn(`Unused keys in tr.json: ${unused.join(', ')}`);
if (missing.length) {
  for (const [key, file] of missing) console.error(`Missing in tr.json: ${key} (used in ${file})`);
  process.exitCode = 1;
} else {
  console.log(`i18n check passed: ${used.size} keys used, all present in tr.json.`);
}
