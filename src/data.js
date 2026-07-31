// 站点内容数据 —— 内容与原版完全一致，仅改为 ES Module 导出
export default {
  profile: {
    name: "林赫洋",
    school: "哈尔滨理工大学",
    major: "软件工程",
    graduation: "2028 年毕业",
    direction: "Unity 客户端开发",
    summary:
      "我是一名软件工程专业学生，专注 Unity 客户端开发 2 年，现担任学校独立游戏开发社团负责人。\n开发过多款 GameJam 与独立游戏项目并多次获奖，拥有良好的代码风格。\n对新技术保持兴趣，熟练运用 ChatGPT、Codex 等 AI 工具辅助开发，拥有自己的博客。\n热爱游戏并且想要从事游戏行业。",
    contactCopy:
      "",
  },

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
      type: "2D Roguelike / GMTK GameJam 2025",
      role: "主程序",
      status: "已具备",
      links: [
        { label: "GitHub", href: "https://github.com/Fleecebell/2025GMTK" },
        { label: "itch.io", href: "https://fleecebell.itch.io/infinity" },
      ],
      tags: [
        "Unity",
        "C#",
        "2D/3D 混合",
        "Roguelike",
        "道具系统",
        "对话系统",
        "相册机制",
        "地图旋转",
        "战斗系统",
        "Excel 配置",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "48 小时 GameJam 项目，围绕黄昏循环、Roguelike 战斗、物品成长、照片收集和地图变化构建完整玩法闭环。项目重点体现短周期内的系统拆解、快速实现、内容配置和团队交付能力。",
      points: [
        {
          label: "项目定位",
          text: "适合作为 GameJam 代表作展示，证明能在极短周期内完成核心玩法、系统整合和可玩版本交付。",
        },
        {
          label: "我的职责",
          text: "负责核心玩法逻辑、战斗流程、道具与装备效果、货币系统、相册选择、场景机制、相机跟随和项目集成。",
        },
        {
          label: "系统设计",
          text: "可将剧情、物品和事件拆成配置驱动结构，通过 Excel 或表格数据管理对话、道具效果、关卡参数和触发条件，降低硬编码比例。",
        },
        {
          label: "表现实现",
          text: "包含 2D Billboard 朝向相机、2D/3D 动画混合、视差背景、地图旋转、镜头跟随和照片展示等表现模块。",
        },
        {
          label: "可补强内容",
          text: "后续建议补充对象池、资源加载策略、GC 优化、关卡生成结构图和核心模块调用关系，让项目从 Demo 进一步升级成技术案例。",
        },
      ],
    },
    {
      name: "艾可与谜语森林",
      type: "3D 解谜 / TapTap Spotlight 2025",
      role: "主程序",
      status: "已具备",
      links: [
        { label: "TapTap", href: "https://www.taptap.cn/app/780492?os=pc" },
        { label: "GitHub", href: "https://github.com/lizhisunshine/2025TapTapGameJam" },
      ],
      tags: [
        "Unity 3D",
        "C#",
        "FSM",
        "Cinemachine",
        "3D 解谜",
        "场景交互",
        "AR 适配",
        "镜头控制",
        "状态管理",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "3D 解谜项目，负责角色交互、谜题流程、状态管理和镜头体验，并进行 AR 设备兼容方向探索。项目适合展示 3D 客户端交互、状态机设计和跨设备体验适配能力。",
      points: [
        {
          label: "项目定位",
          text: "适合作为 3D 项目代表作展示，重点证明对玩家状态、场景交互、镜头调度和谜题流程的综合控制能力。",
        },
        {
          label: "我的职责",
          text: "实现玩家状态机、场景交互逻辑、谜题触发流程、镜头控制、AR 设备兼容适配和项目版本集成。",
        },
        {
          label: "状态机设计",
          text: "可将移动、交互、观察、解谜、剧情触发等行为拆分为明确状态，减少条件判断混乱，提高调试效率。",
        },
        {
          label: "镜头与体验",
          text: "使用 Cinemachine 管理视角切换、跟随、观察和重点区域引导，让解谜信息传达更稳定。",
        },
        {
          label: "可补强内容",
          text: "建议补充状态机结构图、交互流程图、AR 适配问题记录、性能数据和玩家引导复盘，增强中大型公司关注的工程表达。",
        },
      ],
    },
    {
      name: "Flood!",
      type: "2D 双人合作 / 公益 GameJam 2025",
      role: "主程序",
      status: "已具备",
      links: [
        { label: "GmHub", href: "https://www.gmhub.com/game/8383" },
        { label: "GitHub", href: "https://github.com/1902231/Leak" },
      ],
      tags: [
        "Unity 2D",
        "C#",
        "本地合作",
        "水位系统",
        "场景事件",
        "修复机制",
        "UI 反馈",
        "视差背景",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "围绕房屋漏水、门窗损坏、玩家修复和水位上涨构建 2D 合作玩法。项目重点体现对实时状态变化、反馈节奏和双人协作机制的快速实现能力。",
      points: [
        {
          label: "项目定位",
          text: "适合作为合作玩法项目展示，证明能够把简单规则扩展成具有压力、协作和反馈闭环的可玩系统。",
        },
        {
          label: "我的职责",
          text: "负责水位变化、门窗周期损坏、修复进度、UI 反馈、场景事件、视差背景和核心协作玩法逻辑。",
        },
        {
          label: "核心机制",
          text: "通过门窗损坏影响水位上涨速度，玩家需要分工修复、观察场景状态并在时间压力下保持房屋安全。",
        },
        {
          label: "反馈设计",
          text: "通过进度条、水位变化、损坏状态和场景表现，让玩家能快速理解当前风险和操作结果。",
        },
        {
          label: "可补强内容",
          text: "可扩展为本地输入系统复盘、双人协作状态管理、事件调度方案，或进一步补充网络同步版本作为学习目标。",
        },
      ],
    },
    {
      name: "A Little Bit Slower",
      type: "2D 平台跳跃 / 广东高校 GameJam 2025",
      role: "主程序",
      status: "已具备",
      links: [
        { label: "GitHub", href: "https://github.com/Fleecebell/ALittle-Git" },
      ],
      tags: [
        "Unity 2D",
        "C#",
        "平台跳跃",
        "随机地牢",
        "AI 行为",
        "背包系统",
        "MVC",
        "机关系统",
        "视差背景",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "2D 平台跳跃项目，围绕节奏变化、关卡探索、机关互动和角色移动手感构建玩法。项目曾在广东高校 GameJam 中取得第五名，适合展示平台动作、关卡生成和系统组织能力。",
      points: [
        {
          label: "项目定位",
          text: "适合作为 2D 操作手感和关卡机制项目展示，证明对角色控制、机关反馈、关卡结构和短周期玩法验证的理解。",
        },
        {
          label: "我的职责",
          text: "负责玩家控制、平台跳跃逻辑、机关触发、随机地牢生成、AI 行为、背包系统、UI 反馈和项目整合。",
        },
        {
          label: "关卡系统",
          text: "可将房间、机关、敌人、奖励和出生点抽象为关卡片段，通过随机生成或规则组合提升重复游玩空间。",
        },
        {
          label: "架构实践",
          text: "背包和交互模块可采用 MVC 思路拆分数据、显示和操作逻辑，避免 UI 与 Gameplay 直接耦合。",
        },
        {
          label: "可补强内容",
          text: "建议补充输入缓冲、土狼时间、跳跃曲线调参、关卡生成规则图、AI 状态图和平台跳跃手感复盘。",
        },
      ],
    },
    {
      name: "面颜",
      type: "2D AVG / Global Game Jam 2026",
      role: "主程序",
      status: "已具备",
      links: [
        { label: "GmHub", href: "https://www.gmhub.com/game/9210" },
      ],
      tags: [
        "Unity 2D",
        "C#",
        "AVG",
        "剧情分支",
        "UI 适配",
        "队列调度",
        "状态限制",
        "拖拽吸附",
        "存档",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "2D AVG 项目，围绕角色状态、剧情推进、选择分支和 UI 交互构建叙事体验。项目适合展示对剧情系统、UI 适配、交互约束和短周期脚本开发的综合能力。",
      points: [
        {
          label: "项目定位",
          text: "适合作为叙事交互和 UI 系统项目展示，证明能处理剧情流程、分支选择、角色状态和界面反馈。",
        },
        {
          label: "我的职责",
          text: "负责剧情推进逻辑、角色状态限制、队列延迟复现行为、UI 适配、拖拽吸附、分支选择、存档和核心脚本开发。",
        },
        {
          label: "流程控制",
          text: "可通过队列调度管理延迟行为、剧情事件和角色反馈，保证叙事节奏稳定且便于调试。",
        },
        {
          label: "UI 与交互",
          text: "包含分辨率适配、交互区域判断、拖拽吸附、选择反馈和状态限制，适合扩展成完整 UI 框架案例。",
        },
        {
          label: "可补强内容",
          text: "建议补充剧情节点数据结构、分支图、存档格式、UI 页面管理方案和 AI 辅助剧情脚本整理过程。",
        },
      ],
    },
    {
      name: "Shatter",
      type: "3D 解谜 / CiGA GameJam 2025 / 长期开发",
      role: "副程序",
      status: "补强中",
      links: [],
      tags: [
        "Unity 3D",
        "C#",
        "3D 解谜",
        "关卡流程",
        "资源管理",
        "UI 框架",
        "性能优化",
        "发布流程",
        "Steam 计划",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "3D 解谜项目，当前可作为未来网站的核心工程案例。相比短周期 GameJam，它更适合承载长期开发、工程架构、资源管理、性能优化和发布闭环的展示目标。",
      points: [
        {
          label: "项目定位",
          text: "适合作为未来最核心的长期项目展示位，用来证明你不只会做 Demo，也能参与可持续迭代的游戏客户端工程。",
        },
        {
          label: "我的职责",
          text: "建议根据真实参与情况明确写出负责模块，例如谜题交互、关卡流程、UI 框架、存档、资源加载、工具链、性能优化或版本集成。",
        },
        {
          label: "工程化方向",
          text: "可在项目中补齐 Addressables、异步加载、配置表、日志系统、调试面板、资源释放和打包流程。",
        },
        {
          label: "性能与发布",
          text: "建议记录优化前后 FPS、GC Alloc、Draw Call、内存占用和加载时间，并沉淀 Steam/TapTap 发布流程与版本迭代记录。",
        },
        {
          label: "可补强内容",
          text: "补齐核心架构图、模块责任边界、性能数据、编辑器工具、版本日志和技术复盘后，这个项目会成为最强展示位。",
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
    { time: "2024-2025", title: "算法与程序设计竞赛", text: "传智杯程序设计挑战（国赛）- 二等奖\nCCPC 黑龙江省大学生程序设计竞赛 - 三等奖\n黑龙江省赛百度之星程序设计大赛 - 铜奖\n码蹄杯程序设计大赛 - 铜奖\n科林明伦杯程序设计比赛 - 二等奖\n哈理工计算机院程序设计比赛 - 一等奖" },
    { time: "2025-2026", title: "GameJam 获奖", text: "2025 CiGA GameJam - 多半好评奖\n2025 广东大学生 GameJam - 第五名\n2025 TapTap 聚光灯 - 入围 25 全球 AR&AI 开发大赛\n2026 Global GameJam - 特别好评奖" },
    { time: "在校期间", title: "其他", text: "外语六级 CRT-6\n普通话二甲\n多次奖学金" },
  ],

  experience: [
    { time: "2024.09 - 2028.06", title: "哈尔滨理工大学 · 软件工程", text: "主修科目：C/C++编程、Java编程、数据结构、操作系统、计算机组成原理、数据库系统、计算机网络" },
    { time: "2025.09 - 至今", title: "独立游戏开发社团负责人", text: "组织 GameJam、技术分享、项目协作和校际交流，推动新人参与游戏开发项目。" },
    { time: "2026.6 - 2026.8", title: "实习经历", text: "数据湍流(广州)信息科技有限公司 - Unity开发实习生" },
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
    { label: "GitHub", href: "https://github.com/Fleecebell", icon: "./assets/github.png" },
    { label: "TapTap", href: "https://www.taptap.cn/user/44105615", icon: "./assets/taptap.png" },
    { label: "邮箱", href: "mailto:2126401535@qq.com", icon: "./assets/邮箱.png" },
    { label: "简历", href: "./assets/resume/resume.pdf", icon: "./assets/简历.png" },
  ],
};
