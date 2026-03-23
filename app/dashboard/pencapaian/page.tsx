"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Lock, CheckCircle2, Zap } from "lucide-react";

const badges = [
  { emoji: "🔥", title: "7 Hari Berturut", desc: "Check-in 7 hari berturut-turut", earned: true, xp: 200 },
  { emoji: "🛡️", title: "Guardian", desc: "Selesaikan 10 jurnal", earned: true, xp: 150 },
  { emoji: "⚔️", title: "Warrior", desc: "Capai Level 10", earned: true, xp: 300 },
  { emoji: "🌟", title: "30 Hari", desc: "Streak 30 hari berturut", earned: false, xp: 500 },
  { emoji: "👑", title: "Master", desc: "Capai Level 20", earned: false, xp: 700 },
  { emoji: "🧘", title: "Zen Master", desc: "50 sesi meditasi", earned: false, xp: 600 },
  { emoji: "💬", title: "Pendengar Baik", desc: "Balas 20 post komunitas", earned: false, xp: 250 },
  { emoji: "🏆", title: "Juara 1", desc: "Peringkat 1 leaderboard sekolah", earned: false, xp: 1000 },
];

const leaderboard = [
  { rank: 1, name: "Kamu", xp: "2.840", isMe: true },
  { rank: 2, name: "Rizky Aditya", xp: "2.650" },
  { rank: 3, name: "Putri Nanda", xp: "2.410" },
  { rank: 4, name: "Fajar Putra", xp: "2.180" },
  { rank: 5, name: "Siti Aisyah", xp: "1.990" },
];

export default function PencapaianPage() {
  const earned = badges.filter(b => b.earned).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Penghargaan</p>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Pencapaianmu</h2>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Badge Diterima", value: `${earned}/${badges.length}`, icon: "🏅" },
          { label: "Total XP", value: "2.840", icon: "⚡" },
          { label: "Level Saat Ini", value: "12", icon: "🎯" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-xl font-black text-white">{s.value}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-5">Koleksi Badge</p>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${badge.earned ? "bg-amber-500/10 border-amber-500/20" : "bg-white/[0.02] border-white/5 opacity-50"}`}>
                <span className="text-2xl">{badge.emoji}</span>
                <div>
                  <p className={`text-[11px] font-black ${badge.earned ? "text-white" : "text-slate-500"}`}>{badge.title}</p>
                  <p className="text-[9px] text-slate-600 font-medium">{badge.xp} XP</p>
                </div>
                {!badge.earned && <Lock size={12} className="text-slate-700 ml-auto" />}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-theme-primary mb-5">Leaderboard Sekolah</p>
          <div className="space-y-3">
            {leaderboard.map((p) => (
              <div key={p.rank} className={`flex items-center gap-4 p-4 rounded-2xl border ${p.isMe ? "bg-theme-primary/10 border-theme-primary/20" : "bg-white/[0.02] border-white/5"}`}>
                <span className={`text-lg font-black w-6 text-center ${p.rank === 1 ? "text-amber-400" : p.rank === 2 ? "text-slate-400" : p.rank === 3 ? "text-amber-700" : "text-slate-600"}`}>
                  {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : `#${p.rank}`}
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-theme-primary/40 to-rose-500/40 rounded-lg flex items-center justify-center font-black text-xs text-white">
                  {p.name.charAt(0)}
                </div>
                <p className={`flex-1 text-sm font-black ${p.isMe ? "text-theme-primary" : "text-white"}`}>{p.name}</p>
                <p className="text-[10px] font-black text-slate-500">{p.xp} XP</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
