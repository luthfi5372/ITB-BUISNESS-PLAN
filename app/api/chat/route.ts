import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Matikan cache agar merespon real-time
export const dynamic = 'force-dynamic';
// Beri waktu loading agak panjang (opsional)
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("🚨 MIRA TERSENGGOL! PESAN MASUK!"); // <--- Alarm Pelacak!

  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'), // Otak canggih & cepat dari Google
      system: `Kamu adalah Mira, seorang asisten virtual kesehatan mental dan mindfulness di aplikasi MindMate+. 
      Sifatmu: Ramah, penuh empati, suportif, dan menggunakan bahasa Indonesia yang santai tapi sopan (gunakan 'aku' dan 'kamu').
      Tugasmu: Mendengarkan curhatan user, memberikan saran psikologis ringan, tips mindfulness, dan menyemangati mereka. 
      Ingat: Kamu bukan psikolog asli. Selalu ingatkan user untuk mencari bantuan profesional jika mereka menunjukkan tanda bahaya serius. Balaslah dengan gaya chat yang mengalir, jangan terlalu kaku.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("MIRA_AI_ERROR:", error);
    return new Response(JSON.stringify({ error: "Gagal menyambung ke otak Mira." }), { status: 500 });
  }
}
