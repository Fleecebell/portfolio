// 生成挂牌（Lanyard）正反面图片
// 图片比例 711×1000 = 卡片几何比例（0.711:1）= atlas 半区比例 → 无裁切无拉伸
// 输出：public/assets/lanyard/front.png、back.png
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'public/assets/lanyard');
mkdirSync(OUT, { recursive: true });

const avatar = readFileSync(resolve(ROOT, 'public/assets/avatar.jpg')).toString('base64');

const W = 711;
const H = 1000;

// ---------- 正面：头像(左)+名字(右) + 完整信息（学校/专业/毕业/方向/微信） ----------
const frontSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c2737"/>
      <stop offset="0.55" stop-color="#101722"/>
      <stop offset="1" stop-color="#090d13"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5eead4" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#5eead4" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#5eead4" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="avatarClip">
      <rect x="96" y="90" width="168" height="168" rx="26"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="10" y="10" width="${W-20}" height="${H-20}" rx="20" fill="none" stroke="#5eead4" stroke-opacity="0.4" stroke-width="3"/>

  <!-- 卡片顶部穿孔（两个，工牌卡扣穿过此处） -->
  <circle cx="320" cy="20" r="12" fill="#050709"/>
  <circle cx="391" cy="20" r="12" fill="#050709"/>

  <!-- 头像（左）+ 名字 / 副标题（右） -->
  <image x="96" y="90" width="168" height="168" clip-path="url(#avatarClip)" href="data:image/jpeg;base64,${avatar}"/>
  <rect x="96" y="90" width="168" height="168" rx="26" fill="none" stroke="#5eead4" stroke-opacity="0.55" stroke-width="3"/>
  <text x="308" y="168" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="66" font-weight="700" fill="#eef2f8" letter-spacing="6">林赫洋</text>
  <text x="309" y="230" font-family="Consolas, Courier New, monospace" font-size="34" letter-spacing="2" fill="#5eead4">UNITY 客户端开发</text>

  <rect x="80" y="314" width="551" height="2" fill="url(#line)"/>

  <!-- 信息 5 行（标签 36px / 值 38px，行距 96） -->
  <g font-family="Microsoft YaHei, PingFang SC, sans-serif">
    <text x="96" y="448" font-size="36" letter-spacing="2" fill="#7c8aa0">学校</text>
    <text x="268" y="448" font-size="38" fill="#eef2f8" letter-spacing="1">哈尔滨理工大学</text>
    <text x="96" y="544" font-size="36" letter-spacing="2" fill="#7c8aa0">专业</text>
    <text x="268" y="544" font-size="38" fill="#eef2f8" letter-spacing="1">软件工程</text>
    <text x="96" y="640" font-size="36" letter-spacing="2" fill="#7c8aa0">毕业</text>
    <text x="268" y="640" font-size="38" fill="#eef2f8" letter-spacing="1">2028 年</text>
    <text x="96" y="736" font-size="36" letter-spacing="2" fill="#7c8aa0">方向</text>
    <text x="268" y="736" font-size="38" fill="#eef2f8" letter-spacing="1">Unity 客户端开发</text>
    <text x="96" y="832" font-size="36" letter-spacing="2" fill="#7c8aa0">微信</text>
    <text x="268" y="832" font-size="38" font-family="Consolas, Courier New, monospace" fill="#eef2f8" letter-spacing="2">15112277413</text>
  </g>
</svg>`;

// ---------- 背面：完整信息（学校 / 专业 / 毕业 / 方向 / 微信） ----------
const backSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#121a26"/>
      <stop offset="1" stop-color="#080c12"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgb)"/>
  <rect x="10" y="10" width="${W-20}" height="${H-20}" rx="20" fill="none" stroke="#5eead4" stroke-opacity="0.4" stroke-width="3"/>

  <!-- 中央大“林”字 -->
  <text x="355.5" y="360" text-anchor="middle" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="240" font-weight="700" fill="#5eead4" fill-opacity="0.14">林</text>
  <text x="355.5" y="432" text-anchor="middle" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="56" font-weight="600" fill="#e9edf4" letter-spacing="10">林赫洋</text>
  <text x="355.5" y="480" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="24" letter-spacing="4" fill="#5eead4">UNITY 客户端开发</text>

  <rect x="255.5" y="512" width="200" height="2" fill="#5eead4" fill-opacity="0.35"/>

  <!-- 详细信息 -->
  <g font-family="Microsoft YaHei, PingFang SC, sans-serif">
    <text x="116" y="592" font-size="28" letter-spacing="2" fill="#7c8aa0">学校</text>
    <text x="268" y="592" font-size="30" fill="#c9d2df" letter-spacing="1">哈尔滨理工大学</text>
    <text x="116" y="652" font-size="28" letter-spacing="2" fill="#7c8aa0">专业</text>
    <text x="268" y="652" font-size="30" fill="#c9d2df" letter-spacing="1">软件工程</text>
    <text x="116" y="712" font-size="28" letter-spacing="2" fill="#7c8aa0">毕业</text>
    <text x="268" y="712" font-size="30" fill="#c9d2df" letter-spacing="1">2028 年毕业</text>
    <text x="116" y="772" font-size="28" letter-spacing="2" fill="#7c8aa0">方向</text>
    <text x="268" y="772" font-size="30" fill="#c9d2df" letter-spacing="1">Unity 客户端开发</text>
    <text x="116" y="832" font-size="28" letter-spacing="2" fill="#7c8aa0">微信</text>
    <text x="268" y="832" font-size="30" fill="#c9d2df" letter-spacing="1">15112277413</text>
  </g>

  <text x="355.5" y="952" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="14" letter-spacing="3" fill="#5f6a7b">GITHUB · FLEECEBELL</text>
</svg>`;

async function render(svg, outFile) {
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outFile);
  console.log('generated:', outFile);
}

await render(frontSvg, resolve(OUT, 'front.png'));
await render(backSvg, resolve(OUT, 'back.png'));
console.log('done.');
