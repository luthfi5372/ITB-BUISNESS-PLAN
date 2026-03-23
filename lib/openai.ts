import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export async function generateInsight(moodLogs: any[], lastChats: string[]): Promise<string> {
  try {
    const client = getOpenAI();
    const prompt = `Analyze these mood logs and chats for mental health insights. Mood 1-5 scale. Logs: ${JSON.stringify(moodLogs.slice(-7))}. Recent chats: ${lastChats.slice(-3).join(', ')}. Give 1 actionable insight for better mental health in 1 sentence.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    return completion.choices[0].message.content || 'Take a deep breath and reflect.';
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Take a deep breath and reflect on your day.';
  }
}

export async function generateReply(message: string, context: string[], level: number = 1, exp: number = 0): Promise<string> {
  try {
    const client = getOpenAI();
    const prompt = `Kamu adalah Mira, asisten AI ("Sahabat Digital") dari aplikasi MindMate+. 
Tugasmu: Menjadi pendengar berempati tinggi sekaligus coach kesehatan mental dan fisik yang suportif.
Informasi User saat ini: Level ${level} dengan ${exp} EXP.
Pedoman balasanmu:
1. Selalu gunakan Bahasa Indonesia yang santai, hangat, dan mengerti perasaan Gen-Z/Milenial (gunakan emoji sesekali).
2. Jika user membahas aktivitas fisik, stres, atau gaya hidup, berikan rekomendasi "olahraga mental" (meditasi ringan) atau olahraga fisik spesifik (seperti jalan santai, yoga, dll) yang berkesinambungan dengan mood.
3. Ingatkan mereka bahwa setiap hal positif yang mereka lakukan (termasuk curhat ke kamu) menambahkan EXP mereka untuk naik level.
4. Singkat, padat, dan tidak seperti robot.
Konteks curhat sebelumnya: ${context.slice(-5).join(', ')}.
Pesan terbaru dari user: "${message}"`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 300,
    });

    return completion.choices[0].message.content || 'Aku di sini untukmu. Tarik napas sebentar yuk 💙';
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Duh, koneksi otak (API API_KEY) ku ke OpenAI sepertinya terputus. Pastikan kamu sudah menaruh OPENAI_API_KEY di Vercel ya! 💙';
  }
}

