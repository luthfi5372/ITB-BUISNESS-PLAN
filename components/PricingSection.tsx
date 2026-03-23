"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Star, Zap, Crown } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Mulai Perjalananmu",
    price: "Gratis",
    period: "",
    border: "border-white/10",
    glow: "",
    badge: null,
    icon: <Zap size={20} className="text-slate-400" />,
    gradient: "from-slate-800/40 to-slate-900/40",
    cta: "Mulai Gratis",
    ctaClass: "bg-white/5 hover:bg-white/10 border border-white/10 text-white",
    features: [
      "Mood Tracker Harian",
      "Jurnal Refleksi Dasar",
      "Akses Komunitas Umum",
      "3 Sesi Mira AI / Bulan",
      "Badge Starter Pack",
    ],
    disabled: ["Booking Psikolog", "Sesi Tak Terbatas", "Dashboard B2B", "Priority Support"],
  },
  {
    id: "warrior",
    name: "Warrior",
    tagline: "Untuk Jiwa Pemberani",
    price: "Rp 79.000",
    period: "/ bulan",
    border: "border-theme-primary/60",
    glow: "shadow-[0_0_40px_rgba(99,102,241,0.25)]",
    badge: "POPULER",
    badgeColor: "bg-theme-primary",
    icon: <Star size={20} className="text-theme-primary" />,
    gradient: "from-theme-primary/60 to-slate-900/60",
    cta: "Mulai 7 Hari Gratis",
    ctaClass: "bg-theme-primary hover:bg-theme-primary text-white shadow-lg shadow-theme-primary/30",
    features: [
      "Semua fitur Free",
      "Mira AI Chat Unlimited",
      "Mood Analytics Lanjutan",
      "Booking Psikolog (2x/bln)",
      "Komunitas Premium",
      "Laporan Kesehatan Mingguan",
      "Badge Eksklusif Warrior",
    ],
    disabled: ["Dashboard B2B Institusi", "Terapi Grup Premium"],
  },
  {
    id: "master",
    name: "Master",
    tagline: "Penguasaan Total",
    price: "Rp 149.000",
    period: "/ bulan",
    border: "border-amber-500/60",
    glow: "shadow-[0_0_50px_rgba(251,191,36,0.2)]",
    badge: "ULTIMATE",
    badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    icon: <Crown size={20} className="text-amber-400" />,
    gradient: "from-amber-950/30 to-slate-900/60",
    cta: "Bergabung Sekarang",
    ctaClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black shadow-lg shadow-amber-500/30",
    features: [
      "Semua fitur Warrior",
      "Booking Psikolog Unlimited",
      "Video Konsultasi Prioritas",
      "Dashboard B2B Institusi",
      "Terapi Grup Premium",
      "Laporan Psikologis Detail",
      "Priority 24/7 Support",
      "Badge Master Eksklusif + NFT",
    ],
    disabled: [],
  },
];

export default function PricingSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/5" id="pricing">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-6">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Paket Harga</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
          Pilih Level<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary via-rose-400 to-amber-400">
            Perjalananmu.
          </span>
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Dari langkah pertama hingga penguasaan penuh, ada paket yang tepat untuk setiap momen hidupmu.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            layoutId={`plan-${plan.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative bg-gradient-to-b ${plan.gradient} border ${plan.border} ${plan.glow} rounded-[2.5rem] p-8 flex flex-col hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* BADGE */}
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg`}>
                {plan.badge}
              </div>
            )}

            {/* HEADER */}
            <div className="mb-8">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4">
                {plan.icon}
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{plan.tagline}</p>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-slate-500 text-sm font-bold">{plan.period}</span>
              </div>
            </div>

            {/* FEATURES */}
            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check size={14} className="text-theme-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">{f}</span>
                </li>
              ))}
              {plan.disabled.map((f) => (
                <li key={f} className="flex items-start gap-2.5 opacity-30">
                  <span className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 rounded-full border border-slate-600 block" />
                  <span className="text-xs text-slate-500 font-medium line-through">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-200 active:scale-95 ${plan.ctaClass}`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
