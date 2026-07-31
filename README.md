# 林赫洋 Unity 客户端作品集网站

基于 **React + Vite** 的暗色科技感作品集，PC 优先（版心 1700px），移动端自适应。

## 本地开发

```bash
npm install           # 安装依赖
npm run dev           # 启动开发服务器（默认 http://localhost:5173）
```

## 构建与离线预览

```bash
npm run build         # 单文件构建，产物输出到 dist/index.html（JS/CSS 全部内联）
```

**双击 `dist/index.html` 即可在浏览器中离线打开预览**，无需启动任何服务器——图片等静态资源走相对路径 `./assets/...`，file:// 协议下也可正常加载。

> 💡 项目根目录还放了一份 `preview.html`（每次 `npm run build` 后需重新生成，见下），与 `dist/index.html` 效果一致，资源引用指向 `public/assets/`，同样双击即开。
>
> ⚠️ 根目录的 `index.html` 是 Vite 的开发入口（包含未编译的 JSX 引用），不能像传统纯静态站点那样直接双击打开。需要预览效果时，请打开 `preview.html` 或 `dist/index.html`。

```bash
npm run build         # 重新构建 dist/index.html
npm run preview:file  # 构建后同步生成根目录 preview.html
```

也可以使用构建产物的本地预览（行为与线上部署一致）：

```bash
npx vite preview      # 默认 http://localhost:4173
```

## 文件结构

```text
portfolio/
├─ index.html              Vite 入口
├─ vite.config.js          构建配置（base 使用相对路径，任意子路径可部署）
├─ public/
│  └─ assets/              静态资源：头像、图标、项目素材、简历 PDF
├─ src/
│  ├─ main.jsx             应用入口
│  ├─ App.jsx              页面组装（板块顺序在这里调整）
│  ├─ data.js              站点内容数据（文字、项目、技能等），最常修改
│  ├─ components/          各板块组件（Header/Hero/Awards/…）
│  └─ styles/              设计系统（tokens/base/components）
└─ .github/workflows/      GitHub Pages 自动构建部署
```

## 怎么修改内容

所有文字内容都在 `src/data.js`，结构与原版一致，常见修改位置：

- `profile`：首页个人介绍
- `intro`：作品集定位四原则
- `projects`：项目名称、类型、职责、技术栈、项目描述
- `skills`：技能矩阵和掌握状态
- `aiWorkflow`：AI 辅助开发工作流
- `awards`：竞赛与获奖
- `experience`：学校、社团、履历
- `roadmap`：学习路线
- `contactLinks`：GitHub、TapTap、邮箱、简历链接

技能状态建议只用这三个值（页面颜色会自动匹配）：

```text
已具备
补强中
目标
```

## 怎么上传视频（背景视频 / 作品视频）

**为保证所有手机、浏览器都能播放，视频必须转成 H.264 MP4**（手机拍摄的 .mov 通常是 HEVC/H.265，很多设备播不了）。项目内置了转码工具：

```bash
# 背景视频（生成 public/assets/hero-bg.mp4）
node scripts/convert-video.mjs 你的视频.mov hero-bg

# 作品视频（输出名可带子目录，生成 public/assets/projects/project-1/video.mp4）
node scripts/convert-video.mjs project-video.mov project-1/video
```

转码参数（已针对作品集优化）：H.264 / 1080p / 去音轨 / `+faststart`（边下边播）。生成后：

1. 把 `.mp4` 放到 `public/assets/` 对应位置
2. 在 `src/data.js` 里把路径填到 `media.video`（背景视频则覆盖 `hero-bg.mp4`）

**视频规范**：H.264 mp4、分辨率 ≤ 1920×1080、体积尽量 < 10MB、时长 5–60 秒、背景视频无音轨。避免 HEVC/H.265、ProRes、AVI、MKV 等编码/容器。

## 怎么新增一个项目

1. 打开 `src/data.js`，找到 `projects: [`
2. 复制一个完整项目对象，修改各字段
3. 截图放入 `public/assets/projects/project-N/`，在 `media.images` 中填入路径
4. 有视频则在 `media.video` 中填入 mp4 路径

项目对象模板：

```js
{
  name: "项目名称",
  type: "项目类型 / 比赛或平台",
  role: "主程序",
  status: "已具备",
  links: [
    { label: "GitHub", href: "https://..." },
  ],
  tags: ["Unity", "C#", "UI 框架"],
  media: {
    images: ["./assets/projects/project-5/image-1.png", "", ""],
    video: "",
  },
  summary: "一句话说明这个项目的价值。",
  points: [
    { label: "我的职责", text: "说明你负责了哪些核心模块。" },
    { label: "技术难点", text: "说明你解决了什么问题。" },
  ],
}
```

注意：上一个项目对象后面要有英文逗号 `,`。

## 怎么调整页面结构

板块顺序、增删板块在 `src/App.jsx` 中调整：

```jsx
<Hero />
<Intro />      {/* 定位四原则 */}
<Awards />     {/* 01 竞赛与获奖 */}
<Experience /> {/* 02 履历与实习 */}
<Projects />   {/* 03 精选项目 */}
<Skills />     {/* 04 技能矩阵 */}
<AiWorkflow /> {/* 05 AI 工作流 */}
<Roadmap />    {/* 成长路线 */}
<Contact />    {/* 06 联系与资料 */}
```

删除某行即从页面移除对应板块（数据仍保留在 data.js）。

导航项在 `src/components/Header.jsx` 的 `NAV_ITEMS` 中维护。

## 视觉定制

设计系统集中在 `src/styles/`：

- `tokens.css`：颜色、字体、间距、圆角等设计变量
- `base.css`：重置、全局、按钮、状态标签
- `components.css`：各组件样式与响应式断点

## 怎么部署到 GitHub Pages

1. 推送到 GitHub 仓库 main 分支（`workflows/pages.yml` 会自动构建部署）
2. 仓库 Settings → Pages → Source 选择 `GitHub Actions`
3. 等待 Actions 运行完成即可访问

本地构建产物在 `dist/`，也可手动上传该目录到任意静态托管。
