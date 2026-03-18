"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { talentSystems } from "@/lib/constants";
import { motion } from "framer-motion";
import { Map, ArrowRight, TrendingUp, CheckCircle2, Layout, Settings, Zap, Users, Trophy, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function RoadmapPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.2em] mb-6">
          <Map size={12} />
          <span>Module 04: Destiny Roadmap</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
          命运重塑 <span className="text-emerald-500">路径</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          天赋到职业/项目的映射矩阵。规划你的 <span className="text-white font-bold italic underline decoration-emerald-500 underline-offset-4">降维打击</span> 路径，实现职业生涯的指数级增长。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：天赋肖像 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-sm bg-slate-900/40 border border-slate-800 backdrop-blur-sm relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              {iconMap[talent.icon]}
            </div>
            <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-4">当前路径主体</h2>
            <div className="text-2xl font-black text-white mb-2 uppercase">{talent.name}</div>
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-8">{talent.drive}</div>
            
            <div className="flex-grow space-y-6">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-sm">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <TrendingUp size={12} /> 核心竞争优势 (长轴)
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  “{talent.description.split('。')[0]}。”
                </p>
              </div>

              <div className="space-y-4">
                {talent.path.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500/50" />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/" className="mt-12 block text-center p-4 rounded-sm bg-slate-100 text-slate-950 font-black uppercase text-xs hover:bg-white transition-all tracking-[0.2em]">
              返回解构中心
            </Link>
          </div>
        </div>

        {/* 右侧：职业路径图 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">职业路径映射 Matrix</div>
          {talent.roadmap.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-sm bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col md:flex-row md:items-center gap-6 relative"
            >
              <div className="w-12 h-12 rounded-sm bg-slate-800/50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                <Trophy size={20} />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                  {route.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  {route.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 group-hover:text-white transition-colors uppercase tracking-widest">
                查看详情 <ExternalLink size={12} />
              </div>
              
              <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-slate-800 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Route-{i + 1}
              </div>
            </motion.div>
          ))}

          {/* 开源/项目建议卡片 */}
          <div className="mt-8 p-10 rounded-sm bg-emerald-950/20 border border-emerald-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-6">推荐开源项目方向</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-lg font-black text-white uppercase tracking-tight">建立个人【生产】作品集</div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    不要在 GitHub 上堆砌练习代码。基于你的{talent.name}天赋，去解决一个具有行业通用价值的逻辑/效率/体验问题。
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <button className="px-6 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                    探索开源机会 <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
