"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, BrainCircuit, Heart, Trophy, Play, ArrowRight, 
  Instagram, Linkedin, Mail, Zap, PhoneCall, Star, Calendar, 
  Lock, ShieldCheck, Users, TrendingDown, Building, 
  CheckCircle2, Smile, Activity, Stethoscope 
} from "lucide-react";

export default function MasterLandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050508]" />;

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* --- BACKGROUND BLOBS CYBER-ZEN --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[80px]" />
      </div>

      {/* =========================================
          1. NAVBAR & AUTENTIKASI (LOGIN/REGISTER)
          ========================================= */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#050508]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
              <BrainCircuit size={20} className="text-white" />
            </div>
            <span className="text-xl font-black italic uppercase tracking-tighter text-white">MindMate+</span>
          </Link>
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#fitur" className="hover:text-indigo-400 transition-colors">Fitur</a>
            <a href="#profesional" className="hover:text-indigo-400 transition-colors">Konseling</a>
            <a href="#komunitas" className="hover:text-indigo-400 transition-colors">Komunitas</a>
            <a href="#harga" className="hover:text-indigo-400 transition-colors">Harga</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================================
          2. HERO SECTION
          ========================================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-40 pb-24 grid lg:grid-cols-2 items-center gap-20">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-8">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Sahabat Mental &amp; Kesehatan</span>
          </div>
          <h1 className="text-7xl lg:text-[90px] font-black tracking-tighter leading-[0.85] mb-8">
            LEVEL UP <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-400">YOUR MIND.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md font-medium mb-12 leading-relaxed italic">
            &ldquo;Menghubungkan kamu dengan teknologi AI, komunitas, serta tenaga profesional kesehatan dalam satu ekosistem RPG.&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/register" className="group bg-indigo-600 px-10 py-5 rounded-2xl font-black text-xs shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all flex items-center gap-3">
              MULAI SEKARANG <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* RPG Preview Card */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative hidden lg:block">
          <div className="bg-white/[0.03] border border-white/10 p-12 rounded-[4rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <div className="bg-rose-500/20 p-5 rounded-[2rem] border border-rose-500/20"><Heart className="text-rose-500" size={32} /></div>
              <div className="bg-indigo-600 px-6 py-2.5 rounded-2xl text-[12px] font-black">+150 EXP</div>
            </div>
            <h4 className="text-2xl font-black mb-3 uppercase italic tracking-tighter">Self-Care Harian</h4>
            <p className="text-slate-500 text-xs font-bold mb-8 uppercase tracking-widest">Program: Mengelola Kecemasan</p>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5">
              <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 2, delay: 1 }} className="h-full bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-400" />
            </div>
            <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <span>Level 12 Warrior</span><span>65% Progress</span>
            </div>
          </div>
          <div className="absolute -top-10 -right-6 bg-amber-400 p-6 rounded-[2.5rem] text-black shadow-[0_20px_40px_rgba(251,191,36,0.3)] rotate-12"><Trophy size={36} /></div>
        </motion.div>
      </main>

      {/* =========================================
          3. MOOD TRACKER & MIRA AI (LIQUID ANIMATION)
          ========================================= */}
      <section id="fitur" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative flex justify-center items-center">
            {/* CSS-animated blob — lebih ringan dari Framer Motion */}
            <div
              style={{ animation: "blob 10s linear infinite" }}
              className="w-80 h-80 bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 blur-2xl opacity-30 absolute will-change-transform"
            />
            
            <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] text-center w-full max-w-sm shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8 block">Current Vibe</span>
              {/* Animasi Vektor Cincin Berputar & Ikon */}
              <div className="relative flex justify-center items-center mb-6 h-24">
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-24 h-24 text-emerald-500/40"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                </motion.svg>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"
                />
                <Smile size={48} className="text-emerald-400 relative z-10" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-black uppercase italic tracking-tighter text-white">Feeling Great</p>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none mb-6">
              Mood Tracker <br />
              <span className="text-slate-600 underline decoration-indigo-500 decoration-4 underline-offset-8">Otomatis.</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed italic">
              &ldquo;MindMate+ menganalisis pola tidur, aktivitas, dan interaksi untuk membangun gambaran emosional yang akurat tanpa membebani Anda.&rdquo;
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all">
                <Zap size={20} className="text-indigo-400 mb-4" />
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-500">Sleep Sync</h5>
                <p className="text-lg font-black italic">8.2 Hours</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:border-rose-500/30 transition-all">
                <Activity size={20} className="text-rose-400 mb-4" />
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-500">Activity</h5>
                <p className="text-lg font-black italic">Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. PROFESSIONAL BOOKING (SCROLL REVEAL & VECTOR ICONS)
          ========================================= */}
      <section id="profesional" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white">
              Konseling <br /> Tanpa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Stigma.</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm font-medium italic">
            Akses ke jaringan psikolog klinis berlisensi secara aman.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { name: "Dr. Sarah Wijaya", spec: "Kecemasan & Burnout", exp: "8 Thn", rating: "4.9", icon: <Stethoscope size={28} /> },
            { name: "Budi Santoso", spec: "Karir & Remaja", exp: "5 Thn", rating: "4.8", icon: <Activity size={28} /> },
            { name: "Nadia Larasati", spec: "Mental Pelajar", exp: "6 Thn", rating: "5.0", icon: <Smile size={28} /> },
          ].map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-indigo-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] -z-10 group-hover:bg-indigo-500/20 transition-colors" />
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-xl">
                  <div className="text-indigo-400 relative z-10 group-hover:scale-110 group-hover:text-white transition-all">
                    {doc.icon}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] font-black backdrop-blur-md border border-amber-500/20">
                  <Star size={12} fill="currentColor" /> {doc.rating}
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-1 tracking-tight">{doc.name}</h3>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">{doc.spec}</p>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-8">
                <Calendar size={14} /> Pengalaman {doc.exp}
              </div>
              <button className="w-full py-4 rounded-xl bg-white/5 text-white font-black text-[10px] uppercase hover:bg-indigo-600 transition-all border border-white/5 hover:border-transparent">
                Jadwalkan Sesi
              </button>
            </motion.div>
          ))}
        </div>

        {/* Secure Vault Banner */}
        <div className="bg-gradient-to-r from-[#0a0c14] to-[#121420] border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 blur-[50px] rounded-full" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 shadow-lg">
              <Lock size={24} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Riwayat Sesi Terenkripsi</h4>
              <p className="text-slate-400 text-xs font-medium">Data konsultasi Anda dikunci dengan end-to-end encryption. Hanya Anda dan Psikolog Anda yang memiliki akses.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 border border-white/10 shrink-0 relative z-10">
            Pelajari Privasi
          </button>
        </div>
      </section>

      {/* =========================================
          5. COMMUNITY & B2B (PULSE INDICATOR)
          ========================================= */}
      <section id="komunitas" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white mb-4">
            Tumbuh Bersama{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Komunitas.</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium italic">&ldquo;Ruang aman berbasis lokasi dan institusi untuk saling mendukung.&rdquo;</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { name: "SMA Darul Ulum 1 Hub", type: "School Community", members: "1.2K", online: 142, accent: "bg-indigo-500/20 text-indigo-400" },
            { name: "Jombang Zen Space", type: "City Hub", members: "850", online: 56, accent: "bg-amber-500/20 text-amber-400" },
            { name: "Pejuang Kampus", type: "Student Group", members: "3.4K", online: 430, accent: "bg-rose-500/20 text-rose-400" },
          ].map((com, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${com.accent}`}><Users size={20} /></div>
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse block" />
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{com.online} Online</span>
                </div>
              </div>
              <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">{com.name}</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">{com.type} &bull; {com.members} Members</p>
              <button className="w-full py-3 rounded-xl bg-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all border border-white/5">
                Gabung Ruang
              </button>
            </motion.div>
          ))}
        </div>

        {/* B2B Dashboard Block */}
        <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-b from-indigo-500/30 to-transparent">
          <div className="bg-[#0a0c14] border border-white/5 p-10 lg:p-16 rounded-[3rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
                  <Building size={14} className="text-amber-400" />
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">MindMate+ For Institutions</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-white leading-[0.9]">
                  Dashboard <br /> Pintar Untuk <br />
                  <span className="text-indigo-400">Guru BK &amp; HRD.</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Laporan agregat anonim untuk memantau kesejahteraan mental siswa atau karyawan secara real-time.
                </p>
                <ul className="space-y-3 pt-2">
                  {["Data anonim terenkripsi", "Notifikasi tren stres", "Akses eksklusif program sekolah"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                  Jadwalkan Demo B2B
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <span className="text-xs font-black uppercase text-white tracking-widest">School Analytics Overview</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md font-bold uppercase">Bulan Ini</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                      <span>Tingkat Partisipasi Self-Care</span><span className="text-emerald-400">85%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                      <span>Laporan Kecemasan Akademik</span><span className="text-rose-400">32%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "32%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-rose-400 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">Tren Stres Global</p>
                    <h4 className="text-2xl font-black text-white">-15%</h4>
                  </div>
                  <div className="bg-indigo-500 text-white p-2 rounded-lg"><TrendingDown size={20} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          6. PRICING SECTION
          ========================================= */}
      <section id="harga" className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5 text-center">
        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-white">Pilih Jalur Pertumbuhanmu</h2>
        <p className="text-slate-500 text-sm mb-20 font-medium italic">Mulai gratis, upgrade kapan saja.</p>

        <div className="grid md:grid-cols-3 gap-8 text-left items-start">
          {/* FREE */}
          <div className="p-10 rounded-[3.5rem] border border-white/10 bg-white/5 flex flex-col h-full">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Mulai Perjalananmu</p>
            <h3 className="text-2xl font-black italic uppercase text-white mb-2">FREE</h3>
            <p className="text-4xl font-black mb-2 italic text-white">Gratis</p>
            <p className="text-slate-600 text-[10px] font-bold uppercase mb-8">Selamanya</p>
            <ul className="space-y-3 mb-12 flex-1 text-xs text-slate-400">
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> Mood Tracker Harian</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> Jurnal Refleksi Dasar</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> 3 Sesi Mira AI / Bulan</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> Akses Komunitas Umum</li>
            </ul>
            <Link href="/register" className="w-full py-4 text-center rounded-2xl bg-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10 block">
              Mulai Gratis
            </Link>
          </div>

          {/* WARRIOR — Populer */}
          <div className="p-10 rounded-[3.5rem] border-2 border-indigo-500 bg-indigo-600/20 scale-105 shadow-[0_0_60px_rgba(99,102,241,0.2)] relative flex flex-col h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[9px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              Populer
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Untuk Jiwa Pemberani</p>
            <h3 className="text-2xl font-black italic uppercase text-white mb-2">WARRIOR</h3>
            <p className="text-4xl font-black mb-2 italic text-white">Rp 79.000</p>
            <p className="text-indigo-300 text-[10px] font-bold uppercase mb-8">Per Bulan</p>
            <ul className="space-y-3 mb-12 flex-1 text-xs text-slate-300">
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" /> Semua fitur Free</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" /> Mira AI Chat Unlimited</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" /> Booking Psikolog 2x/Bln</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" /> Mood Analytics Lanjutan</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" /> Komunitas Premium</li>
            </ul>
            <Link href="/register" className="w-full py-5 text-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all block">
              Mulai 7 Hari Gratis
            </Link>
          </div>

          {/* MASTER */}
          <div className="p-10 rounded-[3.5rem] border border-amber-500/30 bg-white/5 flex flex-col h-full">
            <div className="absolute -top-4 right-8 text-lg">👑</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Penguasaan Total</p>
            <h3 className="text-2xl font-black italic uppercase text-white mb-2">MASTER</h3>
            <p className="text-4xl font-black mb-2 italic text-white">Rp 149.000</p>
            <p className="text-slate-600 text-[10px] font-bold uppercase mb-8">Per Bulan</p>
            <ul className="space-y-3 mb-12 flex-1 text-xs text-slate-400">
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" /> Semua fitur Warrior</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" /> Booking Psikolog Unlimited</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" /> Dashboard B2B Institusi</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" /> Priority 24/7 Support</li>
              <li className="flex gap-3 items-center"><CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" /> Badge Master Eksklusif</li>
            </ul>
            <Link href="/register" className="w-full py-4 text-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all block">
              Bergabung Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          7. FOOTER COMPANY IDENTITY
          ========================================= */}
      <footer className="relative z-10 bg-black/60 border-t border-white/5 py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl">
                <BrainCircuit size={18} className="text-white" />
              </div>
              <span className="text-lg font-black italic uppercase tracking-tighter text-white">MindMate+</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
              PT MindMate Karya Nusantara <br />
              Jombang, Jawa Timur — Indonesia
            </p>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed italic">
              Platform kesehatan mental berbasis gamifikasi pertama di Indonesia. Membantu anak muda bertumbuh lebih tangguh setiap harinya.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Fitur</h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500">
              <a href="#fitur" className="hover:text-indigo-400 transition-colors">Mood Tracker</a>
              <a href="#fitur" className="hover:text-indigo-400 transition-colors">Mira AI Chat</a>
              <a href="#profesional" className="hover:text-indigo-400 transition-colors">Booking Psikolog</a>
              <a href="#komunitas" className="hover:text-indigo-400 transition-colors">Komunitas</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Legal &amp; Info</h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500">
              <a href="#" className="hover:text-indigo-400 transition-colors">Syarat &amp; Ketentuan</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">B2B Partnership</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Tentang Kami</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
            &copy; 2026 PT MindMate Karya Nusantara &middot; SMA Darul Ulum 1 Unggulan &middot; Jombang
          </p>
          <div className="flex items-center gap-6 text-slate-600">
            <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </footer>

      {/* =========================================
          8. FLOATING SOS BUTTON (PULSE ANIMATION)
          ========================================= */}
      <div className="fixed bottom-8 left-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 bg-rose-600/80 backdrop-blur-xl px-4 py-4 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.4)] border border-rose-400/30 overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-rose-400 rounded-full"
            />
            <PhoneCall size={20} className="text-white relative z-10" />
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-white font-black text-[10px] uppercase tracking-widest">
            Bantuan / Guru BK
          </span>
        </motion.button>
      </div>
    </div>
  );
}
