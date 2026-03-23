import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ExpParticleProps {
  id: number;
  exp: number;
  x: number;
  y: number;
  onComplete: (id: number) => void;
}

export default function ExpParticle({ id, exp, x, y, onComplete }: ExpParticleProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 1200);

    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <motion.div
      className="fixed z-[1000] pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0.5, opacity: 1 }}
      animate={{
        scale: [0.5, 1.5, 1],
        opacity: [1, 1, 0],
        x: [0, Math.random() * 100 - 50, Math.random() * 80 - 40],
        y: [0, -100, -80]
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut"
      }}
    >
      <div className="bg-gradient-to-r from-theme-primary to-purple-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg border border-white/20">
        +{exp} EXP
      </div>
    </motion.div>
  );
}