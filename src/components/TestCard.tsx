"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question, questions } from "@/lib/questions";
import { useQuizStore } from "@/store/useQuizStore";
import { ArrowLeft, ChevronRight, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestCard({ question }: { question: Question }) {
  const router = useRouter();
  const totalQuestions = questions.length;
  const { 
    currentQuestionIndex, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion, 
    finishQuiz,
    answers 
  } = useQuizStore();

  const handleAnswer = (option: any) => {
    answerQuestion(question.id, option.dimension, option.score);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      finishQuiz();
      router.push("/result");
    }
  };

  const isFirst = currentQuestionIndex === 0;
  const currentAnswer = answers[question.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu size={14} />
            </div>
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.2em] uppercase">
              Decipher Phase {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          {!isFirst && (
            <button
              onClick={prevQuestion}
              className="text-slate-600 hover:text-slate-400 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={12} /> Previous
            </button>
          )}
        </div>
        
        {/* 进度条 - 工业风格 */}
        <div className="h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          />
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-black mb-12 text-white leading-[1.1] uppercase tracking-tighter">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ x: 10, backgroundColor: "rgba(30, 41, 59, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className={`w-full p-8 text-left rounded-sm border transition-all flex items-center justify-between group relative overflow-hidden
              ${currentAnswer === option.score 
                ? "bg-blue-600/10 border-blue-600 text-blue-400" 
                : "bg-slate-900/20 border-slate-800 text-slate-300 hover:border-blue-500/50"
              }`}
          >
            <span className="text-lg font-bold leading-relaxed relative z-10">{option.text}</span>
            <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all text-blue-500 relative z-10" />
            
            {/* 装饰线 */}
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-900 flex justify-between items-center">
        <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">
          Energy Flow & Attention Core Analysis
        </div>
        <div className="text-[10px] font-mono text-slate-800 uppercase tracking-widest">
          Origin-Sys-01
        </div>
      </div>
    </motion.div>
  );
}

