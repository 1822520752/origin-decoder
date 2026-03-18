"use client";

import Hero from "../components/hero-component";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* 底部装饰 */}
      <footer className="py-20 text-center text-slate-500 text-[10px] border-t border-slate-900 mt-20 uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} ORIGIN DECODER - TALENT ALGORITHM ENGINE</p>
        <p className="mt-2 text-slate-600 italic">"When you become yourself, you are the most powerful productivity."</p>
      </footer>
    </main>
  );
}
