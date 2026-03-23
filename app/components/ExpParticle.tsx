"use client";
import { motion } from "framer-motion";

interface ExpParticleProps {
  exp: number;
  x: number;
  y: number;
}

export default function ExpParticle({ exp, x, y }: ExpParticleProps) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.5, x: x, y: y }}
      animate={{
        // Animasi Meledak ke Atas (Trajectory)
        y: [y, y - 100, y - 80],
        x: [x, x + (Math.random() * 100 - 50), x],
        scale: [0.5, 1.5, 1],
        opacity: [1, 1, 0], // Menghilang di akhir
      }}
      transition={{
        duration: 1.2,
        times: [0, 0.2, 0.5, 1], // Timing tiap keyframe
        ease: "easeOut",
      }}
      className="fixed z-[1000] pointer-events-none" // Sangat penting agar melayang di atas segalanya
    >
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full shadow-2xl border-2 border-white">
        <span className="text-xs font-black text-white tracking-tighter shadow-sm">
          +{exp} EXP
        </span>
      </div>
    </motion.div>
  );
}