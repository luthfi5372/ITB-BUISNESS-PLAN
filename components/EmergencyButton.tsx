"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, HeartPulse, Wind } from 'lucide-react';

const HOTLINES = [
  { name: 'Kemenkes Into The Light', number: '119 ext. 8', emoji: '📞' },
  { name: 'KPSI Hotline', number: '500-454', emoji: '💜' },
  { name: 'Into The Light Indonesia', number: '0811-3850-333', emoji: '🌟' },
  { name: 'Guru BK Sekolah', number: 'Hubungi via Sekolah', emoji: '🏫' },
];

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'breathe' | 'contacts'>('breathe');

  return (
    <>
      {/* FAB — Bottom Left, Ping Merah */}
      <motion.button
        onClick={() => { setIsOpen(true); setStep('breathe'); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-rose-700 shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center justify-center border border-rose-400/30"
        aria-label="SOS Darurat"
      >
        <Phone size={22} className="text-white" />
        {/* PING ANIMATION */}
        <span className="absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping" />
        <span className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping" style={{ animationDelay: '0.3s' }} />
        {/* SOS LABEL */}
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
          SOS
        </span>
      </motion.button>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0a0a12]/95 backdrop-blur-3xl border border-rose-500/20 rounded-[2.5rem] w-full max-w-md overflow-hidden"
            >
              {/* HEADER */}
              <div className="bg-gradient-to-r from-red-900/60 to-rose-900/40 border-b border-red-500/10 p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center">
                    <HeartPulse size={18} className="text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white">🚨 Darurat</h2>
                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">Kamu Tidak Sendirian</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <X size={16} className="text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {step === 'breathe' ? (
                  <>
                    <div className="text-center py-4">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-theme-primary/30 to-violet-500/30 border border-theme-primary/30 flex items-center justify-center mb-4"
                      >
                        <Wind size={32} className="text-theme-primary" />
                      </motion.div>
                      <h3 className="text-lg font-black italic tracking-tighter text-white mb-1">Tarik Napas Bersama</h3>
                      <p className="text-xs text-slate-400 mb-1">Ikuti ritme di atas. Tarik — Tahan — Hembuskan.</p>
                      <p className="text-[10px] text-slate-600">Teknik 4-7-8 untuk menenangkan sistem saraf</p>
                    </div>
                    <button
                      onClick={() => setStep('contacts')}
                      className="w-full py-4 bg-rose-600 hover:bg-rose-500 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
                    >
                      Hubungi Bantuan Segera
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                      <Phone size={14} className="text-rose-400" /> Kontak Darurat
                    </h3>
                    <div className="space-y-3">
                      {HOTLINES.map((h) => (
                        <button
                          key={h.name}
                          onClick={() => h.number !== 'Hubungi via Sekolah' && window.open(`tel:${h.number}`, '_blank')}
                          className="w-full flex items-center gap-4 bg-white/[0.03] hover:bg-white/5 border border-white/5 hover:border-rose-500/20 rounded-2xl p-4 text-left transition-all group"
                        >
                          <span className="text-2xl">{h.emoji}</span>
                          <div>
                            <p className="text-sm font-black text-white">{h.name}</p>
                            <p className="text-[10px] text-rose-400 font-bold">{h.number}</p>
                          </div>
                          <span className="ml-auto text-rose-500 group-hover:translate-x-1 transition-transform text-lg">→</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 transition-all mt-2"
                    >
                      Saya Sudah Lebih Baik ❤️
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
