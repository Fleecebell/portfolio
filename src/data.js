// 站点内容数据 —— 内容与原版完全一致，仅改为 ES Module 导出
export default {
  profile: {
    name: "林赫洋",
    school: "哈尔滨理工大学",
    major: "软件工程",
    graduation: "2028 年毕业",
    direction: "Unity 客户端开发",
    summary:
      "软件工程专业，专注 Unity 客户端开发 2 年，担任学校独立游戏开发社团负责人。\n开发过多款 GameJam 与独立游戏项目并多次获奖，拥有良好的代码风格。\n熟练运用 Codex 等 AI 工具、git 和 svn 等版本管理工具。\n热爱游戏并且想要从事游戏行业。",
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
        "一款 2D 地牢战斗 Roguelike 游戏，游戏以北欧神话为创作背景，玩家将扮演从赫尔海姆地牢中苏醒，失去记忆的神明洛基，踏上征途；在旅途中逐渐揭开自己与诸神的过往，最终向阿斯加德挥出复仇的锋刃，为诸神带来黄昏，引导新世界的轮回。",
      points: [
        { 
          text: "核心玩法逻辑、战斗系统、货币系统、背包系统、怪物 AI 系统、道具与装备效果，读取 Excel 表格中物体的数值和图片。",
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
        "一款 3D 解谜游戏，玩家需要扮演一只迷失的小狐狸，利用道具穿越于表里世界，解决各种谜题，探索神秘森林并救出被囚禁的小动物。玩家可以通过 PC 端或 VR 眼镜在 3D 世界中探索谜题。",
      points: [
        {
          text: "实现玩家状态机、场景交互逻辑、谜题触发流程、相机在场景中的运镜控制、AR 设备的兼容适配",
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
        "围绕房屋漏水、门窗损坏、水位上涨和玩家修复构建 2D 双人合作游戏。玩家需要相互配合，合理利用手里的资源，修补门窗，控制水位高度，坚持到救援的到来。",
      points: [
        {
          text: "2D 物理水和水位变化算法、门窗周期损坏、修复进度、UI 反馈、场景事件、视差背景和核心协作玩法逻辑。",
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
        "一款 2D 平台跳跃游戏，主角身边有一个延迟复刻自身行为的影子，玩家需要利用影子与主角的配合，穿过各种障碍并到达终点，解开影子的秘密。",
      points: [
        {
          text: "基于队列的延迟复刻功能、平台运动逻辑、机关触发以及多种场景的特殊效果。"
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
        "2D AVG 项目，玩家将扮演一位专为特定人群服务的化妆师，通过倾听、观察与化妆选择，帮助顾客设计出他们渴望的“面容”，走向故事的不同结局。游戏以对话互动、情感化的化妆过程与多重分支叙事为核心体验，探讨身份、认同与自我接纳的日常生活命题。",
      points: [
        {
          text: "剧情推进逻辑、剧情分支系统、角色状态限制、拖拽吸附功能、存档系统",
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
        "一款 3D 解谜游戏。因遭到诅咒，庄园中居住的领主一家主仆全部变成了会说话的家具，并且遗忘了自己的身份和经历。玩家需要通过对话和探索不断收集信息，一步一步还原他们的遭遇，拼凑出每个人的身份，最终找出他们被诅咒的原因，用相机将他们一一超度。",
      points: [
        {
          text: "拍照功能、照片存储功能、相册功能、对话系统、3D 场景中的相机运镜",
        },
      ],
    },
    {
      name: "未命名策略游戏",
      type: "2D 策略",
      role: "主程序",
      status: "已具备",
      links: [],
      tags: [
        "Unity 2D",
        "C#",
        "策略",
        "蜂窝棋盘",
        "重力系统",
        "连锁反应",
        "分数系统",
        "随机地图",
        "立方坐标",
      ],
      media: {
        images: ["", "", ""],
        video: "",
      },
      summary:
        "一款 2D 策略游戏。玩家旋转蜂窝棋盘，拍击后锁定重力方向，让棋子坠落、碰撞，并触发爆炸、分裂、吞噬、反弹等能力。在有限拍击次数内规划路线、制造连锁，达到目标分数并挑战不断变化的棋局。",
      points: [
        {
          text: "棋子功能及其连锁反应、重力效果、分数系统、立方坐标随机地图功能",
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
    { time: "2026.6 - 2026.8", title: "实习经历", text: "数据湍流(广州)信息科技有限公司 - Unity游戏开发工程师(实习)", expand: "新项目立项初期入职，作为项目唯一程序员，从零构建整套游戏框架，独立完成核心系统设计与实现。" },
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
