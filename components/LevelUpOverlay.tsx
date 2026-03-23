 "use client";
import { motion, AnimatePresence, useMotionValue, useAnimate, stagger } from 'framer-motion';
import { Crown, Star, Sparkles, X, Trophy, Zap, Shield } from 'lucide-react';
import dynamic from "next/dynamic";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
import { useEffect, useState } from 'react';

interface LevelUpOverlayProps {
  level: number;
  newTitle: string;
  onClose: () => void;
}

const levelBadges = {
  1: { icon: Shield, color: 'text-amber-600', name: 'Bronze' },
  2: { icon: Trophy, color: 'text-slate-400', name: 'Silver' },
  3: { icon: Crown, color: 'text-yellow-500', name: 'Gold' },
  4: { icon: Star, color: 'text-cyan-400', name: 'Diamond' },
};

const getBadge = (level: number) => {
  if (level >= 4) return levelBadges[4];
  if (level >= 3) return levelBadges[3];
  if (level >= 2) return levelBadges[2];
  return levelBadges[1];
};

export default function LevelUpOverlay({ level, newTitle, onClose }: LevelUpOverlayProps) {
  const [showRewards, setShowRewards] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [displayedLevel, setDisplayedLevel] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsReducedMotion(e.matches));
  }, []);

  useEffect(() => {
    if (!isReducedMotion) {
      setDisplayedLevel(0);
      const duration = 1500; // 1.5 seconds
      const steps = 60; // 60 fps
      const increment = level / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= level) {
          setDisplayedLevel(level);
          clearInterval(timer);
        } else {
          setDisplayedLevel(Math.round(current));
        }
      }, duration / steps);
      setTimeout(() => setShowRewards(true), 800);
    } else {
      setDisplayedLevel(level);
      setShowRewards(true);
    }
  }, [level, isReducedMotion]);

  const badge = getBadge(level);
  const BadgeIcon = badge.icon;

  const titleLetters = "LEVEL UP!".split('');

  const rewards = [
    { icon: Zap, text: '+100 XP', color: 'text-yellow-500' },
    { icon: BadgeIcon, text: `New ${badge.name} Badge`, color: badge.color },
    { icon: Sparkles, text: 'Unlock New Skin', color: 'text-purple-500' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-gradient-to-br from-indigo-950 via-slate-950 to-black backdrop-blur-xl overflow-hidden"
        style={{
          backgroundImage: isReducedMotion ? undefined : 'linear-gradient(45deg, #1e1b4b, #0f172a, #000000)',
          animation: isReducedMotion ? undefined : 'gradientShift 4s ease-in-out infinite',
        }}
      >
        {!isReducedMotion && (
          <Confetti
            numberOfPieces={80}
            recycle={false}
            colors={['#fbbf24', '#f59e0b', '#d97706', '#eab308']}
            gravity={0.3}
            tweenDuration={1500}
          />
        )}

        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            mass: 0.8,
            delay: 0.3,
          }}
          className={`text-center bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(250,204,21,0.25)] border-4 border-yellow-400 relative z-10 max-w-lg w-full ${isReducedMotion ? '' : 'glow-effect'}`}
          style={{ willChange: 'transform, box-shadow' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 hover:rotate-90"
          >
            <X size={20} />
          </button>

          <div className="flex justify-center gap-3 mb-6 text-yellow-500">
            <Star size={20} fill="currentColor" />
            <Crown size={40} fill="currentColor" className="animate-pulse" />
            <Star size={20} fill="currentColor" />
          </div>

          <motion.p
            animate={isReducedMotion ? {} : { scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-xs font-black uppercase tracking-[0.4em] text-yellow-600 mb-3"
          >
            New Rank Unlocked!
          </motion.p>

          <div className="relative mb-6">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter relative">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: isReducedMotion ? 0 : 0.5 + index * 0.08,
                    duration: 0.3
                  }}
                  className="inline-block shimmer-effect"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <div className="absolute inset-0 pointer-events-none">
              {!isReducedMotion && (
                <>
                  <motion.div
                    animate={{ y: [-20, 0, -20], opacity: [0,1,0], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0 }}
                    className="absolute top-2 left-4 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [-15, 0, -15], opacity: [0,1,0], rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    className="absolute top-6 right-8 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [-25, 0, -25], opacity: [0,1,0], rotate: 180 }}
                    transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                    className="absolute bottom-2 left-6 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 mb-10 relative">
            <div className="text-center relative">
              <div className="relative mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.h4
                    className="text-6xl md:text-7xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight"
                    style={{ willChange: 'transform' }}
                  >
                    {displayedLevel}
                  </motion.h4>
                </div>
              </div>
              <motion.div
                className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
              >
                <motion.div
                  className="h-full bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                className="mt-2"
              >
                <BadgeIcon size={24} className={badge.color} />
              </motion.div>
            </div>

            <div className="hidden sm:block w-px h-20 bg-slate-200 dark:bg-slate-600" />

            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Current Title
              </p>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-wide">
                {newTitle}
              </h4>
            </div>
          </div>

          <AnimatePresence>
            {showRewards && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="mb-6 space-y-2"
              >
                {rewards.map((reward, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
                  >
                    <reward.icon size={20} className={reward.color} />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{reward.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full bg-slate-900 dark:bg-slate-800 text-white py-5 rounded-2xl font-black text-sm hover:bg-black dark:hover:bg-slate-700 transition-all shadow-xl active:scale-95"
            style={{ willChange: 'transform' }}
          >
            TERUSKAN PERJALANAN
            <Sparkles size={20} className="text-yellow-400 animate-spin-slow" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
