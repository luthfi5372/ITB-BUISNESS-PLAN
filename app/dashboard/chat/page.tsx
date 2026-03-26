"use client";

import { useChat } from '@ai-sdk/react';
import { BrainCircuit, Send, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error("ERROR DARI AI:", err);
    }
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Otomatis scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 lg:p-6">
      {/* Header Chat */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex items-center gap-4 shrink-0 backdrop-blur-md">
        <div className="w-12 h-12 bg-theme-primary/20 rounded-xl flex items-center justify-center relative">
          <BrainCircuit size={24} className="text-theme-primary" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050508] animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-black italic uppercase tracking-tighter text-white">Mira AI</h1>
          <p className="text-xs text-emerald-400 font-medium">Online &bull; Siap mendengarkanmu</p>
        </div>
      </div>

      {/* Area Balon Chat */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-white/[0.02] border border-white/5 rounded-3xl mb-4 scrollbar-none">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <BrainCircuit size={48} className="mb-4 text-theme-primary animate-pulse" />
            <p className="text-sm font-bold text-white">Halo! Aku Mira. 👋</p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">Ceritakan apa saja yang sedang kamu rasakan hari ini. Aku di sini untuk mendengarkan tanpa menghakimi.</p>
          </div>
        )}

        {messages.map((m: any) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-indigo-500' : 'bg-theme-primary'}`}>
              {m.role === 'user' ? <User size={16} className="text-white" /> : <BrainCircuit size={16} className="text-white" />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-50 text-right' : 'bg-white/5 border border-white/10 text-slate-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {/* Indikator Mira Sedang Mengetik */}
        {isLoading && (
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-theme-primary flex items-center justify-center shrink-0">
              <BrainCircuit size={16} className="text-white" />
            </div>
            <div className="flex gap-1 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- RADAR ERROR --- */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-3 rounded-2xl mb-4 text-xs font-bold text-center shrink-0">
          🚨 Oops, koneksi ke Mira terputus: {error.message}
        </div>
      )}

      {/* Form Ketik Pesan */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          console.log("🚨 TOMBOL DITEKAN! Pesan:", input);
          handleSubmit(e);
        }} 
        className="relative shrink-0"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ketik curhatanmu di sini..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-theme-primary/50 focus:ring-1 focus:ring-theme-primary/50 transition-all disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={!(input || '').trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-theme-primary text-white rounded-xl flex items-center justify-center hover:bg-theme-primary/80 transition-colors disabled:opacity-50 disabled:hover:bg-theme-primary"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
