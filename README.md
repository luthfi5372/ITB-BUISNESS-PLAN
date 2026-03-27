# 🧠 MindMate+ | Your AI Mental Health Companion

> **"You're not alone."** – MindMate+ adalah aplikasi asisten kesehatan mental premium yang menggabungkan kecanggihan AI dengan pendekatan psikologi yang hangat dan analitis.

MindMate+ dirancang untuk menjadi ruang aman bagi siapa pun yang membutuhkan teman bicara, panduan relaksasi, atau pemantauan kondisi emosional secara mendalam.

---

## ✨ Fitur Unggulan (Fase Ekspansi)

### 💎 Premium Mira AI (SDK v6)
- **Long-term Memory**: Mira kini memiliki ingatan jangka panjang! Semua percakapan Anda tersimpan aman di database Supabase (via Prisma), memungkinkan kesinambungan sesi yang cerdas.
- **Sentiment Analysis**: Setiap pesan Anda dianalisis oleh AI untuk mendeteksi suasana hati (Mood) secara real-time.
- **Glassmorphism UI**: Tampilan chat modern dengan efek blur kristal dan animasi pulsing yang elegan.

### 🎮 MindMate Adventure (Gamification)
- **Daily Quests**: Selesaikan misi harian seperti "Morning Grateful" dan "Journaling" yang dideteksi otomatis oleh AI Mira.
- **Level & XP System**: Kumpulkan XP untuk naik level dari "Mood Explorer" menjadi "Zen Master."
- **Quest Dashboard**: Panel kontrol interaktif untuk memantau progres petualangan kesehatan mental Anda.

### 🧘 Health & Wellness Widgets
- **Breathing Guide (Metode 4-7-8)**: Latihan pernapasan terpandu dengan visualisasi yang menenangkan untuk meredakan kecemasan seketika.
- **Panic Button (Mode Krisis)**: Akses instan ke nomor darurat nasional (119) dan hotline kesehatan mental Kemenkes.

### 📊 Dashboard Analisis
- **Mood Tracker**: Grafik perkembangan emosi harian yang dihasilkan secara otomatis dari analisis percakapan Mira.
- **Gamifikasi**: Sistem Level, EXP, dan Achievement untuk memotivasi perjalanan kesehatan mental Anda.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **AI Engine**: [Google Gemini Pro](https://ai.google.dev/) via AI SDK v6
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Memulai (Setup)

1. **Clone Repository**:
   ```bash
   git clone https://github.com/luthfi5372/ITB-BUISNESS-PLAN.git
   cd mindmate-app
   ```

2. **Instalasi Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin `.env.example` menjadi `.env` dan isi variabel berikut:
   - `DATABASE_URL` & `DIRECT_URL` (Supabase)
   - `GOOGLE_GENERATIVE_AI_API_KEY` (Gemini API)
   - `NEXTAUTH_SECRET` & `GOOGLE_CLIENT_ID/SECRET`

4. **Sinkronisasi Database**:
   ```bash
   npx prisma db push
   ```

5. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) untuk mulai curhat dengan Mira!

---

## 🤝 Kontribusi & Inovasi
MindMate+ terus dikembangkan untuk menjadi mahakarya teknologi yang bermanfaat nyata bagi kesehatan mental masyarakat. Kontribusi dan saran sangat kami hargai.

**Project Lead**: Komandan Luthfi 🫡
**Version**: 2.0.0 (Expansion Phase Complete)

---
*Dibuat dengan ❤️ untuk masa depan mental yang lebih sehat.*
