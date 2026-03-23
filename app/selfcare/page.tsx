"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Play, Star, Target, Heart, Brain, Moon } from "lucide-react";
import Link from "next/link";

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: any;
  color: string;
  activities: string[];
}

export default function SelfCarePage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const programs: Program[] = [
    {
      id: "anxiety",
      title: "Mengatasi Kecemasan",
      description: "Program 7 hari untuk mengelola kecemasan sehari-hari dengan teknik pernapasan dan mindfulness.",
      duration: "7 Hari",
      icon: Brain,
      color: "bg-blue-500",
      activities: [
        "Teknik pernapasan 4-7-8",
        "Jurnal pikiran negatif",
        "Meditasi kesadaran",
        "Olahraga ringan",
        "Tidur berkualitas",
        "Komunikasi positif",
        "Refleksi mingguan"
      ]
    },
    {
      id: "sleep",
      title: "Kebiasaan Tidur Sehat",
      description: "Bangun rutinitas tidur yang konsisten untuk meningkatkan kualitas istirahat dan energi harian.",
      duration: "14 Hari",
      icon: Moon,
      color: "bg-theme-primary",
      activities: [
        "Jadwal tidur tetap",
        "Rutinitas sebelum tidur",
        "Batasi layar gadget",
        "Lingkungan tidur nyaman",
        "Olahraga pagi",
        "Hindari kafein sore",
        "Jurnal mimpi",
        "Refleksi tidur",
        "Teknik relaksasi",
        "Pola makan sehat",
        "Meditasi malam",
        "Bangun pagi alami",
        "Stretching ringan",
        "Minum air cukup"
      ]
    },
    {
      id: "confidence",
      title: "Meningkatkan Kepercayaan Diri",
      description: "Program 30 hari untuk membangun rasa percaya diri melalui afirmasi dan tantangan kecil.",
      duration: "30 Hari",
      icon: Star,
      color: "bg-yellow-500",
      activities: [
        "Afirmasi pagi",
        "Tantangan kecil harian",
        "Jurnal pencapaian",
        "Olahraga rutin",
        "Belajar hal baru",
        "Berbicara di depan umum",
        "Menerima pujian",
        "Memaafkan diri",
        "Visualisasi sukses",
        "Membantu orang lain",
        "Meditasi kasih sayang",
        "Postur tubuh percaya diri",
        "Berpakaian rapi",
        "Makan sehat",
        "Tidur cukup",
        "Refleksi mingguan",
        "Tantangan sosial",
        "Apresiasi diri",
        "Goal setting",
        "Celebrate wins",
        "Networking",
        "Public speaking",
        "Leadership skills",
        "Creative expression",
        "Nature walks",
        "Gratitude practice",
        "Mindful eating",
        "Digital detox",
        "Volunteer work",
        "Art therapy"
      ]
    },
    {
      id: "balance",
      title: "Keseimbangan Akademik & Pribadi",
      description: "Program khusus pelajar untuk menjaga keseimbangan antara tugas sekolah dan kehidupan pribadi.",
      duration: "21 Hari",
      icon: Target,
      color: "bg-green-500",
      activities: [
        "Perencanaan harian",
        "Teknik pomodoro",
        "Break time aktif",
        "Hobi kreatif",
        "Olahraga rutin",
        "Sosialisasi",
        "Tidur cukup",
        "Makan teratur",
        "Meditasi singkat",
        "Jurnal refleksi",
        "Batas waktu belajar",
        "Aktivitas luar ruangan",
        "Komunikasi dengan teman",
        "Istirahat akhir pekan",
        "Evaluasi kemajuan",
        "Reward system",
        "Mindful breaks",
        "Creative outlets",
        "Social connections",
        "Self-compassion",
        "Time management"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <Link href="/dashboard" className="text-theme-primary hover:text-theme-primary mb-4 inline-block">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Program Self-Care</h1>
          <p className="text-slate-400 mt-2">Ikuti program terstruktur untuk membangun kebiasaan positif dan kesehatan mental yang lebih baik.</p>
        </header>

        {!selectedProgram ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${program.color} rounded-3xl flex items-center justify-center text-white flex-shrink-0`}>
                    <program.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{program.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={16} />
                      <span>{program.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-slate-500">{program.activities.length} aktivitas</span>
                  <button className="bg-theme-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-theme-primary transition">
                    Mulai Program
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-theme-primary hover:text-theme-primary font-bold"
              >
                ← Kembali ke Program
              </button>
              <div className="flex items-center gap-2">
                <div className={`w-12 h-12 ${selectedProgram.color} rounded-2xl flex items-center justify-center text-white`}>
                  <selectedProgram.icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedProgram.title}</h2>
                  <p className="text-slate-500">{selectedProgram.duration}</p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed">{selectedProgram.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProgram.activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{activity}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-theme-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-theme-primary transition text-lg">
                <Play size={20} className="inline mr-2" />
                Mulai Program Hari Ini
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}