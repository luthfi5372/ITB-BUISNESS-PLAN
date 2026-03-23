import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import EmergencyButton from "../components/EmergencyButton";
import { LevelUpProvider } from "../components/LevelUpProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "MindMate+ | Sahabat Digital Kesehatan Mental",
  description: "Aplikasi kesehatan mental berbasis AI untuk pelajar dan mahasiswa Indonesia. Smart mood tracker, Mira AI, booking psikolog, dan komunitas lokal.",
  keywords: "kesehatan mental, psikologi, AI, mood tracker, pelajar, mahasiswa, Indonesia",
};

import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-jakarta bg-[#050508] cyber-cursor antialiased`}>
        <AuthProvider>
          <LevelUpProvider>
            <ThemeProvider attribute="data-theme" defaultTheme="sage-green" enableSystem={false}>
              {children}
              <EmergencyButton />
            </ThemeProvider>
          </LevelUpProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
