'use client';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FBFBFE]">
      <h2 className="text-2xl font-black mb-4">Halaman tidak ditemukan 😅</h2>
      <a href="/" className="bg-theme-primary text-white px-6 py-2 rounded-xl font-bold">
        Kembali ke Home
      </a>
    </div>
  );
}
