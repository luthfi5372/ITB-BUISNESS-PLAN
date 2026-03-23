"use client";

import { motion } from "framer-motion";
import { Users, Building2, TrendingDown, Shield, BarChart3, Lock } from "lucide-react";

const COMMUNITIES = [
  {
    id: "darul-ulum",
    name: "SMA Darul Ulum 1 Community",
    location: "Jombang, Jawa Timur",
    members: 342,
    online: 28,
    tag: "Sekolah",
    tagColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20",
    emoji: "🏫",
  },
  {
    id: "jombang-zen",
    name: "Jombang Zen Space",
    location: "Komunitas Lokal",
    members: 1204,
    online: 87,
    tag: "Komunitas",
    tagColor: "bg-rose-500/20 text-rose-400 border-rose-500/20",
    emoji: "🌿",
  },
  {
    id: "mindful-uni",
    name: "Mindful University Hub",
    location: "Universitas Darul Ulum",
    members: 567,
    online: 43,
    tag: "Kampus",
    tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/20",
    emoji: "🎓",
  },
];

const B2B_STATS = [
  { label: "Tingkat Stres Siswa Turun", value: "15%", icon: TrendingDown, color: "text-emerald-400" },
  { label: "Partisipasi Check-in Harian", value: "89%", icon: BarChart3, color: "text-indigo-400" },
  { label: "Kasus Terdeteksi Dini", value: "47", icon: Shield, color: "text-rose-400" },
];

const BADGES = [
  { name: "7 Days Journaling", emoji: "✍️", desc: "Tulis 7 hari berturut-turut", color: "from-violet-500 to-indigo-500" },
  { name: "Calm Voyager", emoji: "🌊", desc: "Selesaikan 10 sesi napas", color: "from-cyan-500 to-blue-500" },
  { name: "Mood Master", emoji: "🌟", desc: "Track mood 30 hari berturut", color: "from-amber-500 to-orange-500" },
  { name: "Social Spark", emoji: "🔥", desc: "Aktif di komunitas 7 hari", color: "from-rose-500 to-pink-500" },
];

export default function CommunitySection() {
  return (
    <>
      {/* LOCAL COMMUNITY HUB */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* LEFT: COMMUNITY HUB */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-full mb-6">
              <Users size={14} className="text-rose-400" />
              <span className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Komunitas Lokal</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-3">
              Temukan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">
                Komunitas Terdekatmu.
              </span>
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
              Bergabunglah dengan komunitas lokal yang berbagi pengalaman dan saling mendukung.
            </p>

            <div className="space-y-4">
              {COMMUNITIES.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-3xl p-5 flex items-center gap-5 cursor-pointer transition-all duration-300 hover:bg-white/5"
                >
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-black text-white">{c.name}</h4>
                      <span className={`text-[8px] font-black uppercase tracking-wider border px-2 py-0.5 rounded-full ${c.tagColor}`}>
                        {c.tag}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{c.location}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{c.members.toLocaleString()} anggota</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block" />
                      <span className="text-[10px] font-black text-emerald-400">{c.online} Online</span>
                    </div>
                    <button className="mt-2 text-[9px] font-black uppercase tracking-wider text-indigo-400 hover:text-white transition-colors">
                      Bergabung →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: GAMIFICATION BADGES */}
          <div className="w-full lg:w-80">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">⚡ Badge & EXP</span>
            </div>
            <h3 className="text-3xl font_black italic tracking-tighter uppercase mb-8 font-black">
              Kumpulkan<br />Pencapaian.
            </h3>
            <div className="space-y-4">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {badge.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{badge.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{badge.desc}</p>
                  </div>
                  <Lock size={14} className="text-slate-700 ml-auto group-hover:text-amber-400 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B2B DASHBOARD PREVIEW */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 border-t border-white/5">
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 rounded-[3rem] p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
                <Building2 size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">MindMate+ For Schools</span>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">
                Dashboard<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Guru BK Anonim.
                </span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-8 text-sm">
                Pantau kesehatan mental siswa secara agregat dan anonim. Deteksi dini tanpa melanggar privasi.
              </p>
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                Daftar Institusi Kami
              </button>
            </div>

            {/* MOCKUP STATS */}
            <div className="space-y-4">
              <div className="bg-white/3 border border-white/5 rounded-2xl p-4 mb-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Dashboard Anonim — Bulan Ini</p>
              </div>
              {B2B_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex items-center gap-5"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{stat.label}</p>
                    <p className={`text-2xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
