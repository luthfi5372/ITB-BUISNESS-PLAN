"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Send, Zap } from "lucide-react";

const initialMessages = [
  { from: "mira", text: "Halo! Aku Mira, asisten AI kesehatan mentalmu 🌙 Gimana harimu hari ini? Cerita apa saja ke aku, aku siap dengerin." },
];

const quickReplies = ["Aku lagi stres 😔", "Aku mau cerita sesuatu", "Aku butuh tips tidur", "Aku merasa sendirian"];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: "mira",
        text: "Makasih udah mau cerita ke aku 💙 Aku dengar kamu. Mau lebih banyak cerita, atau kita coba latihan napas bareng dulu untuk tenangkan pikiran?"
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Mira Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-4 bg-[#050508]/50 backdrop-blur-xl">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          <BrainCircuit size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-white">Mira AI</p>
          <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" /> Online — Siap Mendengarkan
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
          <Zap size={12} className="text-indigo-400" />
          <span className="text-[9px] font-black text-indigo-400 uppercase">2/3 Sesi Gratis</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "mira" && (
                <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 shrink-0 mt-1">
                  <BrainCircuit size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-md px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed ${
                msg.from === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Replies */}
      <div className="px-6 pb-3 flex gap-2 flex-wrap">
        {quickReplies.map((qr) => (
          <button key={qr} onClick={() => send(qr)}
            className="px-3 py-2 bg-white/5 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-300 text-[10px] font-bold rounded-xl transition-all"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 pb-6">
        <div className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Tulis pesanmu di sini..."
            className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button onClick={() => send(input)}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
