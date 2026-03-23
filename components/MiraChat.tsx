"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "mira" | "user";
  text: string;
}

const MIRA_RESPONSES = [
  "Hei, aku Mira 🌙 Aku di sini untukmu. Ceritakan apa yang sedang kamu rasakan?",
  "Aku mendengarmu. Itu memang berat. Boleh aku tahu lebih banyak?",
  "Terima kasih sudah mau berbagi. Coba tarik napas dalam dulu ya... Kamu sudah kuat sampai sejauh ini 💜",
  "Aku paham itu tidak mudah. Ingat, perasaanmu valid dan kamu tidak sendirian.",
  "Mau coba teknik pernapasan singkat bersamaku? Itu bisa bantu menenangkan pikiran.",
  "Kalau kamu merasa overwhelmed, itu sinyal tubuhmu butuh istirahat. Tidak apa-apa untuk berhenti sejenak.",
];

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: "mira",
  text: "Hei! Aku Mira, sahabat digitalmu 🌙 Ada yang ingin kamu ceritakan hari ini?",
};

export default function MiraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/mira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      
      const data = await res.json();
      setIsTyping(false);
      
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "mira", text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "mira", text: data.error || "Maaf, Mira sedang sibuk. Coba lagi nanti ya 💙" },
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "mira", text: "Terjadi kesalahan koneksi. Coba lagi nanti 💙" },
      ]);
    }
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-theme-primary to-violet-600 shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center border border-theme-primary/30"
        aria-label="Buka Chat Mira"
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X size={22} className="text-white" /> : <BrainCircuit size={22} className="text-white" />}
        </motion.div>
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full border-2 border-theme-primary/40 animate-ping opacity-60" />
      </motion.button>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-8 z-50 w-[340px] h-[480px] bg-[#0a0a12]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-theme-primary to-violet-600 flex items-center justify-center shadow-lg shadow-theme-primary/30">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-white">Mira AI</p>
                <p className="text-[9px] text-theme-primary font-bold uppercase tracking-widest">● Online</p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "bg-theme-primary text-white rounded-tr-sm"
                        : "bg-white/5 border border-white/8 text-slate-200 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* TYPING INDICATOR */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-theme-primary block"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="px-4 py-3 border-t border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ceritakan perasaanmu..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-theme-primary/50 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-theme-primary hover:bg-theme-primary disabled:opacity-30 flex items-center justify-center transition-all active:scale-95"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
