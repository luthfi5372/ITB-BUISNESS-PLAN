"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Meh, Frown, TrendingUp, Activity, Moon, Zap } from "lucide-react";

const weekData = [
  { day: "Sen", score: 6, label: "Baik" },
  { day: "Sel", score: 4, label: "Biasa" },
  { day: "Rab", score: 7, label: "Baik" },
  { day: "Kam", score: 5, label: "Biasa" },
  { day: "Jum", score: 8, label: "Sangat Baik" },
  { day: "Sab", score: 6, label: "Baik" },
  { day: "Min", score: 9, label: "Luar Biasa" },
];

const moods = [
  { emoji: <Frown size={24} />, label: "Buruk", color: "text-rose-400", bg: "bg-rose-500/20 border-rose-500/30", val: 1 },
  { emoji: <Meh size={24} />, label: "Biasa", color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/30", val: 2 },
  { emoji: <Smile size={24} />, label: "Baik", color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/30", val: 3 },
];

export default function MoodPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Check-in */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-theme-primary mb-2">Daily Check-in</p>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Gimana Perasaanmu Sekarang?</h2>
        <div className="grid grid-cols-3 gap-4 max-w-sm mb-6">
          {moods.map((m) => (
            <button key={m.val} onClick={() => { setSelected(m.val); setSaved(false); }}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all ${selected === m.val ? `${m.bg} scale-105` : "bg-white/5 border-white/5 hover:bg-white/10"}`}
            >
              <span className={selected === m.val ? m.color : "text-slate-500"}>{m.emoji}</span>
              <span className="text-[10px] font-black uppercase text-slate-400">{m.label}</span>
            </button>
          ))}
        </div>
        {selected && !saved && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setSaved(true)}
            className="px-8 py-3 bg-theme-primary hover:bg-theme-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
          >
            Simpan Mood Hari Ini +30 XP
          </motion.button>
        )}
        {saved && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-black text-sm">
            ✓ Mood tersimpan! +30 XP ditambahkan.
          </motion.p>
        )}
      </motion.div>

      {/* Weekly Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-theme-primary mb-2">Tren Minggu Ini</p>
        <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8">Riwayat Mood 7 Hari</h2>
        <div className="flex items-end gap-3 h-32 mb-3">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[9px] text-slate-600 font-bold">{d.score}</span>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(d.score / 10) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full bg-gradient-to-t from-theme-primary to-violet-500 rounded-t-lg min-h-[8px]" style={{ height: `${(d.score / 10) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 text-center text-[9px] text-slate-600 font-bold">{d.day}</div>
          ))}
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Rata-rata Minggu Ini", value: "6.4", icon: <TrendingUp size={16} />, color: "text-theme-primary" },
          { label: "Hari Terbaik", value: "9/10", icon: <Smile size={16} />, color: "text-emerald-400" },
          { label: "Streak Check-in", value: "12 Hari", icon: <Zap size={16} />, color: "text-amber-400" },
          { label: "Mood Terpopuler", value: "Baik 😊", icon: <Activity size={16} />, color: "text-rose-400" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className={`mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-lg font-black text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
