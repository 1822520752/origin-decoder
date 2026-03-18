export type Dimension = "EI" | "LF"; // EI: Energy Flow (开创 vs 迭代), LF: Attention Core (逻辑 vs 感受)

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    dimension: Dimension;
    score: number; // -1 for negative (Iteration/Feeling), 1 for positive (Creation/Logic)
  }[];
}

export const questions: Question[] = [
  // 维度一：能量流向 (EI) - 开创 (1) vs 迭代 (-1)
  {
    id: 1,
    text: "面对一张白纸，你的第一反应是？",
    options: [
      { text: "感到兴奋，大脑中立刻浮现出各种不曾存在的新点子。", dimension: "EI", score: 1 },
      { text: "希望上面已经有一些基础素材，以便我进行优化或整理。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 2,
    text: "在一个成熟的项目中，你更喜欢哪种工作？",
    options: [
      { text: "寻找新的增长点，甚至尝试推倒重来，寻找更好的替代方案。", dimension: "EI", score: 1 },
      { text: "打磨现有的细节，让整个系统运行得更加完美、高效、无误。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 3,
    text: "你如何看待“不确定性”？",
    options: [
      { text: "那是机会的代名词，我享受在迷雾中开辟道路的过程。", dimension: "EI", score: 1 },
      { text: "那是风险的来源，我更倾向于在有明确边界的范围内工作。", dimension: "EI", score: -1 },
    ],
  },
  // 维度二：关注内核 (LF) - 逻辑 (1) vs 感受 (-1)
  {
    id: 4,
    text: "在评估一个方案时，你首先关注的是？",
    options: [
      { text: "它的逻辑是否自洽，因果链条是否清晰，效率是否最高。", dimension: "LF", score: 1 },
      { text: "它给人的直观感受如何，是否能引起情感共鸣，对人的影响是什么。", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 5,
    text: "当团队出现分歧时，你倾向于如何解决？",
    options: [
      { text: "分析数据和事实，通过逻辑推导找到最客观正确的答案。", dimension: "LF", score: 1 },
      { text: "感知大家的情绪状态，通过沟通和共情来达成心理上的共识。", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 6,
    text: "你的成就感更多来自于？",
    options: [
      { text: "构建了一个复杂且运转良好的系统或解决了一个难题。", dimension: "LF", score: 1 },
      { text: "看到自己的作品打动了他人，或者建立了一段深厚的关系。", dimension: "LF", score: -1 },
    ],
  },
  // 混合/剥离消费幻觉题目
  {
    id: 7,
    text: "如果你有充足的闲暇时间，你更倾向于？",
    options: [
      { text: "学习一项极具挑战的新技能，或者从头开始做一个自己的小项目。", dimension: "EI", score: 1 },
      { text: "阅读、旅游或打游戏，享受现有的高品质消费体验。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 8,
    text: "你对“美”的理解更倾向于？",
    options: [
      { text: "简洁的公式、严谨的结构或极致的工程效率之美。", dimension: "LF", score: 1 },
      { text: "动人的故事、细腻的情感或人与人之间的温情之美。", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 9,
    text: "在一个全新的任务面前，你更倾向于？",
    options: [
      { text: "立刻动手调研，尝试通过实验找到一种从未被验证过的方法。", dimension: "EI", score: 1 },
      { text: "寻找现有的最佳实践案例，通过分析成功经验来规避可能的错误。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 10,
    text: "在项目冲刺阶段，你觉得什么才是最核心的驱动力？",
    options: [
      { text: "目标的达成、流程的优化以及每一个细节的无缝对接。", dimension: "LF", score: 1 },
      { text: "团队的士气、彼此间的信任以及大家对共同愿景的认可。", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 11,
    text: "你如何看待“重复性工作”？",
    options: [
      { text: "那会扼杀我的灵感，我更希望不断面对新的挑战和未知。", dimension: "EI", score: 1 },
      { text: "那是磨练技艺的过程，我享受在熟练中追求极致效率的快感。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 12,
    text: "在学习新知识时，你的切入点通常是？",
    options: [
      { text: "理解其底层的原理和逻辑框架，看它如何构建起整个知识体系。", dimension: "LF", score: 1 },
      { text: "了解它的实际应用场景，感受它如何改变人们的生活或解决具体痛苦。", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 13,
    text: "如果你的工作是设计一款产品，你最不能忍受的是？",
    options: [
      { text: "产品缺乏创新，只是在机械地复制现有的平庸方案。", dimension: "EI", score: 1 },
      { text: "产品逻辑混乱，即使功能再多也无法形成一个闭环系统。", dimension: "LF", score: 1 },
    ],
  },
  {
    id: 14,
    text: "当别人评价你的工作成果时，你更希望听到？",
    options: [
      { text: "“这真是太巧妙了，你的逻辑和结构简直无懈可击！”", dimension: "LF", score: 1 },
      { text: "“这太感人了，它真的触动了我的内心并解决了我的困扰。”", dimension: "LF", score: -1 },
    ],
  },
  {
    id: 15,
    text: "你理想的工作环境是？",
    options: [
      { text: "充满未知的实验室或初创团队，每天都在探索和碰撞新事物。", dimension: "EI", score: 1 },
      { text: "纪律严明且目标明确的专业机构，每个人都在自己的领域追求极致。", dimension: "EI", score: -1 },
    ],
  },
  {
    id: 16,
    text: "在深夜思考时，你更容易陷入哪种状态？",
    options: [
      { text: "构思一个新的宏大蓝图，或是推演某个复杂系统的逻辑闭环。", dimension: "LF", score: 1 },
      { text: "回味一段深刻的情感交流，或是共情某个群体面临的生存困境。", dimension: "LF", score: -1 },
    ],
  },
];
