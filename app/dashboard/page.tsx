"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smile, Meh, Frown, CheckCircle2, Circle, Activity, Moon,
  BookOpen, Flame, Calendar, MessageCircle, Trophy, ChevronRight,
  Stethoscope, BrainCircuit
} from "lucide-react";
import TutorialGame from "@/components/TutorialGame";

const moods = [
  { emoji: <Frown size={22} />, label: "Buruk", color: "text-rose-400", bg: "bg-rose-500/20", value: 1 },
  { emoji: <Meh size={22} />, label: "Biasa", color: "text-amber-400", bg: "bg-amber-500/20", value: 2 },
  { emoji: <Smile size={22} />, label: "Baik", color: "text-emerald-400", bg: "bg-emerald-500/20", value: 3 },
];

const quests = [
  { title: "Jurnal Harian", desc: "Tulis 1 hal yang kamu syukuri hari ini", xp: 50, done: false, icon: <BookOpen size={16} /> },
  { title: "Napas Dalam 5 Menit", desc: "Latihan pernapasan mindful", xp: 30, done: false, icon: <Activity size={16} /> },
  { title: "Sesi Mira AI", desc: "Curhat ke Mira tentang harimu", xp: 80, done: false, icon: <MessageCircle size={16} /> },
  { title: "Tidur Sebelum 23.00", desc: "Jaga ritme tidurmu", xp: 60, done: false, icon: <Moon size={16} /> },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [userData, setUserData] = useState({
    name: "Tamu",
    streak: 0,
    exp: 0,
    level: 1,
    title: "Newbie",
    points: 0,
  });

  const completedQuests = quests.filter(q => q.done).length;
  const totalXP = quests.filter(q => q.done).reduce((acc, q) => acc + q.xp, 0);

  useEffect(() => {
    // Cek status tutorial untuk UI
    const hasSeen = localStorage.getItem("hasSeenTutorial");
    if (!hasSeen) {
      setShowTutorial(true);
    }

    // Ambil data stats asli dari database bila login
    if (session?.user) {
       setUserData(prev => ({ ...prev, name: session.user?.name || "Player" }));
       fetch("/api/user/stats", { cache: "no-store" })
         .then(res => res.json())
         .then(data => {
            if (!data.error) {
              setUserData(prev => ({ 
                ...prev, 
                streak: data.streak, 
                exp: data.exp, 
                level: data.level, 
                title: data.title,
                points: data.points 
              }));
            }
         });
    }
  }, [session]);

  const dynamicStats = [
    { label: "Hari Berturut", value: userData.streak.toString(), unit: "hari 🔥", color: "from-amber-500 to-orange-500" },
    { label: "Total XP", value: userData.exp.toLocaleString("id-ID"), unit: "poin", color: "from-theme-primary to-violet-500" },
    { label: "Mindfulness", value: userData.points.toString(), unit: "poin", color: "from-emerald-500 to-teal-500" },
    { label: "Level Saat Ini", value: userData.level.toString(), unit: userData.title, color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      {showTutorial && <TutorialGame email={session?.user?.email || ""} onComplete={() => setShowTutorial(false)} />}

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Selamat Datang, {userData.name}! ☀️</h1>
        <p className="text-[10px] text-slate-500 font-medium mt-1">Level {userData.level} {userData.title}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 transition-all duration-300 cursor-default"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-300`} />
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-slate-400 transition-colors">{stat.label}</p>
            <p className="text-2xl font-black text-white group-hover:scale-105 origin-left transition-transform duration-300">{stat.value}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">{stat.unit}</p>
          </motion.div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mood Check-in */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-theme-primary mb-1">Daily Check-in</p>
          <h2 className="text-lg font-black italic uppercase tracking-tighter text-white mb-6">Mood Hari Ini?</h2>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {moods.map((mood) => (
              <button key={mood.value} onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                  selectedMood === mood.value ? `${mood.bg} border-white/20 scale-105` : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <span className={selectedMood === mood.value ? mood.color : "text-slate-500"}>{mood.emoji}</span>
                <span className="text-[9px] font-black uppercase text-slate-400">{mood.label}</span>
              </button>
            ))}
          </div>
          {selectedMood
            ? <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-3 bg-theme-primary hover:bg-theme-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">Simpan Mood +30 XP</motion.button>
            : <p className="text-center text-[10px] text-slate-600 italic">Pilih mood untuk mulai harimu</p>
          }

          <div className="mt-6 pt-5 border-t border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">7 Hari Terakhir</p>
            <div className="flex items-end gap-1.5 h-10">
              {[6, 4, 7, 5, 8, 6, 9].map((v, i) => (
                <div key={i} className="flex-1 bg-theme-primary/20 rounded-sm relative overflow-hidden h-full">
                  <div className="absolute bottom-0 left-0 right-0 bg-theme-primary/60 rounded-sm" style={{ height: `${(v / 10) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex mt-1">
              {["S","S","R","K","J","S","M"].map((d, i) => <span key={i} className="flex-1 text-center text-[8px] text-slate-700 font-bold">{d}</span>)}
            </div>
          </div>
        </motion.div>

        {/* Daily Quests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-1">Quest Harian</p>
              <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">{completedQuests}/{quests.length} Selesai</h2>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
              <Flame size={12} className="text-amber-400" />
              <span className="text-[10px] font-black text-amber-400">+{totalXP} XP</span>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-1">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(completedQuests / quests.length) * 100}%` }} transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            />
          </div>
          <p className="text-right text-[9px] text-slate-600 font-bold mb-5">{Math.round((completedQuests / quests.length) * 100)}% Selesai</p>

          <div className="space-y-3">
            {quests.map((quest, idx) => (
              <div key={idx} className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${quest.done ? "bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/10" : "bg-white/[0.02] border-white/5 hover:bg-white/10 hover:border-white/20"}`}>
                <div className={`${quest.done ? "text-emerald-400 shrink-0" : "text-slate-600 shrink-0 group-hover:text-amber-400"} transition-colors duration-300`}>
                  {quest.done ? <CheckCircle2 size={20} className="animate-[pulse_2s_ease-in-out_infinite]" /> : <Circle size={20} />}
                </div>
                <div className={`p-2 rounded-xl shrink-0 transition-colors duration-300 ${quest.done ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500 group-hover:bg-amber-500/10 group-hover:text-amber-400"}`}>{quest.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-black transition-colors duration-300 ${quest.done ? "line-through text-slate-500" : "text-white group-hover:text-theme-primary"}`}>{quest.title}</p>
                  <p className="text-[10px] text-slate-600 font-medium">{quest.desc}</p>
                </div>
                <div className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 transition-colors duration-300 ${quest.done ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500 group-hover:bg-amber-500/10 group-hover:text-amber-400"}`}>+{quest.xp} XP</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mira AI */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="group bg-gradient-to-br from-theme-primary/20 to-violet-600/10 border border-theme-primary/20 rounded-3xl p-6 relative overflow-hidden hover:border-theme-primary/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500"
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-theme-primary/10 rounded-full blur-2xl group-hover:bg-theme-primary/20 group-hover:scale-110 transition-all duration-700 animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-white">Mira AI</p>
                <p className="text-[9px] text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> Online</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium italic mb-5 leading-relaxed">&ldquo;Hai {userData.name}! Gimana harimu hari ini? 🌙&rdquo;</p>
            <Link href="/dashboard/chat" className="flex items-center justify-center gap-2 w-full py-3 bg-theme-primary hover:bg-theme-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <MessageCircle size={14} /> Mulai Chat
            </Link>
          </div>
        </motion.div>

        {/* Jadwal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-theme-primary">Jadwal Konseling</p>
            <Calendar size={16} className="text-slate-600" />
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-theme-primary/10 border border-theme-primary/20 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 bg-theme-primary/20 rounded-xl flex items-center justify-center"><Stethoscope size={14} className="text-theme-primary" /></div>
              <div><p className="text-sm font-black text-white">Dr. Sarah Wijaya</p><p className="text-[10px] text-theme-primary font-bold">Besok, 15.00 WIB</p></div>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center"><Stethoscope size={14} className="text-slate-600" /></div>
              <div><p className="text-sm font-black text-slate-400">Budi Santoso</p><p className="text-[10px] text-slate-600 font-bold">Jum&apos;at, 13.00 WIB</p></div>
            </div>
          </div>
          <Link href="/dashboard/konseling" className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5">
            Lihat Semua <ChevronRight size={14} />
          </Link>
        </motion.div>

        {/* Pencapaian */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-amber-400">Pencapaianmu</p>
            <Trophy size={16} className="text-amber-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[ 
              {e:"🔥",l:"7 Hari",ok: userData.streak >= 7},
              {e:"🛡️",l:"Guardian",ok: userData.level >= 5},
              {e:"⚔️",l:"Warrior",ok: userData.level >= 10},
              {e:"🌟",l:"30 Hari",ok: userData.streak >= 30},
              {e:"👑",l:"Master",ok: userData.level >= 25},
              {e:"🧘",l:"Zen",ok: userData.points >= 500} 
            ].map((b,i)=>(
              <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl border ${b.ok?"bg-amber-500/10 border-amber-500/20":"bg-white/[0.02] border-white/5 opacity-40"}`}>
                <span className="text-lg">{b.e}</span>
                <span className="text-[8px] font-black text-slate-500 uppercase">{b.l}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">Leaderboard Sekolah</p>
            {[
              {rank:1, name: userData.exp > 2650 ? userData.name : "Rizky A.", xp: Math.max(userData.exp, 2650).toLocaleString("id-ID"), me: userData.exp > 2650},
              {rank:2, name: userData.exp <= 2650 && userData.exp > 1000 ? userData.name : "Putri N.", xp: userData.exp <= 2650 && userData.exp > 1000 ? userData.exp.toLocaleString("id-ID") : "2.410", me: userData.exp <= 2650 && userData.exp > 1000},
              {rank:3, name: userData.exp <= 1000 ? userData.name : "Alex S.", xp: userData.exp <= 1000 ? userData.exp.toLocaleString("id-ID") : "1.890", me: userData.exp <= 1000}
            ].map(p=>(
              <div key={p.rank} className={`flex items-center gap-3 py-1.5 ${p.me?"text-theme-primary":"text-slate-500"}`}>
                <span className="text-[10px] font-black w-4">#{p.rank}</span>
                <span className="flex-1 text-[11px] font-black">{p.name}</span>
                <span className="text-[10px]">{p.xp} XP</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
