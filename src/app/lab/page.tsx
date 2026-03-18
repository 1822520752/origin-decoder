"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { talentSystems } from "@/lib/constants";
import { motion } from "framer-motion";
import { FlaskConical, ArrowRight, CheckCircle2, Layout, Settings, Zap, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function LabPage() {
  const router = useRouter();
  const { scores, isFinished } = useQuizStore();

  useEffect(() => {
    if (!isFinished) {
      router.push("/test");
    }
  }, [isFinished, router]);

  if (!isFinished) return null;

  const getTalentType = () => {
    const { EI, LF } = scores;
    if (EI >= 0 && LF >= 0) return talentSystems.ARCHITECT;
    if (EI < 0 && LF >= 0) return talentSystems.OPTIMIZER;
    if (EI >= 0 && LF < 0) return talentSystems.VISIONARY;
    return talentSystems.CONNECTOR;
  };

  const talent = getTalentType();

  const iconMap: Record<string, any> = {
    Layout: <Layout size={20} />,
    Settings: <Settings size={20} />,
    Zap: <Zap size={20} />,
    Users: <Users size={20} />,
  };

  return (
    <main className="min-h-screen py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase tracking-[0.2em] mb-6">
          <FlaskConical size={12} />
          <span>Module 03: Productivity Lab</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
          生产力 <span className="text-purple-500">实验室</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          根据你的天赋坐标 <span className="text-white font-bold">[{talent.name}]</span>，我们为你筛选了最能放大你“长轴”能效的生产力工具集。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：天赋概览 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-sm bg-slate-900/40 border border-slate-800 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              {iconMap[talent.icon]}
            </div>
            <h2 className="text-sm font-mono text-purple-500 uppercase tracking-widest mb-4">当前实验主体</h2>
            <div className="text-2xl font-black text-white mb-2 uppercase">{talent.name}</div>
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-6">{talent.drive}</div>
            
            <div className="space-y-4">
              {talent.traits.map((trait, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={14} className="text-purple-500" />
                  {trait}
                </div>
              ))}
            </div>
          </div>

          <Link href="/roadmap" className="block p-8 rounded-sm bg-purple-600 text-white hover:bg-purple-500 transition-all group">
            <div className="text-xs font-mono uppercase tracking-widest mb-2 opacity-80">Next Module</div>
            <div className="text-xl font-black uppercase flex items-center gap-2">
              命运重塑路径 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 右侧：工具建议 */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {talent.tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-sm bg-slate-900/40 border border-slate-800 hover:border-purple-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-purple-500/10 transition-all" />
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tool.desc}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                Experimenting <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
              </div>
            </motion.div>
          ))}

          {/* AI 辅助策略卡片 */}
          <div className="md:col-span-2 p-8 rounded-sm bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">AI 协同策略</h3>
              <p className="text-slate-200 text-lg font-medium leading-relaxed mb-6">
                “对于{talent.name}来说，AI 不应该是替代者，而是你逻辑/直觉的倍增器。”
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">策略 A</div>
                  <p className="text-sm text-slate-400">利用 LLM 辅助你完成{talent.pain.split('、')[0]}等低熵任务。</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">策略 B</div>
                  <p className="text-sm text-slate-400">将你的{talent.traits[0]}能力通过 Prompt Engineering 转化为可重复的自动化工作流。</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
