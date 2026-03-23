"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TutorialGame({ email, onComplete }: { email: string, onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Selamat Datang di MindMate! 🚀",
      desc: "Hai Newbie! Perjalananmu menuju kesehatan mental yang lebih baik dimulai di sini. Saya Mira, AI asistenmu.",
    },
    {
      title: "Naikkan Levelmu! 📈",
      desc: "Setiap kali kamu mengisi jurnal mood atau ngobrol dengan saya, kamu akan dapat EXP. Kumpulkan EXP untuk naik level dan ubah gelarmu dari Newbie menjadi Legend!",
    },
    {
      title: "Siap Memulai? 🎮",
      desc: "Mari kita mulai petualangan ini. Jangan lupa cek fitur chat AI di menu samping ya!",
    }
  ];

  const handleNext = async () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      // Kirim data ke database bahwa tutorial selesai
      if (email) {
        await fetch("/api/tutorial", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });
      }
      localStorage.setItem("hasSeenTutorial", "true");
      onComplete(); // Tutup pop-up
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="bg-[#0a0a12]/95 backdrop-blur-3xl border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full text-center shadow-[0_0_50px_rgba(99,102,241,0.2)]"
        >
          <div className="text-5xl mb-6">✨</div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
            {tutorialSteps[step].title}
          </h2>
          <p className="text-sm font-medium text-slate-400 mb-8 leading-relaxed">
            {tutorialSteps[step].desc}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Langkah {step + 1} / {tutorialSteps.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
            >
              {step === tutorialSteps.length - 1 ? "Mulai Main!" : "Lanjut >"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
