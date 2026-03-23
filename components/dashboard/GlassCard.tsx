"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export function GlassCard({ className, children, containerClassName = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
viewport={{ once: true }}\n      className={cn(\n        "glass-dark rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-xl border border-white/10 \n        group-hover:border-mind-violet/30 group-hover:shadow-[0_35px_60px_-15px_rgba(139,92,246,0.3)] \n        group-hover:ring-4 group-hover:ring-mind-violet/20 ring-inset \n        transition-all duration-500 \n        before:absolute before:inset-0 before:rounded-[inherit] \n        before:bg-gradient-to-r before:from-mind-violet/20 via-mind-pink/20 to-mind-cyan/20 \n        before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:pointer-events-none",\n        containerClassName\n      )}
    >
<div className="absolute inset-0 bg-gradient-to-r from-mind-violet/5 via-mind-pink/5 to-mind-cyan/5 rounded-[inherit] blur opacity-40" />
<div className="absolute inset-0 noise opacity-10 pointer-events-none" />
      {children}
    </motion.div>
  );
}
