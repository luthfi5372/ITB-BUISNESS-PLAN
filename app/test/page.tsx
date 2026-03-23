"use client";
import { useState, useEffect } from 'react';
import LevelUpOverlay from '../../components/LevelUpOverlay';

export default function Test() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-mind-violet to-mind-pink text-white p-8">
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-mind-lime to-mind-yellow bg-clip-text text-transparent">
          Test Page Success!
        </h1>
        <p className="text-2xl opacity-90">Server + Dashboard Foundation Works</p>
        <p className="text-lg opacity-70">LevelUpOverlay triggers in 2s...</p>
        {showOverlay && (
          <LevelUpOverlay level={15} newTitle="MindMate Master" onClose={() => setShowOverlay(false)} />
        )}
      </div>
    </div>
  );
}
