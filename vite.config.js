import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// 单文件构建：JS/CSS 全部内联进 dist/index.html，
// 双击即可在浏览器中打开（图片等静态资源仍走相对路径 ./assets/）。
// 使用相对路径 base，可部署到任意子路径（GitHub Pages / 自定义域名均无需配置）。
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
