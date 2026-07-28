window.PORTFOLIO_DATA = {
  profile: {
    name: "林赫洋",
    school: "哈尔滨理工大学",
    major: "软件工程",
    graduation: "2028 年毕业",
    direction: "Unity 客户端开发",
    summary:
      "我是一名软件工程专业学生，专注 Unity 客户端开发。当前经历覆盖多款 GameJam 与独立游戏项目，长期目标是进入中大型游戏团队，负责可维护、可扩展、可调试的客户端工程与 Gameplay 系统开发。",
    contactCopy:
      "这里可以放邮箱、电话、GitHub、TapTap、B 站、技术博客和简历 PDF。正式公开前，建议只保留你愿意对外展示的联系方式。",
  },

  stats: [
    { value: "Unity", label: "客户端方向" },
    { value: "2028", label: "预计毕业" },
    { value: "主程", label: "多款项目经历" },
    { value: "AI", label: "工程协作工具" },
  ],

  intro: [
    {
      title: "明确岗位方向",
      text: "目标岗位为 Unity 客户端开发，重点展示 Gameplay、UI、资源、性能、工具和工程架构能力。",
    },
    {
      title: "作品驱动表达",
      text: "用完整项目证明能力，而不是只罗列技能。每个项目都保留职责、技术难点、解决方案和复盘。",
    },
    {
      title: "面向团队协作",
      text: "强调 Git、模块划分、文档、调试工具、配置流程和 AI 辅助开发，贴近中大型团队工作方式。",
    },
    {
      title: "学习路线可追踪",
      text: "能力项可以标注已具备、补强中、目标能力，方便根据网站反推未来学习规划。",
    },
  ],

  projects: [
    {
      name: "无限黄昏",
      type: "2D Roguelike / GMTK GameJam",
      role: "主程序",
      status: "已具备",
      links: ["GitHub 链接待确认", "Demo 链接待添加"],
      tags: ["Unity", "C#", "2D/3D 混合", "道具系统", "对话系统", "地图机制"],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "48 小时 GameJam 项目，围绕 Roguelike 循环、战斗、物品、相册选择和地图变化构建完整玩法闭环。",
      points: [
        {
          label: "我的职责",
          text: "负责核心玩法逻辑、道具与装备效果、对话配置、场景机制、相机跟随和项目集成。",
        },
        {
          label: "目标强化",
          text: "后续可补充对象池、资源加载策略、性能数据和核心系统结构图，让项目从 Demo 变成技术案例。",
        },
      ],
    },
    {
      name: "艾可与谜语森林",
      type: "3D 解谜 / TapTap Spotlight",
      role: "主程序",
      status: "已具备",
      links: ["TapTap 链接待添加", "GitHub 链接待添加"],
      tags: ["Unity 3D", "FSM", "Cinemachine", "AR 适配", "交互解谜"],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "3D 解谜项目，负责角色交互、谜题流程、状态管理和镜头体验，并进行 AR 设备兼容方向的探索。",
      points: [
        {
          label: "我的职责",
          text: "实现玩家状态机、场景交互、镜头控制、谜题触发流程和跨平台体验适配。",
        },
        {
          label: "目标强化",
          text: "建议补充状态机设计图、交互流程图、设备适配问题和解决方案，强化客户端工程表达。",
        },
      ],
    },
    {
      name: "Flood!",
      type: "2D 双人合作 / 公益 GameJam",
      role: "主程序",
      status: "已具备",
      links: ["GitHub 链接待添加"],
      tags: ["Unity 2D", "合作玩法", "水位系统", "UI 反馈", "场景事件"],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "围绕房屋漏水、门窗损坏、玩家修复和水位变化构建合作玩法，强调短周期内的机制表达和团队交付。",
      points: [
        {
          label: "我的职责",
          text: "负责水位变化、门窗损坏、修复进度、UI 反馈、场景事件和协作玩法逻辑。",
        },
        {
          label: "目标强化",
          text: "可补充状态同步方案或本地双人输入系统复盘，作为网络/协作玩法能力的入口。",
        },
      ],
    },
    {
      name: "Shatter / 长期项目占位",
      type: "3D 解谜 / 长期开发",
      role: "副程序或客户端核心模块",
      status: "补强中",
      links: ["Steam 页面待添加", "技术复盘待添加"],
      tags: ["Unity 3D", "资源管理", "UI 框架", "性能优化", "发布流程"],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "建议将这个项目作为未来网站的核心工程案例，用来集中证明长期项目开发、工程架构和发布闭环能力。",
      points: [
        {
          label: "我的职责",
          text: "建议明确写出你负责的模块，例如资源加载、UI 框架、关卡流程、存档、工具链或性能优化。",
        },
        {
          label: "目标强化",
          text: "补齐 Addressables、Profiler 数据、编辑器工具、技术复盘和版本迭代记录后，这个项目会成为最强展示位。",
        },
      ],
    },
  ],

  skills: [
    {
      group: "Unity 基础",
      status: "已具备",
      items: ["生命周期", "组件系统", "Prefab", "场景管理", "2D/3D 项目开发"],
    },
    {
      group: "Gameplay 系统",
      status: "已具备",
      items: ["状态机", "道具系统", "战斗逻辑", "关卡机制", "对话流程"],
    },
    {
      group: "C# 深度",
      status: "补强中",
      items: ["委托与事件", "泛型", "协程原理", "async/await", "GC 与装箱拆箱"],
    },
    {
      group: "UI 工程",
      status: "目标",
      items: ["页面栈", "弹窗管理", "列表复用", "分辨率适配", "UI 事件管理"],
    },
    {
      group: "资源管理",
      status: "目标",
      items: ["Addressables", "异步加载", "资源释放", "预加载", "场景切换"],
    },
    {
      group: "性能优化",
      status: "目标",
      items: ["Profiler", "Frame Debugger", "Memory Profiler", "对象池", "Draw Call"],
    },
    {
      group: "工程架构",
      status: "补强中",
      items: ["事件系统", "模块解耦", "MVC/MVVM", "日志系统", "调试面板"],
    },
    {
      group: "工具开发",
      status: "目标",
      items: ["Editor 工具", "配置导入", "资源检查", "批处理脚本", "自动化校验"],
    },
    {
      group: "网络基础",
      status: "补强中",
      items: ["HTTP", "TCP/WebSocket", "协议解析", "登录流程", "状态同步"],
    },
    {
      group: "AI 协同",
      status: "补强中",
      items: ["需求拆解", "代码审查", "Bug 定位", "工具脚本生成", "文档沉淀"],
    },
    {
      group: "渲染表现",
      status: "目标",
      items: ["URP", "Shader Graph", "HLSL 基础", "后处理", "特效性能"],
    },
    {
      group: "发布闭环",
      status: "目标",
      items: ["TapTap/Steam 打包", "版本记录", "崩溃日志", "玩家反馈", "迭代复盘"],
    },
  ],

  aiWorkflow: [
    {
      title: "需求拆解",
      text: "将玩法想法拆成状态、模块、数据结构和任务清单，再人工确认边界和优先级。",
    },
    {
      title: "方案对比",
      text: "用 AI 快速比较状态机、事件系统、MVC、配置表等实现方案，并结合项目规模做取舍。",
    },
    {
      title: "代码生成与审查",
      text: "让 AI 生成初版代码或工具脚本，自己负责结构调整、边界条件、命名、性能和可维护性审查。",
    },
    {
      title: "Bug 定位",
      text: "提供日志、调用栈、复现步骤和相关代码，让 AI 辅助缩小排查范围，最终通过运行结果验证。",
    },
    {
      title: "Editor 工具",
      text: "借助 AI 快速构建资源检查器、配置导入器、批量处理脚本，提升 Unity 项目开发效率。",
    },
    {
      title: "文档沉淀",
      text: "将项目设计、接口说明、技术复盘、README 和学习笔记整理成可持续维护的工程文档。",
    },
  ],

  awards: [
    { time: "2024-2026", title: "算法与程序设计竞赛", text: "包含 CCPC 省级奖项、百度之星、校级程序设计竞赛等奖项，可证明基础算法与逻辑能力。" },
    { time: "2025", title: "多次 GameJam 参赛与获奖", text: "参与 GMTK、TapTap、CiGA、GGJ 等项目，承担主程序或核心程序职责。" },
    { time: "在校期间", title: "奖学金与综合表现", text: "结合专业排名、奖学金和竞赛经历，体现稳定学习能力与持续产出。" },
  ],

  experience: [
    { time: "2024.09 - 2028.06", title: "哈尔滨理工大学 · 软件工程", text: "专业学习方向与 Unity 客户端开发结合，重点补强计算机基础、软件工程和游戏客户端工程能力。" },
    { time: "2025.09 - 至今", title: "独立游戏开发社团负责人", text: "组织 GameJam、技术分享、项目协作和校际交流，推动新人参与游戏开发项目。" },
    { time: "长期", title: "Unity 项目开发与复盘", text: "持续积累可玩的项目、技术文档、复盘文章和可展示素材，形成完整作品集。" },
  ],

  roadmap: [
    {
      title: "第一阶段：客户端硬基础",
      items: ["C# 深度", "Unity 生命周期", "协程", "UGUI", "对象池", "Profiler 入门"],
    },
    {
      title: "第二阶段：工程化能力",
      items: ["Addressables", "配置表流程", "存档系统", "事件系统", "日志与调试面板"],
    },
    {
      title: "第三阶段：证据型作品",
      items: ["长期项目", "性能优化案例", "Editor 工具", "AI 辅助开发案例"],
    },
    {
      title: "第四阶段：投递材料",
      items: ["网站作品集", "一页简历", "项目 README", "技术复盘 PDF"],
    },
  ],

  contactLinks: [
    { label: "GitHub", href: "#" },
    { label: "TapTap", href: "#" },
    { label: "邮箱", href: "mailto:your-email@example.com" },
    { label: "简历 PDF", href: "./assets/resume/resume.pdf" },
  ],
};
