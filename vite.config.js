import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 自动扫描 public/assets/projects/project-N/ 下的封面、子页面图片与可选 info.json：
// - cover.jpg（或 .jpeg/.png/.webp）→ 轮播封面
// - 其余所有 .png/.jpg → 子页面展示图（按文件名排序，数量不限）
// 新增 project-5、project-6... 文件夹无需改代码即可并入作品轮播。
function projectCoversPlugin() {
  const VIRTUAL = 'virtual:project-covers'
  return {
    name: 'project-covers-plugin',
    resolveId(id) {
      return id === VIRTUAL ? '\0' + VIRTUAL : null
    },
    load(id) {
      if (id !== '\0' + VIRTUAL) return null
      const dir = resolve(__dirname, 'public/assets/projects')
      let entries = []
      try {
        entries = readdirSync(dir, { withFileTypes: true })
          .filter((d) => d.isDirectory() && /^project-\d+$/.test(d.name))
          .map((d) => {
            const num = parseInt(d.name.split('-')[1], 10)
            const ext = ['jpg', 'jpeg', 'png', 'webp'].find((e) =>
              existsSync(resolve(dir, d.name, `cover.${e}`))
            )
            // 子页面图：目录下所有 png/jpg（排除 cover.*），按文件名排序
            const gallery = readdirSync(resolve(dir, d.name))
              .filter((f) => /\.(png|jpe?g)$/i.test(f) && !/^cover\./i.test(f))
              .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
              .map((f) => `./assets/projects/${d.name}/${f}`)
            let info = null
            const infoPath = resolve(dir, d.name, 'info.json')
            if (existsSync(infoPath)) {
              try {
                info = JSON.parse(readFileSync(infoPath, 'utf8'))
              } catch {
                info = null
              }
            }
            return {
              num,
              folder: d.name,
              cover: ext ? `./assets/projects/${d.name}/cover.${ext}` : null,
              gallery,
              info,
            }
          })
          .sort((a, b) => a.num - b.num)
      } catch {
        entries = []
      }
      return `export default ${JSON.stringify(entries)};`
    },
  }
}

// 单文件构建：JS/CSS 全部内联进 dist/index.html，
// 双击即可在浏览器中打开（图片等静态资源仍走相对路径 ./assets/）。
// 使用相对路径 base，可部署到任意子路径（GitHub Pages / 自定义域名均无需配置）。
export default defineConfig({
  plugins: [react(), viteSingleFile(), projectCoversPlugin()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
