# 林赫洋 Unity 客户端作品集网站

纯前端静态网站，无需后端或 Node.js。直接双击 `index.html` 即可在浏览器中打开。

## 文件结构

```text
portfolio/
├─ index.html              页面骨架，一般不需要改
├─ styles/
│  └─ main.css             全局样式、配色、排版与响应式布局
├─ scripts/
│  ├─ data.js              站点内容数据（文字、项目、技能等），最常修改
│  └─ main.js              页面渲染脚本，一般不需要改
└─ assets/
   ├─ projects/            项目截图与视频（project-1 到 project-4）
   └─ resume/              简历 PDF 存放目录
```

## 如何打开

直接双击项目根目录下的 `index.html` 即可在浏览器中查看。

如果浏览器安全策略导致本地资源加载异常，可在项目目录下启动本地服务器：

```powershell
python -m http.server 5173
```

然后访问：

```text
http://localhost:5173
```

## 怎么修改文字

主要改这个文件：

```text
scripts/data.js
```

常见修改位置：

- `profile.summary`：首页个人介绍
- `stats`：首页四个核心数据
- `projects`：项目名称、类型、职责、技术栈、项目描述
- `skills`：技能矩阵和掌握状态
- `aiWorkflow`：AI 辅助开发工作流
- `awards`：竞赛与获奖
- `experience`：学校、社团、履历
- `roadmap`：学习路线
- `contactLinks`：GitHub、TapTap、邮箱、简历链接

技能状态建议只用这三个值：

```text
已具备
补强中
目标
```

这样页面颜色会自动匹配。

## 怎么新增一个项目

1. 打开 `scripts/data.js`
2. 找到 `projects: [` 这一段
3. 复制一个完整项目对象
4. 修改 `name`、`type`、`role`、`status`、`links`、`tags`、`summary`、`points` 和 `media`
5. 在 `assets/projects/` 下新建对应素材文件夹，例如 `project-5`

项目对象模板：

```js
{
  name: "项目名称",
  type: "项目类型 / 比赛或平台",
  role: "主程序",
  status: "已具备",
  links: ["GitHub 链接", "Demo 链接"],
  tags: ["Unity", "C#", "UI 框架"],
  media: {
    images: [
      "./assets/projects/project-5/image-1.png",
      "./assets/projects/project-5/image-2.png",
      "./assets/projects/project-5/image-3.png",
    ],
    video: "./assets/projects/project-5/video.mp4",
  },
  summary: "一句话说明这个项目的价值。",
  points: [
    {
      label: "我的职责",
      text: "说明你负责了哪些核心模块。",
    },
    {
      label: "技术难点",
      text: "说明你解决了什么问题，以及为什么这样做。",
    },
  ],
}
```

注意：上一个项目对象后面要有英文逗号 `,`，否则 JS 会报错。

## 怎么新增技能

打开 `scripts/data.js`，找到 `skills: [`，复制一个技能对象：

```js
{
  group: "技能组名称",
  status: "补强中",
  items: ["能力点 1", "能力点 2", "能力点 3"],
}
```

如果你已经做出可展示项目证据，再把 `status` 改成 `已具备`。

## 怎么替换头像

当前首页是文字头像占位。如果你要换成真实头像：

1. 把头像放到 `assets/avatar.jpg`
2. 打开 `index.html`
3. 找到：

```html
<div class="avatar-placeholder">头像占位</div>
```

4. 替换成：

```html
<img class="avatar-image" src="./assets/avatar.jpg" alt="林赫洋头像" />
```

然后在 `styles/main.css` 最后加：

```css
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

## 怎么替换项目图片和视频

建议按这个结构放素材：

```text
assets/projects/project-1/image-1.png
assets/projects/project-1/image-2.png
assets/projects/project-1/image-3.png
assets/projects/project-1/video.mp4
```

然后打开 `scripts/data.js`，找到对应项目的 `media`：

```js
media: {
  images: [
    "./assets/projects/project-1/image-1.png",
    "./assets/projects/project-1/image-2.png",
    "./assets/projects/project-1/image-3.png",
  ],
  video: "./assets/projects/project-1/video.mp4",
},
```

如果某一项留空字符串 `""`，页面会继续显示占位块。

## 怎么放简历 PDF

把最终简历文件复制到：

```text
assets/resume/resume.pdf
```

页面底部的“简历 PDF”按钮已经默认指向这个位置。

## 怎么部署到 GitHub Pages

1. 新建一个 GitHub 仓库
2. 上传 `portfolio` 文件夹里的所有内容
3. 在仓库 Settings 中找到 Pages
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main` 和 `/root`
6. 保存后等待 GitHub 生成访问链接

## 后续建议

这个版本的内容故意保留了“已具备 / 补强中 / 目标”状态。等你把某项能力学完并做出证据型项目后，再把状态改成“已具备”，并补充对应项目链接、截图、视频和技术复盘。
