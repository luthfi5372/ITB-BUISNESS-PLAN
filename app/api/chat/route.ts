import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    const { messages, sessionId: clientSessionId } = await req.json();
    console.log("📨 MIRA_INCOMING_MESSAGES:", JSON.stringify(messages, null, 2));

    const userMessageContent = messages[messages.length - 1].content || 
      messages[messages.length - 1].parts?.map((p: any) => p.type === 'text' ? p.text : '').join('') || '';

    // SDK v6: Transform client-side 'parts' back to 'content' for server-side compatibility
    const coreMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content || m.parts?.map((p: any) => p.type === 'text' ? p.text : '').join('') || ''
    }));

    const result = await streamText({
      model: google('gemini-flash-latest'),
      system: `Kamu adalah Mira, seorang asisten virtual kesehatan mental yang ramah di MindMate+. 
      Balas dengan santai dan suportif. Gunakan bahasa Indonesia yang akrab.
      
      TUGAS TAMBAHAN: Di akhir setiap respons, deteksi emosi dominan user (Senang, Sedih, Cemas, Marah, atau Netral) 
      dan letakkan di baris paling terakhir dengan format [[MOOD:EMOSI]].`,
      messages: coreMessages,
      onFinish: async ({ text }) => {
        if (userId) {
          try {
            // Deteksi Mood dari teks (Mira menyertakannya via system prompt di atas)
            const moodMatch = text.match(/\[\[MOOD:(.+)\]\]/);
            const detectedMood = moodMatch ? moodMatch[1].trim() : "Netral";
            const cleanText = text.replace(/\[\[MOOD:.+\]\]/, "").trim();

            // Gunakan sessionId yang ada atau buat baru
            let chatSession;
            if (clientSessionId) {
              chatSession = await prisma.chatSession.findUnique({ where: { id: clientSessionId } });
            }

            if (!chatSession) {
              chatSession = await prisma.chatSession.create({
                data: {
                  userId,
                  title: userMessageContent.slice(0, 50) + (userMessageContent.length > 50 ? "..." : "")
                }
              });
            }

            // Simpan Pesan User
            await prisma.chatMessage.create({
              data: {
                sessionId: chatSession.id,
                role: 'user',
                content: userMessageContent
              }
            });

            // Simpan Pesan AI (Mira)
            await prisma.chatMessage.create({
              data: {
                sessionId: chatSession.id,
                role: 'assistant',
                content: cleanText,
                moodDetected: detectedMood
              }
            });

            // Update MoodLog user jika mood terdeteksi kuat (Opsional/Advanced)
            if (detectedMood !== "Netral") {
               const moodMap: Record<string, number> = { "Sedih": 1, "Cemas": 2, "Netral": 3, "Senang": 5, "Marah": 2 };
               await prisma.moodLog.create({
                 data: {
                   userId,
                   mood: moodMap[detectedMood] || 3,
                   note: `Detected from chat: ${userMessageContent.slice(0, 50)}...`
                 }
               });
            }

            console.log("💾 MIRA_SAVED_CHAT_TO_DB:", chatSession.id);
          } catch (dbError) {
            console.error("❌ MIRA_DB_SAVE_ERROR:", dbError);
          }
        }
      }
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("MIRA_API_ERROR:", error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), { status: 500 });
  }
}
