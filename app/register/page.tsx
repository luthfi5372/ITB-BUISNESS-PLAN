"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BrainCircuit, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

      // Jika sukses daftar, langsung login otomatis
      const signInRes = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-rose-600/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
              <BrainCircuit size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black italic uppercase tracking-tighter text-white">MindMate+</span>
          </Link>
          <p className="mt-4 text-slate-400 text-sm font-medium italic">Mulai perjalanan mental health-mu hari ini ✨</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">Daftar Gratis</h1>
          <p className="text-slate-500 text-xs font-medium mb-8">Bergabung dengan 10.000+ pengguna yang lebih sehat</p>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-xs font-medium">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nama kamu"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="kamu@mindmate.id"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Buat Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Min. 6 karakter"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-11 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-indigo-400 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-3"
            >
              {loading ? "Mendaftarkan..." : (
                <>Buat Akun<ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-white/30 text-xs font-medium">Atau daftar instan dengan</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex justify-center items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => signIn("apple", { callbackUrl: "/dashboard" })} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex justify-center items-center">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.886 14.735c-1.127.062-2.316-.628-2.903-.628-.616 0-1.636.598-2.607.564-1.258-.024-2.423-.732-3.078-1.875-1.34-2.317-.34-5.748.966-7.63 1.026-1.48 2.651-2.043 3.52-2.074 1.257-.034 2.457.838 3.093.838.647 0 2.083-1.034 3.541-.88 1.503.048 2.87.618 3.633 1.868-3.033 1.767-2.529 6.208.5 7.37-1.115 1.848-1.528 2.39-2.665 2.447zm-1.624-8.895c-.886.994-2.593 1.677-3.486 1.516.27-1.604 1.018-3.235 2.05-4.223.864-.816 2.37-1.42 3.8-1.387-.144 1.628-.86 3.1-2.364 4.094z"/></svg>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex justify-center items-center">
              <svg className="w-6 h-6 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </motion.button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors">
                Masuk
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] text-slate-700 uppercase tracking-widest font-bold">
          &copy; 2026 PT MindMate Karya Nusantara
        </p>
      </motion.div>
    </div>
  );
}
