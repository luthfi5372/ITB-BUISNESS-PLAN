"use client";

import { useChat } from '@ai-sdk/react';
import { BrainCircuit, Send, User, Wind, ShieldAlert, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
  const { messages, sendMessage, status, setMessages } = useChat({
    // @ts-ignore
    api: '/api/chat',
    onError: (err) => {
      // "Radar Error" popup di localhost
      alert("🚨 Koneksi ke server terputus: " + err.message);
      console.error(err);
    }
  });

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

  // KITA BUAT VARIABLE isLoading SENDIRI DARI status
  const isLoading = status === 'streaming' || status === 'submitted';

  // KITA BUAT STATE KOTAK KETIK MANUAL SENDIRI
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fitur Ekspansi: Panic & Breathing
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingStep, setBreathingStep] = useState<"Tarik" | "Tahan" | "Hembus">("Tarik");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ 
      text: input,
      // @ts-ignore (Passing sessionId to server)
      sessionId 
    });
    setInput("");
  };

  // Efek Auto-Scroll ke bawah saat pesan baru masuk
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 lg:p-6 transition-all duration-300">
      
      {/* 🔮 HEADER: Premium Glassmorphism */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex items-center gap-4 shrink-0 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="w-12 h-12 bg-theme-primary/20 rounded-xl flex items-center justify-center relative ring-2 ring-emerald-400/20">
          <BrainCircuit size={24} className="text-theme-primary" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111] animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-black italic uppercase tracking-tighter text-white">Mira AI</h1>
          <p className="text-xs text-emerald-300/80 font-medium whitespace-nowrap overflow-hidden">Asisten Aktif • Siap Mendengarkan</p>
        </div>

        {/* Tombol Aksi Langsung (Ekspansi) */}
        <div className="flex items-center gap-2 ml-auto">
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
      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-white/[0.02] border border-white/5 rounded-3xl mb-4 shadow-inner scrollbar-none">
        {isHistoryLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isHistoryLoading && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-3">
            <BrainCircuit size={48} className="mb-2 text-theme-primary animate-pulse" />
            <p className="text-sm font-bold text-white">Halo! Aku Mira. 👋</p>
            <p className="text-xs text-slate-300 max-w-xs">Tuliskan apa yang kamu rasakan hari ini. Aku di sini untuk mendukungmu tanpa penghakiman.</p>
          </div>
        )}

        {/* --- DAFTAR PESAN --- */}
        {messages.map(m => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                m.role === 'user' 
                ? 'bg-gradient-to-tr from-indigo-500 to-blue-500' 
                : 'bg-theme-primary/80 border border-emerald-400/30'
              }`}>
              {m.role === 'user' ? <User size={16} className="text-white" /> : <BrainCircuit size={16} className="text-white" />}
            </div>
            
            {/* 🎨 Balon Chat Warni & Gaya Baru */}
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm transition-all duration-300 ${
                m.role === 'user' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-sm' 
                : 'bg-white/10 backdrop-blur-md border border-white/20 text-emerald-50 rounded-tl-sm'
              }`}>
              {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
            </div>
          </div>
        ))}

        {/* --- ⏳ ANIMASI MIRA SEDANG MENGETIK (LOADING) --- */}
        {isLoading && (
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-theme-primary/80 border border-emerald-400/30 shadow-lg">
              <BrainCircuit size={16} className="text-white" />
            </div>
            {/* Titik memantul emerald */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1.5 rounded-tl-sm backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 🚀 FORM INPUT (BYPASS AUTO) */}
      <form onSubmit={handleSubmit} className="flex gap-2 shrink-0 relative">
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

      {/* 🏥 MODAL PANIC (DARURAT) */}
      {showPanicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPanicModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24} /></button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-2">
                <ShieldAlert size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Bantuan Darurat</h2>
              <p className="text-slate-300 text-sm">Kamu tidak sendirian. Jika kamu merasa dalam bahaya atau butuh teman bicara saat ini juga, silakan hubungi layanan krisis berikut:</p>
              
              <div className="w-full space-y-3 pt-4">
                <a href="tel:119" className="flex items-center justify-between p-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all">
                  <span>Layanan Darurat Nasional</span>
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>119</span>
                  </div>
                </a>
                <a href="tel:021500454" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 text-white rounded-2xl font-medium hover:bg-white/10 transition-all">
                  <span>Halo Kemenkes</span>
                  <span>1500-567</span>
                </a>
              </div>
              <button onClick={() => setShowPanicModal(false)} className="text-slate-500 text-xs hover:underline pt-2">Kembali ke obrolan</button>
            </div>
          </div>
        </div>
      )}

      {/* 🧘 MODAL BREATHING (RELAKSASI) */}
      {isBreathing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f1a]/90 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="text-center space-y-12">
            <div className="relative flex items-center justify-center">
              {/* Outer Glow */}
              <div className={`absolute w-64 h-64 rounded-full border-4 border-emerald-400/20 transition-all duration-[4000ms] ease-in-out ${breathingStep === 'Tarik' ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`} />
              {/* Middle Circle */}
              <div className={`absolute w-48 h-48 rounded-full bg-emerald-400/10 border border-emerald-400/30 transition-all duration-[4000ms] ease-in-out ${breathingStep === 'Tarik' ? 'scale-110' : 'scale-90'}`} />
              {/* Core Circle */}
              <div className={`w-32 h-32 rounded-full bg-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.4)] flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${breathingStep === 'Tarik' ? 'scale-100' : 'scale-75'}`}>
                <Wind size={32} className="text-[#0f0f1a]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-white uppercase tracking-widest animate-pulse">{breathingStep}</h3>
              <p className="text-emerald-400/60 font-medium">Metode Pernapasan 4-7-8</p>
            </div>

            <button 
              onClick={() => setIsBreathing(false)} 
              className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full text-sm font-bold hover:bg-white/10 hover:border-emerald-400/30 transition-all"
            >
              Selesai & Tenang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
