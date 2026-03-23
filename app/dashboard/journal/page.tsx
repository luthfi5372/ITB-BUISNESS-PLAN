"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Smile, Meh, Frown, X } from "lucide-react";

const entries = [
  { date: "23 Mar 2026", title: "Hari yang melelahkan tapi berkesan", mood: "Baik", preview: "Hari ini aku belajar banyak hal baru..." },
  { date: "22 Mar 2026", title: "Mulai merasakan perubahan positif", mood: "Luar Biasa", preview: "Sudah 3 hari aku rutin meditasi pagi..." },
  { date: "21 Mar 2026", title: "Overthinking lagi 😔", mood: "Biasa", preview: "Entah kenapa malam ini aku susah tidur..." },
];

export default function JournalPage() {
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Catatan Pribadi</p>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Jurnal Harian</h2>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
        >
          <Plus size={16} /> Tulis Baru
        </button>
      </div>

      {/* New Entry Modal */}
      {showNew && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 relative"
        >
          <button onClick={() => setShowNew(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
            <X size={20} />
          </button>
          <h3 className="text-lg font-black italic uppercase tracking-tighter mb-6">Entri Baru</h3>
          <div className="space-y-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul jurnal hari ini..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="Ceritakan harimu... bagaimana perasaanmu? apa yang terjadi hari ini?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
            />
            <div className="flex gap-4">
              <button onClick={() => { setShowNew(false); setTitle(""); setContent(""); }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
              >
                Simpan +50 XP
              </button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
                Batal
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{entry.date}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                entry.mood === "Luar Biasa" ? "bg-emerald-500/10 text-emerald-400" :
                entry.mood === "Baik" ? "bg-indigo-500/10 text-indigo-400" :
                "bg-amber-500/10 text-amber-400"
              }`}>{entry.mood}</span>
            </div>
            <h3 className="text-base font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">{entry.title}</h3>
            <p className="text-sm text-slate-500 font-medium">{entry.preview}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
