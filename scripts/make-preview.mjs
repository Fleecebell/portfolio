// 从 dist/index.html 生成根目录 preview.html（双击即可离线打开）
// 资源引用从 ./assets/ 改为 ./public/assets/，指向源码目录中的静态资源
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'dist/index.html'), 'utf8').replace(
  /\.\/assets\//g,
  './public/assets/'
);
writeFileSync(resolve(root, 'preview.html'), html);
console.log('✓ preview.html 已生成，双击即可在浏览器中打开');
