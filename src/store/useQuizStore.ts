import { create } from "zustand";
import { Dimension, questions } from "@/lib/questions";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuizState {
  currentQuestionIndex: number;
  scores: {
    EI: number;
    LF: number;
  };
  answers: Record<number, number>;
  isFinished: boolean;
  
  // Actions
  answerQuestion: (questionId: number, dimension: Dimension, score: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
  finishQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      scores: {
        EI: 0,
        LF: 0,
      },
      answers: {},
      isFinished: false,

      answerQuestion: (questionId, dimension, score) =>
        set((state) => {
          const prevScore = state.answers[questionId] || 0;
          return {
            scores: {
              ...state.scores,
              [dimension]: state.scores[dimension] - prevScore + score,
            },
            answers: {
              ...state.answers,
              [questionId]: score,
            },
          };
        }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            questions.length - 1
          ),
        })),

      prevQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),

      resetQuiz: () =>
        set({
          currentQuestionIndex: 0,
          scores: { EI: 0, LF: 0 },
          answers: {},
          isFinished: false,
        }),

      finishQuiz: () => set({ isFinished: true }),
    }),
    {
      name: "origin-talent-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

