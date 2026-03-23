"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLevelUp } from '@/components/LevelUpProvider';
import { User, Mail, Phone, Calendar, Award, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  level: number;
  title: string;
  exp: number;
  streak: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { triggerLevelUp } = useLevelUp();
  const [stats, setStats] = useState<Stats>({ level: 1, title: '', exp: 0, streak: 0 });

  useEffect(() => {
    if (status === 'authenticated') {
      // Simulate level up check - in real app, use API flag or localStorage
      const shouldTriggerLevelUp = localStorage.getItem('justLeveledUp');
      if (shouldTriggerLevelUp === 'true') {
        triggerLevelUp(stats.level + 1, stats.title || `Level ${stats.level + 1} Master`);
        localStorage.removeItem('justLeveledUp');
      }
      
      // Fetch real stats
      fetch('/api/user/stats')
        .then(res => res.json())
        .then(data => setStats({
          level: data.level || 1,
          title: data.title || 'Zen Seeker',
          exp: data.exp || 0,
          streak: data.streak || 0
        }));
    }
  }, [status, triggerLevelUp]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Loading profile...</div>;
  }
  if (!session) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-theme-primary rounded-3xl flex items-center justify-center text-3xl font-black">
            {session.user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-4xl font-black">{session.user?.name || 'User'}</h1>
            <p className="text-slate-400">{session.user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50" 
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">Level {stats.level}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black text-theme-primary">{stats.title}</p>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-theme-primary to-purple-500 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats.exp % 1000) / 10)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-sm text-slate-400">{stats.exp % 1000}/1000 EXP</p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50" 
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Zap className="w-7 h-7 text-emerald-400" />
              Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Streak</div>
              <div className="font-bold text-emerald-400">{stats.streak} hari</div>
              <div>EXP Total</div>
              <div className="font-bold">{stats.exp}</div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-slate-800/30 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/30 text-center"
          whileHover={{ scale: 1.01 }}
        >
          <Shield className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h3 className="text-2xl font-bold mb-2">Achievement System Active</h3>
          <p className="text-slate-400 mb-6">Level up notifications will appear here automatically!</p>
          <button 
            className="bg-theme-primary hover:bg-theme-primary px-8 py-3 rounded-2xl font-bold text-white transition-all"
            onClick={() => {
              localStorage.setItem('justLeveledUp', 'true');
              window.location.reload();
            }}
          >
            Test Level Up
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
