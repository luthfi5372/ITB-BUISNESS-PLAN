"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOOD_DATA = [
  { score: 1, emoji: "😰", label: "Sangat Cemas", color: "from-blue-900 to-blue-700", glow: "rgba(37,99,235,0.6)", blob: "rgba(37,99,235,0.5)" },
  { score: 2, emoji: "😔", label: "Sedih", color: "from-blue-700 to-sky-600", glow: "rgba(14,165,233,0.5)", blob: "rgba(14,165,233,0.4)" },
  { score: 3, emoji: "😟", label: "Gelisah", color: "from-sky-600 to-cyan-500", glow: "rgba(6,182,212,0.5)", blob: "rgba(6,182,212,0.4)" },
  { score: 4, emoji: "😐", label: "Biasa Aja", color: "from-slate-600 to-slate-500", glow: "rgba(100,116,139,0.5)", blob: "rgba(100,116,139,0.4)" },
  { score: 5, emoji: "🙂", label: "Cukup Baik", color: "from-indigo-600 to-violet-500", glow: "rgba(99,102,241,0.5)", blob: "rgba(99,102,241,0.4)" },
  { score: 6, emoji: "😊", label: "Baik", color: "from-violet-600 to-purple-500", glow: "rgba(139,92,246,0.5)", blob: "rgba(139,92,246,0.4)" },
  { score: 7, emoji: "😄", label: "Senang", color: "from-purple-500 to-fuchsia-500", glow: "rgba(168,85,247,0.5)", blob: "rgba(168,85,247,0.4)" },
  { score: 8, emoji: "🤩", label: "Sangat Baik", color: "from-amber-500 to-orange-400", glow: "rgba(251,191,36,0.5)", blob: "rgba(251,191,36,0.4)" },
  { score: 9, emoji: "🔥", label: "Luar Biasa", color: "from-amber-400 to-yellow-300", glow: "rgba(252,211,77,0.6)", blob: "rgba(252,211,77,0.5)" },
  { score: 10, emoji: "✨", label: "PEAK MODE", color: "from-yellow-300 to-lime-400", glow: "rgba(163,230,53,0.6)", blob: "rgba(163,230,53,0.5)" },
];

const getMiraHint = (score: number) => {
  if (score <= 3) return "Deteksi cemas? 🫧 Coba latihan napas 5 menit bersamaku.";
  if (score <= 6) return "Kamu stabil hari ini 🌙 Pertahankan ritme istirahatsmu ya!";
  return "Energimu luar biasa! ✨ Manfaatkan untuk hal-hal yang bermakna.";
};

export default function MoodBlobTracker() {
  const [selected, setSelected] = useState(6);
  const mood = MOOD_DATA[selected - 1];

  return (
    <div className="relative">
      {/* BLOB BACKGROUND */}
      <motion.div
        key={selected}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "50% 50% 20% 80% / 25% 80% 20% 75%",
            "70% 30% 50% 50% / 60% 40% 60% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
          rotate: [0, 90, 180, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ background: mood.blob, boxShadow: `0 0 120px ${mood.glow}` }}
        className="absolute inset-0 w-full h-full blur-3xl opacity-30"
      />

      {/* GLASS CARD */}
      <div className="relative z-10 bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 backdrop-blur-3xl">
        {/* EMOJI + LABEL */}
        <div className="text-center mb-8">
          <motion.div
            key={`emoji-${selected}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-7xl mb-3"
          >
            {mood.emoji}
          </motion.div>
          <motion.p
            key={`label-${selected}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base font-black uppercase tracking-widest text-white"
          >
            {mood.label}
          </motion.p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Mood Score: {selected}/10
          </p>
        </div>

        {/* SLIDER */}
        <div className="mb-8">
          <input
            type="range"
            min={1}
            max={10}
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${mood.glow} ${(selected - 1) * 11.1}%, rgba(255,255,255,0.05) ${(selected - 1) * 11.1}%)`,
            }}
          />
          <div className="flex justify-between text-[9px] text-slate-700 font-black uppercase tracking-widest mt-2">
            <span>1</span><span>5</span><span>10</span>
          </div>
        </div>

        {/* MIRA SUGGESTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected <= 3 ? "cold" : selected <= 7 ? "neutral" : "warm"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/5 border border-white/8 rounded-2xl p-4"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1.5">
              ⚡ Mira AI Insight
            </p>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {getMiraHint(selected)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* QUICK EMOJI ROW */}
        <div className="flex justify-between mt-6">
          {MOOD_DATA.map((m) => (
            <button
              key={m.score}
              onClick={() => setSelected(m.score)}
              className={`text-lg transition-all duration-200 ${selected === m.score ? "scale-125" : "opacity-40 hover:opacity-70"}`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
