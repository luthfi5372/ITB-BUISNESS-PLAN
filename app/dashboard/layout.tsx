"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BrainCircuit, Activity, BookOpen, Stethoscope,
  Users, Trophy, Settings, LogOut,
  LayoutDashboard, Menu, Bell, MessageCircle
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { href: "/dashboard/mood", label: "Mood Tracker", icon: <Activity size={16} /> },
  { href: "/dashboard/journal", label: "Jurnal", icon: <BookOpen size={16} /> },
  { href: "/dashboard/konseling", label: "Konseling", icon: <Stethoscope size={16} /> },
  { href: "/dashboard/komunitas", label: "Komunitas", icon: <Users size={16} /> },
  { href: "/dashboard/pencapaian", label: "Pencapaian", icon: <Trophy size={16} /> },
  { href: "/dashboard/chat", label: "Mira AI", icon: <MessageCircle size={16} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside className={`
        fixed lg:sticky top-0 h-screen w-64 bg-[#080810] border-r border-white/5 flex flex-col z-50
        transition-transform duration-300 ease-in-out shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <BrainCircuit size={18} className="text-white" />
            </div>
            <span className="text-base font-black italic uppercase tracking-tighter">MindMate+</span>
          </Link>
        </div>

        {/* User Card */}
        <div className="group p-4 m-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
              L
            </div>
            <div>
              <p className="text-sm font-black text-white group-hover:text-indigo-100 transition-colors">Luthfi</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest group-hover:text-indigo-300 transition-colors">Level 12 Warrior</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase mb-1">
              <span>XP Progress</span><span className="group-hover:text-slate-300 transition-colors">2840 / 3500</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out" style={{ width: "81%" }} />
              <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300
                  ${isActive
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    : "text-slate-500 hover:text-white hover:bg-white/5 hover:translate-x-1"}
                `}
              >
                <div className={`${isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-indigo-300"} transition-transform duration-300`}>
                  {item.icon}
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={16} /> Pengaturan
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/5 transition-all">
            <LogOut size={16} /> Keluar
          </Link>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-base font-black italic uppercase tracking-tighter text-white">
                {navLinks.find(l => l.href === pathname)?.label ?? "Dashboard"}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">MindMate+ &bull; Level 12 Warrior</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            {mounted && (
              <div className="flex items-center gap-1.5 mr-2 bg-white/5 p-1 rounded-full border border-white/10 shrink-0">
                <button onClick={() => setTheme('sage-green')} className={`w-3 h-3 rounded-full bg-[#10b981] transition-transform hover:scale-125 ${theme === 'sage-green' ? 'ring-1 ring-white ring-offset-1 ring-offset-[#050508]' : ''}`} title="Sage Green" />
                <button onClick={() => setTheme('blue-sky')} className={`w-3 h-3 rounded-full bg-[#3b82f6] transition-transform hover:scale-125 ${theme === 'blue-sky' ? 'ring-1 ring-white ring-offset-1 ring-offset-[#050508]' : ''}`} title="Blue Sky" />
                <button onClick={() => setTheme('lavender')} className={`w-3 h-3 rounded-full bg-[#a78bfa] transition-transform hover:scale-125 ${theme === 'lavender' ? 'ring-1 ring-white ring-offset-1 ring-offset-[#050508]' : ''}`} title="Lavender Dream" />
                <button onClick={() => setTheme('warm-peach')} className={`w-3 h-3 rounded-full bg-[#fb923c] transition-transform hover:scale-125 ${theme === 'warm-peach' ? 'ring-1 ring-white ring-offset-1 ring-offset-[#050508]' : ''}`} title="Warm Peach" />
              </div>
            )}
            
            <button className="relative p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center font-black text-xs">
              L
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* SOS Button */}
      <div className="fixed bottom-8 left-8 z-[100] group">
        <button className="relative flex items-center justify-center w-14 h-14 bg-rose-600 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(244,63,94,0.4)] border border-rose-400/30 hover:scale-110 hover:bg-rose-500 transition-all duration-300">
          <span className="text-white font-black text-sm tracking-widest relative z-10">SOS</span>
          <div className="absolute inset-0 rounded-full border border-rose-500/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </button>
      </div>
    </div>
  );
}
