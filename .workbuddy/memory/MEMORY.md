# 林赫洋 Unity 客户端作品集

## 项目基本信息
- 作者：林赫洋（羊毛Fleece_），哈尔滨理工大学 软件工程 2028 年毕业
- 目标岗位：Unity 客户端开发（Gameplay / UI / 工具）
- 站点内容数据：`src/data.js`（profile / intro / projects×6 / skills×12 / aiWorkflow×6 / awards×3 / experience×3 / roadmap×4 / contactLinks×4）
- 头像：`public/assets/avatar.jpg`；GitHub: Fleecebell；TapTap: 44105615；邮箱: 2126401535@qq.com

## 工程结构（React + Vite 单文件构建）
- `index.html`：Vite 开发入口，**根目录不能直接双击打开**（file:// 不支持 ES module + 未编译 JSX）
- `dist/index.html`：单文件构建产物（vite-plugin-singlefile 把 JS/CSS 全部内联），双击即用；静态图片走相对路径 `./assets/...`
- 启动开发：`npm run dev`（默认 5173）
- 预览构建：`npx vite preview`（默认 4173）
- **React 19**（@react-three/fiber@9 要求 react>=19；2026-07 从 18 升级到 19.2）

## 用户偏好与设计决定
- 暗色系 + 克制科技感 + 不模板化（Unity 开发者身份适配：深蓝黑 + teal/#5eead4 + 冰蓝/#7cc7ff 强调；mono 字体用于编号/标签；网格背景）
- 版心 1700px，PC 优先，移动端自适应
- 所有数据保留（用户后续删减），原页面未展示的 intro / skills / aiWorkflow / roadmap 都已渲染
- 不要修改 `src/data.js` 内容，只改框架/样式
- **Hero 右侧：3D Lanyard 挂牌**（自我介绍身份卡渲染为挂牌正面 PNG，`public/assets/lanyard/front.png`；背面 back.png）。组件 `src/components/Lanyard/Lanyard.jsx` 运行时构建模型（无外部 .glb 依赖），物理摆动 + 鼠标可拖拽
- **⚠️ 挂牌图片真正生效的位置是 `src/components/Lanyard/cards/`（front.png/back.png，`?inline` 内联导入），不是 `public/assets/lanyard/`**！`public/assets/lanyard/` 只是源文件存档，代码不读。换挂牌图 = 新图转 PNG + 覆盖 `src/components/Lanyard/cards/` 同名文件（尺寸需 711x1000 与正面一致，比例差异小可用 sharp resize fit:fill）→ dev HMR 自动生效 / 构建内联
- **作品子页面图片（gallery）**：`public/assets/projects/project-N/` 内除 `cover.*` 外的所有 `.png/.jpg` 自动进详情面板（vite.config.js 虚拟模块扫描，按文件名数字排序，数量不限）；`.detail-media` 竖排展示（flex column，图片宽度 100% 自适应面板，等比缩放）。换图后 dev 需重启虚拟模块缓存（同封面规则）；构建后 sync 到根 assets/

## 已知陷阱
- Vite 构建时若 `dist/` 被 preview server 占用，rmSync 被 shim 拦截会报错；构建前需停掉 preview
- Reveal 滚动动效在 fullPage 截图时与 IntersectionObserver 时序错位，截图脚本需强制 `is-inview` 后再截
- 本机 git CLI 无 GitHub 凭据，push 需 GitHub Desktop 或 PAT；GitHub 连接器 MCP 对该仓库写权限 403（不可靠）
- **千万别删根目录 index.html**——它是 Vite 构建入口，删了 Actions 构建必失败（Could not resolve entry module）

## 线上部署
- 正式域名：https://fleecebell.github.io/portfolio/（GitHub Actions 自动构建部署，pages.yml）
- 发布流程：git commit + git push origin main → Actions 自动 npm ci + npm run build + 部署
- 本地预览：双击 preview.html（构建产物单文件）或 npm run dev