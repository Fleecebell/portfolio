// 视频转码工具：把任意格式视频（.mov/.mkv/HEVC 等）转为全兼容的 H.264 MP4
// 作品集背景视频、项目视频都建议用本工具转码后再上传，保证所有机型可播放。
//
// 用法：
//   node scripts/convert-video.mjs <输入文件> [输出文件名]
//
// 示例：
//   node scripts/convert-video.mjs 我的录屏.mov hero-bg
//   → 生成 public/assets/hero-bg.mp4（H.264 1080p、无音轨、可边下边播）
//   node scripts/convert-video.mjs project-video.mp4 project-1/video
//   → 生成 public/assets/projects/project-1/video.mp4
//
// 默认参数（针对作品集优化）：
//   - 编码 H.264 (libx264)：全浏览器 + 全手机支持
//   - 缩放 1920×1080 以内：体积小、移动端流畅
//   - 去掉音轨（背景视频不需要声音；如需保留声音请手动改 -an 为 -c:a aac）
//   - +faststart：网络加载时可边下边播

import { execFileSync } from 'node:child_process';
import { resolve, dirname, basename, extname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ffmpegStatic from 'ffmpeg-static';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
const outName = process.argv[3] || basename(input || '', extname(input || ''));

if (!input || !existsSync(resolve(root, input))) {
  console.error('❌ 用法：node scripts/convert-video.mjs <输入视频路径> [输出文件名]');
  process.exit(1);
}

const inPath = resolve(root, input);
const outPath = resolve(root, `public/assets/${outName}.mp4`);

console.log(`转码中...\n  输入: ${inPath}\n  输出: ${outPath}`);
execFileSync(
  ffmpegStatic,
  [
    '-y',
    '-i', inPath,
    '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '26',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    outPath,
  ],
  { stdio: 'inherit' }
);
console.log('✅ 已生成：' + outPath);
