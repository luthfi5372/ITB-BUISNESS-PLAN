'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FBFBFE] p-8 text-center">
      <h2 className="text-2xl font-black mb-4">Aduh, MindMate+ sedang lelah...</h2>
      <p className="text-slate-500 mb-8 max-w-md">Ada sedikit masalah teknis. Tekan tombol di bawah untuk mencoba lagi.</p>
      <button 
        onClick={() => reset()} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
