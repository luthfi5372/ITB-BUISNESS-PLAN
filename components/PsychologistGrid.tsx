"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Clock, Calendar } from "lucide-react";

const PSIKOLOG = [
  {
    id: 1,
    name: "Dr. Anisa Putri, M.Psi",
    specialty: "Kecemasan & Depresi",
    rating: 4.9,
    reviews: 128,
    price: "Rp 150.000/sesi",
    available: true,
    avatar: "🧑‍⚕️",
    tags: ["CBT", "Mindfulness"],
    slots: ["09:00", "11:00", "14:00", "16:00"],
  },
  {
    id: 2,
    name: "Rizky Hakim, S.Psi",
    specialty: "Psikologi Remaja & Pelajar",
    rating: 4.8,
    reviews: 84,
    price: "Rp 100.000/sesi",
    available: true,
    avatar: "👨‍⚕️",
    tags: ["Remaja", "Akademik"],
    slots: ["10:00", "13:00", "15:00"],
  },
  {
    id: 3,
    name: "Siti Rahma, M.Psi",
    specialty: "Trauma & PTSD",
    rating: 5.0,
    reviews: 62,
    price: "Rp 175.000/sesi",
    available: false,
    avatar: "👩‍⚕️",
    tags: ["Trauma", "EMDR"],
    slots: [],
  },
];

export default function PsychologistGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!selectedSlot) return;
    setBooked(true);
    setTimeout(() => { setBooked(false); setSelected(null); setSelectedSlot(null); }, 3000);
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5" id="booking">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Tenaga Profesional Terverifikasi</span>
        </div>
        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">
          Bicara dengan<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
            Ahlinya.
          </span>
        </h2>
        <p className="text-slate-500 max-w-sm mx-auto font-medium text-sm">
          Psikolog bersertifikat, siap mendengar dan membantu tanpa penghakiman.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PSIKOLOG.map((p, i) => (
          <motion.div
            key={p.id}
            layoutId={`psy-${p.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white/[0.03] border rounded-[2.5rem] p-6 transition-all duration-300 cursor-pointer ${
              selected === p.id ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" : "border-white/5 hover:border-white/10"
            } ${!p.available && "opacity-50 pointer-events-none"}`}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="text-5xl">{p.avatar}</div>
              {p.available ? (
                <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse block" />
                  Tersedia
                </span>
              ) : (
                <span className="text-[8px] font-black uppercase tracking-wider bg-slate-500/20 text-slate-500 border border-slate-500/20 px-2.5 py-1 rounded-full">
                  Penuh
                </span>
              )}
            </div>

            {/* BADGE TERVERIFIKASI */}
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={12} className="text-indigo-400" />
              <span className="text-[8px] text-indigo-400 font-black uppercase tracking-widest">Terverifikasi</span>
            </div>

            <h3 className="text-base font-black text-white mb-0.5">{p.name}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">{p.specialty}</p>

            <div className="flex items-center gap-2 mb-4">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-black text-white">{p.rating}</span>
              <span className="text-[10px] text-slate-600">({p.reviews} ulasan)</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/8 px-2.5 py-1 rounded-full text-slate-400">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm font-black text-white">{p.price}</p>

            {/* SLOT PICKER */}
            <AnimatePresence>
              {selected === p.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 border-t border-white/5 pt-5 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={12} className="text-indigo-400" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Pilih Jadwal</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {p.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={(e) => { e.stopPropagation(); setSelectedSlot(slot); }}
                        className={`flex items-center gap-1.5 justify-center py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                          selectedSlot === slot
                            ? "bg-emerald-600 text-white border border-emerald-500"
                            : "bg-white/5 border border-white/8 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <Clock size={10} />
                        {slot}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {booked ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl"
                      >
                        <p className="text-[11px] font-black text-emerald-400">✅ Sesi Terjadwal!</p>
                      </motion.div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBook(); }}
                        disabled={!selectedSlot}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
                      >
                        Konfirmasi Booking
                      </button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
