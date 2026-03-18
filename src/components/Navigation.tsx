"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Activity, FlaskConical, Map, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Origin" },
  { href: "/test", icon: Cpu, label: "Decipher" },
  { href: "/diagnostic", icon: Activity, label: "Fatigue" },
  { href: "/lab", icon: FlaskConical, label: "Lab" },
  { href: "/roadmap", icon: Map, label: "Roadmap" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 pt-6 pointer-events-none">
      <div className="max-w-fit mx-auto bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full p-1.5 flex items-center gap-1 pointer-events-auto shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon size={16} className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
