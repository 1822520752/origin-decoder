"use client";

const STORAGE_KEY = "origin_talent_result";

export interface TestResult {
  scores: {
    EI: number;
    LF: number;
  };
  timestamp: number;
}

export const saveResult = (result: TestResult) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
};

export const loadResult = (): TestResult | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearResult = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
