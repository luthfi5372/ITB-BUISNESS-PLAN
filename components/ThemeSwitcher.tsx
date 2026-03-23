"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const colors = [
  { id: "sage", name: "Sage Green", class: "", hex: "#86A789", label: "Default" },
  { id: "blue", name: "Blue Sky", class: "theme-blue", hex: "#60A5FA", label: "Sky" },
  { id: "lavender", name: "Lavender", class: "theme-lavender", hex: "#A78BFA", label: "Dream" },
  { id: "peach", name: "Warm Peach", class: "theme-peach", hex: "#FB923C", label: "Warm" },
];

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeColor, setActiveColor] = useState("sage");

  useEffect(() => {
    setMounted(true);
    const savedColor = localStorage.getItem("mindmate-color-theme") || "sage";
    setActiveColor(savedColor);
    applyColorTheme(savedColor);
  }, []);

  const applyColorTheme = (colorId: string) => {
    // Remove all theme classes from document element
    const root = document.documentElement;
    colors.forEach((c) => {
      if (c.class) root.classList.remove(c.class);
    });

    // Add selected theme class
    const selected = colors.find((c) => c.id === colorId);
    if (selected && selected.class) {
      root.classList.add(selected.class);
    }

    localStorage.setItem("mindmate-color-theme", colorId);
    setActiveColor(colorId);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Theme Capsule */}
      <div className="flex items-center gap-1.5 p-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => applyColorTheme(color.id)}
            className={`relative w-6 h-6 rounded-full transition-all duration-300 hover:scale-110 active:scale-95`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {activeColor === color.id && (
              <motion.div
                layoutId="activeColorRing"
                className="absolute -inset-1 border-2 border-white rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Dark/Light Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-all shadow-xl"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
