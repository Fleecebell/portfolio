// 构建后同步单文件预览产物：
// 1. dist/index.html → preview.html（根目录，双击即可打开）
// 2. dist/assets → assets/（preview.html 里的 ./assets 相对路径在 file:// 下才能解析）
// 注意：不用 fs.cpSync（沙箱环境会被拦截），用底层 readdir/copyFile 逐文件复制
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// 复制 index.html
const html = readFileSync(resolve(ROOT, 'dist/index.html'));
writeFileSync(resolve(ROOT, 'preview.html'), html);
console.log('synced: preview.html');

// 递归复制目录
function copyDir(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

// dist 根部的散文件（如哈希化 favicon avatar-xxx.jpg）也复制到根目录
for (const entry of readdirSync(resolve(ROOT, 'dist'))) {
  const s = join(resolve(ROOT, 'dist'), entry);
  if (entry === 'index.html') continue;
  if (statSync(s).isDirectory()) copyDir(s, resolve(ROOT, entry));
  else copyFileSync(s, resolve(ROOT, entry));
}
console.log('synced: dist 散文件 → 根目录');
