export interface TalentType {
  id: string;
  name: string;
  drive: string;
  description: string;
  pain: string;
  icon: string;
  traits: string[];
  avoidance: string[]; // 避坑指南
  path: string[];      // 升维建议
  tools: { name: string; desc: string }[]; // 生产力实验室工具
  roadmap: { title: string; desc: string }[]; // 命运重塑路径
}

export const talentSystems: Record<string, TalentType> = {
  ARCHITECT: {
    id: "ARCHITECT",
    name: "架构师 (The Architect)",
    drive: "构建系统 (Build)",
    description: "你是秩序的立法者。你不仅仅是在制造信息，你是在设计规则。面对混乱，你的本能是建立逻辑自洽的微型世界。",
    pain: "重复的机械劳动、无逻辑的情绪宣泄。",
    icon: "Layout",
    traits: ["抽象思考", "设计规则", "拆解复杂性"],
    avoidance: [
      "避免陷入没有任何逻辑规则的琐碎执行工作中。",
      "警惕过度抽象而脱离实际应用场景。",
      "减少参与纯情感驱动、无事实支撑的决策会议。"
    ],
    path: [
      "深耕底层逻辑，尝试从 0 到 1 构建可复用的系统框架。",
      "学习系统动力学，提升对复杂因果链条的预判能力。",
      "将你的规则“产品化”，让你的逻辑成为他人的基础设施。"
    ],
    tools: [
      { name: "Obsidian / Logseq", desc: "利用双向链接构建知识图谱与逻辑网络。" },
      { name: "Mermaid / Miro", desc: "将复杂的系统架构可视化，清晰呈现因果链条。" },
      { name: "Linear / Jira", desc: "设计标准化的任务流转规则，建立团队秩序。" }
    ],
    roadmap: [
      { title: "系统架构师 / CTO", desc: "从代码逻辑到业务逻辑，构建企业的数字地基。" },
      { title: "法律 / 政策制定者", desc: "在社会层面建立规则，用逻辑治理混乱。" },
      { title: "开源项目发起人", desc: "设计一种协作模式，让全球开发者在你的规则下共创。" }
    ]
  },
  OPTIMIZER: {
    id: "OPTIMIZER",
    name: "优化师 (The Optimizer)",
    drive: "精进完美 (Refine)",
    description: "你是秩序的守护者。你追求极致的效能和零误差，给你一个 60 分的流程，你能把它调教到 99 分。",
    pain: "频繁的变动、缺乏标准的混乱环境。",
    icon: "Settings",
    traits: ["对抗熵增", "追求极致", "匠心精神"],
    avoidance: [
      "避免参与边界极度模糊、目标频繁变动的“开路”型任务。",
      "警惕在不具备优化价值的垃圾流程上浪费过多精力。",
      "减少处理高度非标准化、极度依赖人情世故的突发状况。"
    ],
    path: [
      "将你的优化逻辑自动化，利用工具或 AI 放大你的精进效率。",
      "建立自己的标准化 SOP 库，成为团队效能的压舱石。",
      "从局部优化转向全链路优化，提升系统的整体熵减能力。"
    ],
    tools: [
      { name: "Raycast / Alfred", desc: "通过自动化工作流消除每一个多余的点击。" },
      { name: "Notion (Databases)", desc: "利用高度标准化的数据库建立无死角的管理闭环。" },
      { name: "Zapier / Make", desc: "连接孤岛工具，实现全链路的自动化效能提升。" }
    ],
    roadmap: [
      { title: "运营专家 / 精益生产经理", desc: "在成熟体系中压榨出每一分潜能，对抗熵增。" },
      { title: "质量保证 / 审计专家", desc: "做最后一道防线，确保系统在 99.99% 的可靠性运行。" },
      { title: "专业工匠 / 高级技术专家", desc: "在特定领域深挖，用细节的偏执建立竞争壁垒。" }
    ]
  },
  VISIONARY: {
    id: "VISIONARY",
    name: "梦想家 (The Visionary)",
    drive: "启迪人心 (Inspire)",
    description: "你是灵感的捕手。你不在乎逻辑是否严密，你在乎冲击力。你的价值在于点燃火种，描绘未来。",
    pain: "繁琐的行政流程、冷冰冰的数据分析。",
    icon: "Zap",
    traits: ["直觉敏锐", "极具感染力", "描绘未来"],
    avoidance: [
      "避免被困在需要极度细心和长久耐心的账目对账或代码 Debug 中。",
      "警惕为了合群而强行压抑自己的直觉去迎合死板的数据。",
      "减少参与漫长且毫无激情的纯事务性例会。"
    ],
    path: [
      "强化你的视觉化表达能力，将模糊的灵感转化为具象的冲击力。",
      "寻找能够支撑你落地的“架构师”或“优化师”伙伴，组建天赋互补团队。",
      "深耕内容创作或公共演讲，放大你的情感感染力和影响力。"
    ],
    tools: [
      { name: "Midjourney / Runway", desc: "利用生成式 AI 快速将脑海中的愿景视觉化。" },
      { name: "Figma (Creative Flow)", desc: "在无限画布上捕捉闪烁的灵感与情感共鸣点。" },
      { name: "Substack / YouTube", desc: "建立个人叙事频道，用故事点燃他人的行动火种。" }
    ],
    roadmap: [
      { title: "产品负责人 / 创意总监", desc: "定义产品的灵魂与愿景，指引团队前进的方向。" },
      { title: "布道师 / 公众演讲者", desc: "传播新观念，改变人们对未来的认知与预期。" },
      { title: "艺术家 / 独立导演", desc: "用极具冲击力的作品直接与人的灵魂进行能量交换。" }
    ]
  },
  CONNECTOR: {
    id: "CONNECTOR",
    name: "连接者 (The Connector)",
    drive: "编织关系 (Nurture)",
    description: "你是团队的粘合剂。你对“事”没那么感兴趣，但你对“人”有极高的敏感度。你是信息的路由器，也是情感的避风港。",
    pain: "孤立的工作环境、没有人情味的决策。",
    icon: "Users",
    traits: ["共共情能力", "路由情感", "编织关系"],
    avoidance: [
      "避免长时间处于完全孤立、缺乏社交互动的纯技术环境。",
      "警惕过度消耗自己的情绪价值去填补团队中不合理的管理漏洞。",
      "减少处理冰冷的、不涉及任何人的机器维护或纯静态数据整理。"
    ],
    path: [
      "建立并维护你的高质量人才库，成为跨领域的“超级枢纽”。",
      "学习心理学或谈判策略，将天生的感性升华为专业的洞察力。",
      "在组织中担任协调、BD 或人才发展核心角色，实现人与资源的指数级连接。"
    ],
    tools: [
      { name: "Clay / Monica (CRM)", desc: "管理深度人际网络，不遗漏任何一段有价值的关系。" },
      { name: "Discord / Slack", desc: "构建高频互动的社区环境，激发群体能量。" },
      { name: "Calendar (Networking)", desc: "科学规划社交带宽，在关键节点进行情感缝合。" }
    ],
    roadmap: [
      { title: "社区负责人 / 增长官", desc: "通过人的连接实现业务的爆发式增长。" },
      { title: "人力资源合作伙伴 / 教练", desc: "挖掘人的潜力，解决组织中由于人的问题导致的瓶颈。" },
      { title: "天使投资人 / 资源掮客", desc: "识别高能级的人才并为其匹配最合适的生存土壤。" }
    ]
  },
};

