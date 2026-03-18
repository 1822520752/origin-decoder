"use client";

import { motion } from "framer-motion";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  ReferenceLine, 
  ResponsiveContainer,
  Label
} from "recharts";

interface TalentMapProps {
  ei: number; // -4 to 4 (Energy Flow)
  lf: number; // -4 to 4 (Attention Core)
}

export default function TalentMap({ ei, lf }: TalentMapProps) {
  // X: LF (Feeling vs Logic), Y: EI (Iteration vs Creation)
  // 为了匹配 UI，我们将 lf 映射到 X，ei 映射到 Y
  const data = [{ x: lf, y: ei }];

  return (
    <div className="w-full h-[400px] md:h-[500px] relative bg-slate-900/20 border border-slate-800 rounded-sm overflow-hidden">
      {/* 网格背景 */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        >
          {/* X 轴：关注内核 (Feeling vs Logic) */}
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[-5, 5]} 
            hide 
          />
          {/* Y 轴：能量流向 (Iteration vs Creation) */}
          <YAxis 
            type="number" 
            dataKey="y" 
            domain={[-5, 5]} 
            hide 
          />
          <ZAxis type="number" range={[100]} />

          {/* 坐标轴线 - 工业蓝图色 */}
          <ReferenceLine x={0} stroke="#334155" strokeWidth={1} strokeDasharray="3 3" />
          <ReferenceLine y={0} stroke="#334155" strokeWidth={1} strokeDasharray="3 3" />

          {/* 散点 */}
          <Scatter 
            name="Talent" 
            data={data} 
            fill="#3b82f6" 
            shape={(props: any) => {
              const { cx, cy } = props;
              return (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  {/* 核心点 */}
                  <circle cx={cx} cy={cy} r={6} fill="#3b82f6" className="shadow-[0_0_20px_#3b82f6]" />
                  {/* 扫描环 */}
                  <circle cx={cx} cy={cy} r={12} fill="none" stroke="#3b82f6" strokeWidth={1} className="animate-ping opacity-50" />
                  {/* 十字准星 */}
                  <line x1={cx-15} y1={cy} x2={cx+15} y2={cy} stroke="#3b82f6" strokeWidth={0.5} />
                  <line x1={cx} y1={cy-15} x2={cx} y2={cy+15} stroke="#3b82f6" strokeWidth={0.5} />
                </motion.g>
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* 象限文字标注 - 修正位置 */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2 p-8 font-mono text-[10px] md:text-xs tracking-widest">
        {/* Top Left: Feeling + Creation = Visionary */}
        <div className="flex items-start justify-start">
          <span className="text-pink-500/60 border-l border-t border-pink-500/30 pl-2 pt-1">Visionary (F+C)</span>
        </div>
        {/* Top Right: Logic + Creation = Architect */}
        <div className="flex items-start justify-end">
          <span className="text-blue-500/60 border-r border-t border-blue-500/30 pr-2 pt-1">Architect (L+C)</span>
        </div>
        {/* Bottom Left: Feeling + Iteration = Connector */}
        <div className="flex items-end justify-start">
          <span className="text-emerald-500/60 border-l border-b border-emerald-500/30 pl-2 pb-1">Connector (F+I)</span>
        </div>
        {/* Bottom Right: Logic + Iteration = Optimizer */}
        <div className="flex items-end justify-end">
          <span className="text-purple-500/60 border-r border-b border-purple-500/30 pr-2 pb-1">Optimizer (L+I)</span>
        </div>
      </div>

      {/* 坐标轴标签 */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Creation (开创)</div>
      <div className="absolute left-1/2 bottom-4 -translate-x-1/2 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Iteration (迭代)</div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Logic (逻辑)</div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Feeling (感受)</div>
    </div>
  );
}

