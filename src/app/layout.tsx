import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ORIGIN DECODER - TALENT ALGORITHM ENGINE",
  description: "基于第一性原理，剥离消费幻觉，锁定你的生产天赋。从 0 到 1 解构你的能量流向与关注内核。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 min-h-screen selection:bg-blue-500/30`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
