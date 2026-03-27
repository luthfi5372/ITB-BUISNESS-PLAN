"use client";

import { useEffect, useState } from 'react';
import { Trophy, Star, Target, CheckCircle2, Circle, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  category: string;
}

interface UserStats {
  level: number;
  xp: number;
  title: string;
}

export default function QuestDashboard() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [user, setUser] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    try {
      const res = await fetch('/api/quests');
      const data = await res.json();
      setQuests(data.quests || []);
      setUser(data.user || null);
    } catch (err) {
      console.error("MIRA_QUEST_FETCH_ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
    // Poll for updates every 10s (untuk sinkronisasi dengan chat API)
    const interval = setInterval(fetchQuests, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="p-8 text-center animate-pulse">
      <Star size={32} className="mx-auto text-yellow-400 mb-4" />
      <p className="text-sm text-slate-400">Menghubungkan ke MindMate Adventure...</p>
    </div>
  );

  const currentLevelXp = (user?.level || 1) * 100;
  const progressPercent = Math.min(((user?.xp || 0) / currentLevelXp) * 100, 100);

  return (
    <div className="space-y-6">
      {/* 🏆 USER STATS HEADER */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy size={80} />
        </div>
        
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] ring-2 ring-white/20">
            <span className="text-xs font-black text-amber-900 uppercase">Level</span>
            <span className="text-3xl font-black text-white">{user?.level || 1}</span>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">{user?.title || "Mood Explorer"}</h2>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 px-1">
                <span>XP Progress</span>
                <span>{user?.xp || 0} / {currentLevelXp} XP</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-lavender to-mint shadow-[0_0_15px_rgba(110,231,183,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 DAILY QUESTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Target size={16} className="text-rose-400" />
            Misi Harian
          </h3>
          <span className="text-[10px] font-bold text-mint uppercase px-2 py-1 bg-mint/10 rounded-full border border-mint/20">Aktif</span>
        </div>

        <div className="grid gap-3">
          <AnimatePresence>
            {quests.map((q) => (
              <motion.div 
                key={q.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`group p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  q.isCompleted 
                  ? 'bg-emerald-500/10 border-emerald-500/30 opacity-80' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 cursor-default'
                }`}
              >
                {q.isCompleted && (
                  <div className="absolute top-0 right-0 p-2 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${q.isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {q.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${q.isCompleted ? 'text-emerald-100 line-through opacity-50' : 'text-white'}`}>
                      {q.title}
                    </h4>
                    <p className={`text-[11px] leading-tight ${q.isCompleted ? 'text-emerald-400/50' : 'text-slate-400'}`}>
                      {q.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        q.isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        +{q.xpReward} XP
                      </span>
                      {q.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <Sparkles size={10} /> Diselesaikan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 🎁 MILESTONES / BADGES PREVIEW */}
      <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lencana Saya</h3>
          <ChevronRight size={14} className="text-slate-500" />
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center grayscale opacity-30 border border-dashed border-white/20">
             <Trophy size={20} className="text-slate-400" />
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center grayscale opacity-30 border border-dashed border-white/20">
             <Star size={20} className="text-slate-400" />
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center grayscale opacity-30 border border-dashed border-white/20">
             <Sparkles size={20} className="text-slate-400" />
          </div>
          <p className="text-[10px] text-slate-500 flex items-center italic">Level 5 untuk membuka lencana pertama...</p>
        </div>
      </div>
    </div>
  );
}
