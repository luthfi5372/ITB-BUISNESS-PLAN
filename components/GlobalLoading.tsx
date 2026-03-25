"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Mengambil animasi cyber keren dari Lottie (Kamu bisa ganti link ini nanti dengan logomu sendiri)
    fetch("https://lottie.host/9e1a17fa-55ea-448c-9a4f-c020612ceec5/1X7w9u1l8m.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gagal memuat animasi", err));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050508]/80 backdrop-blur-md"
    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Efek Cahaya (Glow) di belakang animasi */}
        <div className="absolute inset-0 bg-indigo-500/30 blur-3xl rounded-full animate-pulse" />
        
        {animationData ? (
          <Lottie animationData={animationData} loop={true} className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
        ) : (
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin relative z-10" />
        )}
      </div>
      
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
      >
        Memproses Data...
      </motion.p>
    </motion.div>
  );
}
