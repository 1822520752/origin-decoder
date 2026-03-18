"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Zap, BarChart3, PieChart as PieIcon, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

interface Task {
  id: string;
  name: string;
  dimension: "EI" | "LF" | "BOTH";
  type: "CREATION" | "ITERATION" | "LOGIC" | "FEELING" | "UNKNOWN";
  timeWeight: number; // 占据时间比例 1-100
  energyCost: number; // 能量消耗感 1-10 (10为极度疲惫, 1为充满活力)
}

export default function DiagnosticPage() {
  const router = useRouter();
  const { scores, isFinished } = useQuizStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [timeWeight, setTimeWeight] = useState(20);
  const [energyCost, setEnergyCost] = useState(5);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!isFinished) {
      router.push("/test");
    }
  }, [isFinished, router]);

  if (!isFinished) return null;

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      name: taskName,
      dimension: "BOTH",
      type: "UNKNOWN",
      timeWeight,
      energyCost,
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTimeWeight(20);
    setEnergyCost(5);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const calculateFatigue = () => {
    setShowResult(true);
  };

  // 改进的错位分析逻辑
  const getAnalysis = () => {
    const { EI, LF } = scores;
    
    // 计算总加权疲惫值
    const totalWeight = tasks.reduce((acc, t) => acc + t.timeWeight, 0) || 100;
    const weightedEnergyCost = tasks.reduce((acc, t) => acc + (t.energyCost * t.timeWeight), 0) / totalWeight;
    
    // 疲惫指数计算：基础能耗(0-10) -> 百分比(0-100)
    const fatigueScore = Math.min(Math.round(weightedEnergyCost * 10), 99);

    const isCreative = EI >= 0;
    const isLogic = LF >= 0;

    let recommendation = "";
    if (fatigueScore > 70) {
      recommendation = isCreative 
        ? "严重的能量错位。你天生适合在不确定性中开辟新径，但目前的任务列表充满了高能耗的琐碎维护工作。这种“用短轴追逐长轴”的模式正迅速榨干你的创造力。"
        : "结构性疲惫。你擅长在既有框架内追求完美，但当前任务可能过于跳跃且缺乏逻辑支撑，导致你必须在混乱中强行维持秩序。";
    } else if (fatigueScore > 40) {
      recommendation = "轻度能耗预警。你的大部分任务与天赋基本匹配，但仍有部分“能量黑洞”任务占据了你的核心时段。建议通过优化流程或小幅度外包来进一步提升能效。";
    } else {
      recommendation = "天赋共振状态。恭喜！你目前的任务分配与你的底层生产天赋高度吻合，你正处于极佳的“心流”潜伏期。";
    }

    // 为图表准备数据
    const chartData = tasks.map(t => ({
      name: t.name,
      value: t.timeWeight * t.energyCost,
      time: t.timeWeight,
      cost: t.energyCost
    }));

    return {
      score: fatigueScore,
      mismatchCount: tasks.filter(t => t.energyCost > 7).length,
      recommendation,
      chartData
    };
  };

  const analysis = getAnalysis();

  const COLORS = ['#3b82f6', '#f97316', '#a855f7', '#10b981', '#f43f5e'];

  return (
    <main className="min-h-screen py-24 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] uppercase tracking-[0.2em] mb-6">
          <Activity size={12} />
          <span>Module 02: Fatigue Diagnostic</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
          疲惫 <span className="text-pink-500">诊断仪</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          审计日常任务的能量流向，定位天赋错位点，揭示职场疲惫的底层真相。
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-sm backdrop-blur-sm space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="例如：整理周报、设计产品架构、跨部门沟通..."
              className="flex-1 bg-slate-950/50 border border-slate-800 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-600 font-mono text-sm"
            />
            <button
              onClick={addTask}
              className="px-8 py-4 bg-pink-600 text-white font-black uppercase text-xs tracking-widest rounded-sm hover:bg-pink-500 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Plus size={16} /> 添加任务
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Time Weight / 时间占比</span>
                <span className="text-pink-500 font-mono">{timeWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={timeWeight}
                onChange={(e) => setTimeWeight(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-pink-500"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Energy Cost / 主观疲惫感</span>
                <span className="text-orange-400 font-mono">{energyCost}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyCost}
                onChange={(e) => setEnergyCost(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between p-6 bg-slate-900/20 border border-slate-800 rounded-sm group hover:border-pink-500/30 transition-all"
              >
                <div className="flex-1">
                  <div className="text-slate-200 font-bold uppercase text-sm mb-1 tracking-tight">{task.name}</div>
                  <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-slate-500">Time: <span className="text-pink-500">{task.timeWeight}%</span></span>
                    <span className="text-slate-500">Cost: <span className="text-orange-400">{task.energyCost}/10</span></span>
                  </div>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {tasks.length > 0 && !showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={calculateFatigue}
            className="w-full py-5 bg-slate-100 text-slate-950 font-black uppercase text-xs tracking-[0.2em] rounded-sm hover:bg-white transition-all mt-10"
          >
            开始诊断任务矩阵
          </motion.button>
        )}
      </div>

      {/* 诊断结果 */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 p-10 rounded-sm bg-slate-900/40 border border-pink-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity size={120} />
            </div>

            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-sm bg-pink-600/20 flex items-center justify-center text-pink-500 border border-pink-500/30">
                <Zap size={20} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">诊断完成：能量错位预警 Report</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 rounded-sm bg-slate-950/50 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-600 uppercase mb-4 tracking-widest">综合疲惫指数 (Fatigue Index)</div>
                <div className={`text-6xl font-black ${analysis.score > 70 ? 'text-red-500' : analysis.score > 40 ? 'text-orange-400' : 'text-emerald-400'}`}>
                  {analysis.score}<span className="text-xl">%</span>
                </div>
              </div>
              <div className="p-8 rounded-sm bg-slate-950/50 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-600 uppercase mb-4 tracking-widest">能量黑洞占比 (Mismatch Rate)</div>
                <div className="text-6xl font-black text-slate-200">{analysis.mismatchCount}<span className="text-xl">/{tasks.length}</span></div>
              </div>
            </div>

            {/* 可视化图表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 rounded-sm bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-2 mb-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  <PieIcon size={14} /> 能量消耗分布
                </div>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysis.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {analysis.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '0px', fontFamily: 'monospace', fontSize: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-8 rounded-sm bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-2 mb-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  <BarChart3 size={14} /> 时间 vs 疲惫度
                </div>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" hide />
                      <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '0px', fontFamily: 'monospace', fontSize: '10px' }}
                      />
                      <Bar dataKey="time" name="时间占比" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="cost" name="疲惫程度" fill="#f97316" radius={[0, 0, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-sm bg-pink-600/5 border border-pink-500/20">
              <h3 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={14} /> 深度诊断建议
              </h3>
              <p className="text-slate-300 leading-relaxed font-light text-lg">
                {analysis.recommendation}
              </p>
              <div className="mt-8 p-6 bg-slate-950/50 rounded-sm border border-pink-500/10 text-xs text-slate-500 italic font-mono uppercase tracking-wider">
                "When you allocate 80% of your energy to tasks that align with your core coordinates, fatigue transforms into achievement."
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/lab" className="px-10 py-5 bg-pink-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-sm hover:bg-pink-500 transition-all flex items-center gap-3">
                前往生产力实验室 <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

