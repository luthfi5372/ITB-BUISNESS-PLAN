import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050508',
          glass: 'rgba(255, 255, 255, 0.03)',
          accent1: '#6366f1', // indigo
          accent2: '#f43f5e', // rose
          accent3: '#fbbf24', // amber
        },
        'mind-violet': '#8B5CF6',
        'mind-pink': '#EC4899',
        'mind-cyan': '#06B6D4',
        'mind-lime': '#84CC16',
        'mind-orange': '#F97316',
        'mind-yellow': '#FACC15',
        'mind-rose': '#F43F5E',
        'mind-mint': '#34D399',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'glow-pulse': 'glow-indigo 2s ease-in-out infinite',
        'glow-amber': 'glow-amber 2.5s ease-in-out infinite',
        'glow-rose': 'glow-rose 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-indigo': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(99,102,241,0.8)' },
        },
        'glow-amber': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251,191,36,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(251,191,36,0.7)' },
        },
        'glow-rose': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244,63,94,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(244,63,94,0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      backgroundImage: {
        'cyber-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
