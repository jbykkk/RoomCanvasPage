import { cp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'public');
const output = resolve(root, 'dist');
const html = await readFile(resolve(source, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
  const url = match[1];
  if (/^(https?:|data:|mailto:)/.test(url)) continue;
  const path = resolve(source, url.replace(/^\//, ''));
  if (relative(source, path).startsWith('..')) throw new Error(`Asset outside public/: ${url}`);
  await stat(path);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
console.log(`Built ${ (await readdir(output, { recursive: true })).length } static entries into dist/. No dependencies required.`);
