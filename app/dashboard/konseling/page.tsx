"use client";

import { motion } from "framer-motion";
import { Star, Calendar, MessageCircle, ChevronRight, CheckCircle2 } from "lucide-react";

const doctors = [
  { name: "Dr. Sarah Wijaya, M.Psi", spec: "Anxietas & Stres", rating: 4.9, sessions: 127, next: "Besok, 15.00 WIB", available: true },
  { name: "Budi Santoso, S.Psi", spec: "Remaja & Akademik", rating: 4.7, sessions: 89, next: "Jum'at, 13.00 WIB", available: true },
  { name: "dr. Hana Kurnia, Sp.KJ", spec: "Depresi & Trauma", rating: 4.8, sessions: 203, next: "Pekan depan", available: false },
];

export default function KonselingPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Konsultasi Profesional</p>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Psikolog & Konselor</h2>
      </div>

      {/* Upcoming */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-3xl p-6"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">Sesi Berikutnya</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600/30 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-300">S</div>
          <div className="flex-1">
            <p className="text-base font-black text-white">Dr. Sarah Wijaya, M.Psi</p>
            <p className="text-[10px] text-slate-400 font-medium">Anxietas & Stres • Video Call</p>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-1">📅 Besok, 15.00 WIB</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all">
            Masuk
          </button>
        </div>
      </motion.div>

      {/* Select Doctor */}
      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Semua Konselor Tersedia</h3>
      <div className="space-y-4">
        {doctors.map((doc, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:bg-white/8 transition-all group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-rose-500/30 rounded-2xl flex items-center justify-center text-xl font-black text-white shrink-0">
              {doc.name.charAt(3)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white">{doc.name}</p>
              <p className="text-[10px] text-slate-500 font-medium mb-2">{doc.spec}</p>
              <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <span className="flex items-center gap-1 text-amber-400"><Star size={10} fill="currentColor" /> {doc.rating}</span>
                <span>{doc.sessions} sesi</span>
                <span className={doc.available ? "text-emerald-400" : "text-slate-600"}>{doc.next}</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all border border-indigo-500/20 shrink-0">
              <Calendar size={12} /> Booking
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
