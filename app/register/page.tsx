"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrainCircuit, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-rose-600/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
              <BrainCircuit size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black italic uppercase tracking-tighter text-white">MindMate+</span>
          </Link>
          <p className="mt-4 text-slate-400 text-sm font-medium italic">Mulai perjalanan mental health-mu hari ini ✨</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">Daftar Gratis</h1>
          <p className="text-slate-500 text-xs font-medium mb-8">Bergabung dengan 10.000+ pengguna yang lebih sehat</p>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Nama kamu"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="kamu@mindmate.id"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Buat Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-11 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Perks */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 space-y-2">
              {["Akses Mood Tracker gratis selamanya", "3 sesi Mira AI per bulan", "Komunitas dukungan lokal"].map((perk, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                  <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> {perk}
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-3"
            >
              Buat Akun Gratis <ArrowRight size={16} />
            </motion.button>

            <p className="text-center text-[9px] text-slate-600 font-medium leading-relaxed">
              Dengan mendaftar, kamu menyetujui{" "}
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Syarat &amp; Ketentuan</a> dan{" "}
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Kebijakan Privasi</a>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors">
                Masuk
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] text-slate-700 uppercase tracking-widest font-bold">
          &copy; 2026 PT MindMate Karya Nusantara
        </p>
      </motion.div>
    </div>
  );
}
