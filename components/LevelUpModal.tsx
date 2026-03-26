"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

interface LevelUpModalProps {
  show: boolean;
  level: number;
  title: string;
  onClose: () => void;
}

export default function LevelUpModal({ show, level, title, onClose }: LevelUpModalProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Kembang api lottie animation (Free link)
    fetch("https://lottie.host/9e564bd0-b3da-47e2-8921-2a1387e35b0d/H7u0nNf2hF.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gagal muat animasi", err));
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Confetti Animation Background */}
          {animationData && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-70">
              <Lottie animationData={animationData} loop={false} className="w-full h-full max-w-2xl" />
            </div>
          )}

          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] border border-theme-primary/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.3)] max-w-sm w-full text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-theme-primary/20 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite_1s]" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-theme-primary to-rose-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-6"
              >
                <Trophy size={48} className="text-white" />
              </motion.div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-rose-400 mb-2"
              >
                LEVEL UP!
              </motion.h2>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-300 font-medium mb-8"
              >
                Luar biasa! Kamu telah mencapai <br/>
                <span className="text-white font-black text-xl">Level {level} - {title}</span>
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-4 bg-theme-primary text-white font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
              >
                Lanjutkan Perjalanan
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
