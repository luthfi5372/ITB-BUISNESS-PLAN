🌑 PHASE 1: BRANDING & CORE DESIGN (CYBER-ZEN STYLE)
Fokus pada pondasi visual agar aplikasi punya identitas "Sahabat Digital" yang premium.

[ ] 1.1. Typography Engine:
✅ Import Plus Jakarta Sans (400, 600, 800) di layout.tsx.
[ ] Set tracking-tighter sebagai default untuk semua Heading (h1-h3).

[ ] 1.2. Color System Integration:
✅ Definisikan bg-[#050508] sebagai kanvas utama (Deep Black).
[ ] Buat class glass-card: bg-white/5 backdrop-blur-3xl border border-white/10.
[ ] Setup gradient text: bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-400.

[ ] 1.3. Global Components:
[ ] Desain Custom Button: Animasi glow saat hover menggunakan shadow-indigo-500/20.
[ ] Desain Section Divider: Garis tipis border-white/5 dengan gradasi memudar ke arah tengah.

🧠 PHASE 2: SMART MOOD TRACKER & MIRA AI (FITUR 1 & 2)
Implementasi kecerdasan buatan dan visualisasi emosi yang tidak membebani.

[ ] 2.1. Liquid Mood Visualization:
[ ] Buat komponen Blob Animation: Gunakan animate={{ borderRadius: [...] }} di Framer Motion.
[ ] Color Mapping Logic: Jika mood < 4 (Blue/Cold), jika mood 5-7 (Indigo/Neutral), jika mood > 8 (Amber/Warm).

[ ] 2.2. Automated Habit Analytics:
[ ] Buat sub-komponen Sleep & Activity Sync: Menampilkan angka real-time dari dummy data (contoh: "8.2h Sleep").
[ ] Implementasi Proactive Suggestion Card: Kartu kecil dari Mira AI yang muncul otomatis (misal: "Deteksi cemas? Coba napas 5 menit").

[ ] 2.3. Mira AI Chat Interface:
[ ] Buat UI Chat yang minimalis dengan fixed positioning di pojok kanan bawah.
[ ] Tambahkan animasi "Mira is typing..." dengan 3 dot berdenyut.

🏥 PHASE 3: PROFESSIONAL & EMERGENCY SYSTEM (FITUR 3 & 5)
Membangun "Jaring Pengaman" dan akses ke tenaga ahli.

[ ] 3.1. Professional Booking UI:
[ ] Buat Grid List Psikolog: Menampilkan foto, spesialisasi, dan badge "Verifikasi".
[ ] Schedule Picker: Komponen pemilihan jam yang clean dan responsif.

[ ] 3.2. Emergency Support Connection (SOS):
[ ] Floating Action Button (FAB): Tombol bulat merah dengan animasi ping (berdenyut) di pojok kiri bawah.
[ ] SOS Logic: Popup konfirmasi yang langsung menampilkan nomor hotline nasional dan kontak Guru BK (sesuai dokumen).

[ ] 3.3. Secure Vault Concept:
[ ] Buat UI untuk riwayat sesi yang terkunci (menggunakan ikon gembok) untuk menjamin privasi.

🤝 PHASE 4: COMMUNITY & B2B PARTNERSHIP (FITUR 4 & MODEL BISNIS)
Menghubungkan sekolah, kampus, dan perusahaan.

[ ] 4.1. Local Community Hub:
[ ] Desain kartu komunitas khusus: "SMA Darul Ulum 1 Community" atau "Jombang Zen Space".
[ ] Tambahkan indikator "Online Now" pada komunitas untuk menunjukkan keaktifan.

[ ] 4.2. B2B Institutional Dashboard Preview:
[ ] Buat section "MindMate+ for Schools": Menampilkan mockup dashboard anonim untuk Guru BK.
[ ] Tampilkan statistik agregat (contoh: "Tingkat stres siswa bulan ini turun 15%").

[ ] 4.3. Gamification System (EXP):
[ ] Implementasi Badge System: Desain lencana "7 Days Journaling" atau "Calm Voyager".

💰 PHASE 5: PRICING & IDENTITY (THE CONVERSION)
Finalisasi paket harga dan informasi legal perusahaan.

[ ] 5.1. Multi-Tier Pricing Redesign:
[ ] Paket Free: border-white/10.
[ ] Paket Warrior (Pro): border-indigo-500 dengan highlight "Populer".
[ ] Paket Master (Ultimate): border-amber-500 dengan aksen mewah.

[ ] 5.2. Detailed Corporate Footer:
[ ] Cantumkan PT MindMate Karya Nusantara.
[ ] Lokasi: Jombang, Jawa Timur.
[ ] Navigasi Legal: Link untuk "Syarat & Ketentuan" dan "Kebijakan Privasi".

[ ] 5.3. Performance Optimization:
[ ] Pastikan semua animasi Framer Motion menggunakan layoutId untuk transisi yang mulus.
[ ] Cek responsivitas Mobile (wajib nyaman di jempol).

**Status: Ready for Phase-by-Phase execution. Prioritaskan Phase 1 untuk konsistensi visual.**

