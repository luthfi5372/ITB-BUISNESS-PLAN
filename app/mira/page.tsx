"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ArrowLeft, Mic, BrainCircuit, Zap, Flame } from "lucide-react";
import Link from "next/link";

export default function MiraChatQuest() {
  const [messages, setMessages] = useState([
    { role: "mira", text: "Halo Luthfi! Mira di sini. Bagaimana energi mentalmu hari ini? (+20 EXP menunggu chat pertamamu)" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mood Sync Orb state
  const [moodColor, setMoodColor] = useState("indigo");

  // Combo Streak state
  const [lastMessageTime, setLastMessageTime] = useState<number | null>(null);
  const [comboStreak, setComboStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  // Auto-scroll ke bawah
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Mood detection function
  const detectMood = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("sedih") || lowerText.includes("cemas") || lowerText.includes("takut") || lowerText.includes("marah")) {
      return "blue";
    } else if (lowerText.includes("senang") || lowerText.includes("bahagia") || lowerText.includes("gembira") || lowerText.includes("terima kasih")) {
      return "yellow";
    } else {
      return "indigo";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const currentTime = Date.now();
    const timeDiff = lastMessageTime ? currentTime - lastMessageTime : null;

    // Check for combo streak
    if (timeDiff && timeDiff < 10000) { // 10 seconds
      setComboStreak(prev => prev + 1);
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 2000);
    } else {
      setComboStreak(0);
    }

    setLastMessageTime(currentTime);

    // Update mood color
    const newMood = detectMood(input);
    setMoodColor(newMood);

    const newMsgs = [...messages, { role: "user", text: input }];
    setMessages(newMsgs);
    setInput("");
    setIsTyping(true);

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Simulasi Mira Berpikir
    setTimeout(() => {
      setIsTyping(false);
      const miraResponse = { 
        role: "mira", 
        text: "Menarik sekali! Teruslah terbuka seperti ini. Quest Chat selesai! Kamu mendapatkan +20 EXP." 
      };
      setMessages([...newMsgs, miraResponse]);

      // Generate Insight Journaling at end of conversation (simplified)
      if (messages.length > 2) {
        setTimeout(() => {
          const powerQuote = "Kekuatanmu terletak pada keberanianmu untuk berbagi perasaan.";
          setMessages(prev => [...prev, { role: "mira", text: `Power Quote hari ini: "${powerQuote}" - Disimpan di Achievement kamu!` }]);
        }, 3000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 lg:p-8 flex flex-col font-sans overflow-hidden relative">
      
      {/* BACKGROUND ANIMASI: ORB CAHAYA with Mood Sync */}
      <motion.div 
        animate={{ backgroundColor: moodColor === "blue" ? "rgba(59, 130, 246, 0.1)" : moodColor === "yellow" ? "rgba(245, 158, 11, 0.1)" : "rgba(99, 102, 241, 0.1)" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
      />
      
      {/* HEADER: STATUS MIRA */}
      <header className="relative z-10 flex items-center justify-between mb-8 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-400">
            <ArrowLeft size={20} />
          </Link>
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-tr from-theme-primary to-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <BrainCircuit size={28} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-slate-950 rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-black tracking-tight text-lg italic">MIRA AI</h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-theme-primary uppercase tracking-widest">
              <Sparkles size={12} /> Syncing Intelligence
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-6 py-2 rounded-2xl border border-white/10 hidden md:block">
          <p className="text-[10px] font-black text-slate-500 uppercase mb-1 text-center">Chat Multiplier</p>
          <div className="flex items-center gap-2 text-yellow-400">
            <Zap size={14} fill="currentColor" /> <span className="font-black tracking-tighter text-sm">2.5x EXP</span>
          </div>
        </div>
      </header>

      {/* CHAT AREA: DENGAN ANIMASI BUBBLE */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 px-4 py-8 relative z-10 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={i} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] p-6 rounded-[2rem] shadow-xl ${
              msg.role === "user" 
              ? "bg-theme-primary text-white rounded-br-none" 
              : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-none backdrop-blur-sm"
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75" />
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150" />
            </div>
          </motion.div>
        )}
      </div>

      {/* COMBO STREAK ANIMATION */}
      <AnimatePresence>
        {showCombo && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black text-2xl animate-pulse">
              COMBO x{comboStreak + 1}!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INPUT AREA: "COMMAND CENTER" */}
      <footer className="relative z-10 mt-6 bg-white/5 p-4 rounded-[3rem] border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button className="p-5 text-slate-400 hover:text-white transition-colors">
            <Mic size={24} />
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ketikkan perasaanmu sekarang..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-slate-600"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="bg-theme-primary p-5 rounded-[2rem] text-white shadow-lg shadow-theme-primary/20 hover:bg-theme-primary transition-all"
          >
            <Send size={24} />
          </motion.button>
        </div>
      </footer>

      {/* FLOAT INDICATOR: XP GAIN */}
      <div className="absolute top-1/2 right-10 flex flex-col gap-4 opacity-20 pointer-events-none">
         <Flame size={80} className="text-orange-500 animate-pulse" />
         <div className="text-6xl font-black italic tracking-tighter text-white">RELIANCE</div>
      </div>

    </div>
  );
}
