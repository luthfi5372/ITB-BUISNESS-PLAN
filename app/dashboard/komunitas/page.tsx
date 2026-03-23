"use client";

import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, TrendingUp, Plus } from "lucide-react";

const posts = [
  { user: "Rizky A.", time: "2 jam lalu", content: "Hari ini aku berhasil nggak panic attack sama sekali! Terima kasih buat semua support di sini 💙", likes: 24, replies: 8, category: "Pencapaian" },
  { user: "Putri N.", time: "5 jam lalu", content: "Ada yang punya tips buat ngatasi overthinking sebelum tidur? Udah coba journaling tapi masih kepikiran terus...", likes: 11, replies: 15, category: "Tanya Jawab" },
  { user: "Anonim", time: "Kemarin", content: "Kadang aku merasa sendiri walaupun dikelilingi banyak orang. Kalian pernah ngerasain ini nggak?", likes: 47, replies: 23, category: "Curhat" },
];

const categories = ["Semua", "Curhat", "Tanya Jawab", "Pencapaian", "Tips"];

export default function KomunitasPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Komunitas Lokal</p>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Forum Kesehatan Mental</h2>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
          <Plus size={16} /> Posting
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white border border-white/5"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Anggota Aktif", value: "1.2k", icon: <Users size={16} className="text-indigo-400" /> },
          { label: "Post Minggu Ini", value: "87", icon: <MessageCircle size={16} className="text-emerald-400" /> },
          { label: "Likes Diberikan", value: "342", icon: <Heart size={16} className="text-rose-400" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="flex justify-center mb-2">{s.icon}</div>
            <p className="text-xl font-black text-white">{s.value}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500/40 to-rose-500/40 rounded-xl flex items-center justify-center font-black text-sm text-white">
                  {post.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{post.user}</p>
                  <p className="text-[9px] text-slate-600 font-medium">{post.time}</p>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400">{post.category}</span>
            </div>
            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-4">{post.content}</p>
            <div className="flex items-center gap-5 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"><Heart size={13} /> {post.likes}</button>
              <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"><MessageCircle size={13} /> {post.replies} Balasan</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
