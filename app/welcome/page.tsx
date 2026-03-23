"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Trophy, Star, ShieldCheck, Zap, Heart, MessageSquareText, Target, ArrowRight, CalendarCheck } from "lucide-react";

export default function WelcomeRPGScreens() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Timeline Animasi
    const timer1 = setTimeout(() => setStep(2), 2000); // Sinkronisasi -> Gelar
    const timer2 = setTimeout(() => setStep(3), 4000); // Gelar -> EXP
    const timer3 = setTimeout(() => setStep(4), 6500); // EXP -> RPG Summary (Statis)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden p-6 relative font-sans">
      <AnimatePresence mode="wait">

        {/* STEP 1: SINKRONISASI (Animasi) */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center z-10">
            <div className="w-24 h-24 bg-theme-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-theme-primary/20">
              <ShieldCheck size={48} className="text-white animate-pulse" />
            </div>
            <h2 className="text-white text-2xl font-black tracking-tight uppercase">Menghubungkan Pikiran...</h2>
            <p className="text-slate-500 mt-2 font-medium">Mira sedang menyiapkan ruang aman untukmu.</p>
          </motion.div>
        )}

        {/* STEP 2: PEMBERIAN GELAR (Animasi) */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center z-10">
            <div className="w-24 h-24 bg-yellow-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow-500/20">
              <Star size={48} className="text-black" />
            </div>
            <h2 className="text-white text-3xl font-black tracking-tight uppercase">Gelar Tersemat!</h2>
            <div className="mt-4 bg-white/10 px-6 py-2 rounded-full border border-white/20 inline-block">
              <span className="text-yellow-400 font-black text-sm uppercase tracking-widest animate-pulse">Zen Seeker</span>
            </div>
          </motion.div>
        )}

        {/* STEP 3: BONUS EXP (Animasi) */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32 bg-gradient-to-tr from-theme-primary to-purple-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(99,102,241,0.4)]">
              <Trophy size={64} className="text-white" />
            </motion.div>
            <h2 className="text-white text-5xl font-black tracking-tighter italic shadow-lg">BONUS +100 EXP!</h2>
            <p className="text-theme-primary mt-3 font-bold uppercase tracking-[0.3em] text-xs">Quest Pertama Dimulai</p>
          </motion.div>
        )}

        {/* STEP 4: RPG SUMMARY (STATIS & RAMAI) */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl bg-white/5 rounded-[3rem] p-12 border border-white/10 shadow-2xl z-10 backdrop-blur-sm"
          >
            {/* Header: Title & Level */}
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Player Status</p>
                <h1 className="text-4xl font-black text-white tracking-tight mt-1">Halo, Luthfi Aziz!</h1>
                <div className="mt-3 bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-xs inline-block uppercase tracking-widest">Zen Seeker</div>
              </div>
              <div className="text-center bg-theme-primary p-6 rounded-3xl shadow-xl shadow-theme-primary/10">
                <p className="text-[10px] font-black text-theme-primary uppercase tracking-widest">Current Level</p>
                <p className="text-5xl font-black text-white">02</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* STATS 1: EXP */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>EXP Progress</span><span>100 / 250</span></div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-theme-primary w-[40%] rounded-full shadow-lg shadow-theme-primary/50"></div></div>
                <p className="text-[10px] text-slate-500 font-medium">Selesaikan 1 chat lagi untuk LVL 3!</p>
              </div>
              {/* STATS 2: POINTS */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center"><Heart size={28} /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mindfulness Pts</p><p className="text-3xl font-black text-emerald-400">50</p></div>
              </div>
              {/* STATS 3: STREAK */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center"><Target size={28} /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Streak</p><p className="text-3xl font-black text-rose-400">1 Hari</p></div>
              </div>
            </div>

            {/* Hubungkan ke Fitur Utama (Biar Ramai) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-theme-primary/10 p-8 rounded-3xl border border-theme-primary/20 flex items-center gap-6">
                <MessageSquareText size={40} className="text-theme-primary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-lg">Mira Chatbot Aktif</h4>
                  <p className="text-sm text-theme-primary mt-1">Mira siap mendengarkan ceritamu 24/7. Mulai chat untuk +20 EXP.</p>
                </div>
              </div>
              <div className="bg-emerald-600/10 p-8 rounded-3xl border border-emerald-500/20 flex items-center gap-6">
                <CalendarCheck size={40} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-lg">Daily Challenge Tersedia</h4>
                  <p className="text-sm text-emerald-200 mt-1">"Tulis 1 hal yang kamu syukuri." Selesaikan untuk +50 EXP.</p>
                </div>
              </div>
            </div>

            {/* Tombol Masuk Utama */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-theme-primary text-white py-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-theme-primary transition-all shadow-xl shadow-theme-primary/20 active:scale-[0.98]"
            >
              MULAI PERJALANAN MENTALMU <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor (Blurry Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('/grid.svg')] opacity-[0.02]"></div>
      </div>
    </div>
  );
}