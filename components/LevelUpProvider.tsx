"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import LevelUpOverlay from './LevelUpOverlay';

type LevelUpContextType = {
  triggerLevelUp: (newLevel: number, newTitle: string) => void;
};

const LevelUpContext = createContext<LevelUpContextType | undefined>(undefined);

export function LevelUpProvider({ children }: { children: ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [levelData, setLevelData] = useState<{ level: number; title: string } | null>(null);

  const triggerLevelUp = (newLevel: number, newTitle: string) => {
    setLevelData({ level: newLevel, title: newTitle });
    setShowOverlay(true);
  };

  const handleClose = () => setShowOverlay(false);

  return (
    <LevelUpContext.Provider value={{ triggerLevelUp }}>
      {children}
      {showOverlay && levelData && (
        <LevelUpOverlay
          level={levelData.level}
          newTitle={levelData.title}
          onClose={handleClose}
        />
      )}
    </LevelUpContext.Provider>
  );
}

export const useLevelUp = () => {
  const context = useContext(LevelUpContext);
  if (!context) throw new Error('useLevelUp must be used within LevelUpProvider');
  return context;
};