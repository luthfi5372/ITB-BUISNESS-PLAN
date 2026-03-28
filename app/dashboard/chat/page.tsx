"use client";

import { useChat } from '@ai-sdk/react';
import { BrainCircuit, Send, User, Wind, ShieldAlert, Phone, X, Trophy, Flame, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import QuestDashboard from '@/components/QuestDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
  // --- AI SDK v6 MIRA LOGIC ---
  const { messages, sendMessage, status, setMessages } = useChat({
    // @ts-ignore
    api: '/api/chat',
    onError: (err) => {
      alert("🚨 Koneksi ke server terputus: " + err.message);
      console.error(err);
    }
  });

  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  // Load History on Mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/chat/history');
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          setSessionId(data.sessionId);
        }
      } catch (err) {
        console.error("MIRA_HISTORY_FETCH_ERROR:", err);
      } finally {
        setIsHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [setMessages]);

  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fitur Ekspansi: Panic & Breathing & Quests
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [showQuestModal, setShowQuestModal] = useState(false); // Modal version for BP
  const [userStats, setUserStats] = useState<{ level: number, xp: number, title: string } | null>(null);
  const [breathingStep, setBreathingStep] = useState<"Tarik" | "Tahan" | "Hembus">("Tarik");

  // --- STATE DETEKSI MISI LOKAL ---
  const [questGrateful, setQuestGrateful] = useState(false);
  const [notifMisi, setNotifMisi] = useState("");

  // Fetch User Stats (XP/Level) periodically or on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/quests');
        const data = await res.json();
        if (data.user) {
          setUserStats(data.user);
        }
      } catch (err) {
        console.error("MIRA_STATS_FETCH_ERROR:", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Logika 4-7-8 Breathing (Sederhana)
  useEffect(() => {
    if (!isBreathing) return;
    const sequence = [
      { step: "Tarik", duration: 4000 },
      { step: "Tahan", duration: 7000 },
      { step: "Hembus", duration: 8000 }
    ] as const;
    let current = 0;
    const runStep = () => {
      setBreathingStep(sequence[current].step);
      setTimeout(() => {
        current = (current + 1) % sequence.length;
        if (isBreathing) runStep();
      }, sequence[current].duration);
    };
    runStep();
  }, [isBreathing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 🕵️‍♂️ ALGORITMA PENDETEKSI MISI (Client-side trigger)
    const teks = input.toLowerCase();
    if (!questGrateful && (teks.includes("syukur") || teks.includes("terima kasih") || teks.includes("alhamdulillah") || teks.includes("senang"))) {
      setQuestGrateful(true); 
      // Update XP lokal untuk instant feedback
      setUserStats(prev => prev ? { ...prev, xp: prev.xp + 15 } : null);
      setNotifMisi("🌟 Misi Selesai: The Morning Grateful (+15 XP)!");
      setTimeout(() => setNotifMisi(""), 4000);
      
      // Kirim sinyal ke server untuk persistensi (opsional jika server sudah mendeteksi)
      fetch('/api/user/quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xpReward: 15 })
      });
    }

    sendMessage({ 
      text: input,
       // @ts-ignore
      body: { sessionId }
    });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const userLevel = userStats?.level || 1;
  const userXp = userStats?.xp || 0;
  const xpMaksimal = userLevel * 100;
  const persentaseXp = Math.min((userXp / xpMaksimal) * 100, 100);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 lg:p-6 transition-all duration-300 relative">
      
      {/* 🌟 NOTIFIKASI MISI SELESAI (Ultimate Edition Notification) */}
      <AnimatePresence>
        {notifMisi && (
          <motion.div 
            initial={{ y: -50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -50, opacity: 0, x: '-50%' }}
            className="fixed top-32 left-1/2 z-[100]"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(52,211,153,0.4)] border border-white/20 flex items-center gap-3 font-bold whitespace-nowrap">
              <Star size={20} className="fill-white animate-pulse" />
              {notifMisi}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex items-center justify-between shrink-0 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-theme-primary/20 rounded-xl flex items-center justify-center relative ring-2 ring-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <BrainCircuit size={24} className="text-emerald-400" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111] animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
              Mira AI <Flame size={16} className="text-orange-500" />
            </h1>
            <p className="text-xs text-emerald-300/80 font-medium">Asisten Kesehatan Mental Aktif</p>
          </div>
        </div>

        {/* 🏆 WIDGET LEVEL & QUEST */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Level {userStats?.level || 1} • {userStats?.title || "Explorer"}</span>
            <div className="w-32 h-1.5 bg-black/40 rounded-full mt-1 overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-1000" 
                style={{ width: `${persentaseXp}%` }}
              />
            </div>
          </div>
          <button 
            onClick={() => setShowQuestModal(true)}
            className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition-all hover:scale-105 hover:rotate-3 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
            title="MindMate Adventure"
          >
            <Trophy size={20} />
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-1" />
          
          <button 
            onClick={() => setIsBreathing(true)}
            className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
            title="Latihan Pernapasan"
          >
            <Wind size={20} />
          </button>
          <button 
            onClick={() => setShowPanicModal(true)}
            className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-sm"
            title="Mode Darurat"
          >
            <ShieldAlert size={20} />
          </button>
        </div>
      </div>

      {/* 💬 AREA CHAT */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-white/[0.02] border border-white/5 rounded-3xl mb-4 shadow-inner scrollbar-none relative">
        {isHistoryLoading && (
          <div className="h-full flex items-center justify-center text-emerald-400 animate-pulse">
            <BrainCircuit size={32} />
          </div>
        )}

        {!isHistoryLoading && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-3">
            <BrainCircuit size={48} className="mb-2 text-theme-primary animate-pulse" />
            <p className="text-sm font-bold text-white">Halo! Aku Mira. 👋</p>
            <p className="text-xs text-slate-300 max-w-xs">Selesaikan misi harianmu dengan bercerita kepadaku untuk mendapatkan XP!</p>
          </div>
        )}

            {messages.map(m => (
              <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${m.role === 'user' ? 'bg-gradient-to-tr from-indigo-500 to-blue-500' : 'bg-theme-primary/80 border border-emerald-400/30'}`}>
                  {m.role === 'user' ? <User size={16} className="text-white" /> : <BrainCircuit size={16} className="text-white" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm transition-all duration-300 ${m.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-sm' : 'bg-white/10 backdrop-blur-md border border-white/20 text-emerald-50 rounded-tl-sm'}`}>
                  {"parts" in m ? (m as any).parts.map((p: any, i: number) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null)) : (m as any).content}
                </div>
              </div>
            ))}

        {isLoading && (
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-theme-primary/80 border border-emerald-400/30 shadow-lg">
              <BrainCircuit size={16} className="text-white" />
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1.5 rounded-tl-sm backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 🚀 FORM INPUT */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 shrink-0 relative">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ketik pesannya di sini..."
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-theme-primary/50 focus:ring-1 focus:ring-theme-primary/50 transition-all disabled:opacity-50 shadow-lg placeholder:text-slate-500"
        />
        <button 
          type="submit" 
          disabled={isLoading || !(input || '').trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-theme-primary text-white rounded-xl flex items-center justify-center hover:bg-theme-primary/80 transition-colors disabled:opacity-50 disabled:hover:bg-theme-primary ring-1 ring-emerald-400/30 shadow-md"
        >
          <Send size={18} />
        </button>
      </form>

      {/* 🎯 MODAL QUEST BOARD (MUNCUL SAAT TROPHY DIKLIK) */}
      <AnimatePresence>
        {showQuestModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a24] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setShowQuestModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>
              
              <div className="h-full overflow-y-auto scrollbar-none p-2">
                <QuestDashboard />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏥 MODAL PANIC & 🧘 MODAL BREATHING (Existing) */}
      {/* ... keeping the logic from previous implementations at bottom ... */}
      {showPanicModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPanicModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24} /></button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-2">
                <ShieldAlert size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Bantuan Darurat</h2>
              <p className="text-slate-300 text-sm">Hubungi layanan krisis jika Anda merasa dalam bahaya.</p>
              <div className="w-full space-y-3 pt-4">
                <a href="tel:119" className="flex items-center justify-between p-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600">
                  <span>Nasional</span> <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBreathing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0f0f1a]/90 backdrop-blur-xl animate-in fade-in">
           <div className="text-center space-y-12">
            <div className="relative flex items-center justify-center">
              <div className={`absolute w-64 h-64 rounded-full border-4 border-emerald-400/20 transition-all duration-[4000ms] ${breathingStep === 'Tarik' ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`} />
              <div className={`w-32 h-32 rounded-full bg-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.4)] flex items-center justify-center`}>
                <Wind size={32} className="text-[#0f0f1a]" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-white uppercase tracking-widest animate-pulse">{breathingStep}</h3>
            <button onClick={() => setIsBreathing(false)} className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full text-sm font-bold">Selesai</button>
          </div>
        </div>
      )}
    </div>
  );
}
