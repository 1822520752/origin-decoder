"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { questions } from "@/lib/questions";
import TestCard from "@/components/TestCard";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const { currentQuestionIndex, isFinished } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];

  // 如果已经完成且不是在结果页，跳转到结果页
  useEffect(() => {
    if (isFinished) {
      router.push("/result");
    }
  }, [isFinished, router]);

  if (isFinished) return null;

  return (
    <main className="min-h-screen flex items-center justify-center py-20 overflow-hidden relative">
      {/* 装饰背景 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <TestCard 
          key={currentQuestion.id} 
          question={currentQuestion} 
        />
      </AnimatePresence>

      {/* 底部理念文案 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 text-xs tracking-widest font-mono uppercase"
      >
        Origin Decipher Engine v1.0
      </motion.div>
    </main>
  );
}
