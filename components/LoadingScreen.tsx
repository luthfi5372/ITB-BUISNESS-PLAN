'use client';

import Lottie from 'lottie-react';
import logoAnimation from '@/public/animations/logo-animated.json';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-40 h-40">
        <Lottie 
          animationData={logoAnimation} 
          loop={true} 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="text-emerald-400 mt-4 font-medium text-lg animate-pulse">
        Memuat MindMate+...
      </p>
    </div>
  );
}
