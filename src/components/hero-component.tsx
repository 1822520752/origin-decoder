"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Target, Layers, Cpu, Activity, FlaskConical, Map } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 pb-32 px-4 overflow-hidden bg-slate-950 text-slate-200">
      {/* 装饰性背景 - 工业蓝图风格 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-[0.2em] mb-8"
        >
          <Cpu size={12} />
          <span>Talent Algorithm Engine v1.0</span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
          ORIGIN <br />
          <span className="text-blue-500">DECODER</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          剥离表层的职位标签与消费习惯，锁定你的 <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">【生产】</span> 天赋坐标。
          停止用短轴追逐长轴，回归高能态。
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-24">
          <Link
            href="/test"
            className="group relative px-10 py-5 bg-blue-600 text-white font-bold rounded-sm hover:bg-blue-500 transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-sm">立即开启解构</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button
            onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-transparent text-slate-300 font-bold rounded-sm border border-slate-800 hover:border-slate-600 hover:bg-slate-900/50 transition-all uppercase tracking-widest text-sm"
          >
            核心功能矩阵
          </button>
        </div>
      </motion.div>

      {/* 四大核心模块矩阵 */}
      <div id="modules" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full z-10">
        <ModuleCard 
          href="/test"
          icon={<Cpu className="text-blue-400" />}
          tag="Module 01"
          title="天赋解构引擎"
          subTitle="Decipher Engine"
          description="基于双轴定位模型，通过第一性原理剥离消费幻觉，锁定你的生产本能。"
        />
        <ModuleCard 
          href="/diagnostic"
          icon={<Activity className="text-pink-400" />}
          tag="Module 02"
          title="疲惫诊断仪"
          subTitle="Fatigue Diagnostic"
          description="审计日常任务的能量流向，定位天赋错位点，揭示职场疲惫的底层真相。"
        />
        <ModuleCard 
          href="/lab"
          icon={<FlaskConical className="text-purple-400" />}
          tag="Module 03"
          title="生产力实验室"
          subTitle="Productivity Lab"
          description="为架构师、优化师、梦想家、连接者量身打造的专属工具箱与效能策略。"
        />
        <ModuleCard 
          href="/roadmap"
          icon={<Map className="text-emerald-400" />}
          tag="Module 04"
          title="命运重塑路径"
          subTitle="Destiny Roadmap"
          description="建立天赋到高价值职业与开源项目的映射矩阵，规划你的降维打击路径。"
        />
      </div>
    </div>
  );
}

function ModuleCard({ 
  href, icon, tag, title, subTitle, description 
}: { 
  href: string, icon: React.ReactNode, tag: string, title: string, subTitle: string, description: string 
}) {
  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -5 }}
        className="h-full p-8 rounded-sm bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-900/60 transition-all relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-slate-700 group-hover:text-blue-500/50 transition-colors">
          {tag}
        </div>
        
        <div className="w-12 h-12 rounded-sm bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-700">
          {icon}
        </div>
        
        <h3 className="text-xl font-black mb-1 text-white uppercase tracking-tight">{title}</h3>
        <p className="text-[10px] font-mono text-blue-500/70 mb-4 uppercase tracking-[0.2em]">{subTitle}</p>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest">
          进入模块 <ArrowRight size={12} />
        </div>

        {/* 装饰线 */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent group-hover:via-blue-500/30 transition-all" />
      </motion.div>
    </Link>
  );
}

