"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { talentSystems } from "@/lib/constants";
import TalentMap from "@/components/TalentMap";
import { motion } from "framer-motion";
import { Layout, Settings, Zap, Users, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResultPage() {
  const router = useRouter();
  const { scores, isFinished, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!isFinished) {
      router.push("/");
    }
  }, [isFinished, router]);

  if (!isFinished) return null;

  // 根据分数确定天赋类型
  const getTalentType = () => {
    const { EI, LF } = scores;
    if (EI >= 0 && LF >= 0) return talentSystems.ARCHITECT;
    if (EI < 0 && LF >= 0) return talentSystems.OPTIMIZER;
    if (EI >= 0 && LF < 0) return talentSystems.VISIONARY;
    return talentSystems.CONNECTOR;
  };

  const talent = getTalentType();

  const iconMap: Record<string, any> = {
    Layout: <Layout size={32} className="text-blue-400" />,
    Settings: <Settings size={32} className="text-purple-400" />,
    Zap: <Zap size={32} className="text-pink-400" />,
    Users: <Users size={32} className="text-emerald-400" />,
  };

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 左侧：可视化地图 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 text-slate-800 font-mono text-[80px] leading-none pointer-events-none select-none">
            01
          </div>
          <h3 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-10">
            Talent Coordinate System
          </h3>
          <TalentMap ei={scores.EI} lf={scores.LF} />
        </motion.div>

        {/* 右侧：解构报告 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
                {iconMap[talent.icon]}
              </div>
              <div>
                <h4 className="text-slate-500 text-sm font-medium uppercase tracking-widest">你的核心驱动</h4>
                <p className="text-xl font-bold text-white">{talent.drive}</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {talent.name}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {talent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h5 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-widest">典型特质</h5>
              <div className="flex flex-wrap gap-2">
                {talent.traits.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
              <h5 className="text-xs font-bold text-red-500/60 uppercase mb-3 tracking-widest">能量黑洞 (痛苦来源)</h5>
              <p className="text-slate-400 text-xs leading-relaxed">{talent.pain}</p>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10">
              <h5 className="text-xs font-bold text-orange-500/80 uppercase mb-4 tracking-widest flex items-center gap-2">
                <Zap size={14} /> 避坑指南 (如何减少消耗)
              </h5>
              <ul className="space-y-3">
                {talent.avoidance.map((item, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
              <h5 className="text-xs font-bold text-blue-500/80 uppercase mb-4 tracking-widest flex items-center gap-2">
                <Layout size={14} /> 升维建议 (长轴发力路径)
              </h5>
              <ul className="space-y-3">
                {talent.path.map((item, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostic"
              className="flex-1 px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group"
            >
              进行疲惫诊断
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                resetQuiz();
                router.push("/test");
              }}
              className="px-8 py-4 bg-slate-900 text-white font-medium rounded-xl border border-slate-800 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              重新解构
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
