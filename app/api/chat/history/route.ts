import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ambil session chat terakhir milik user ini
    const lastSession = await prisma.chatSession.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        }
      }
    });

    if (!lastSession) {
      return NextResponse.json({ messages: [] });
    }

    // Format pesan agar sesuai dengan ekspektasi AI SDK (UIMessage)
    const formattedMessages = lastSession.messages.map((m: any) => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.content,
      parts: [{ type: 'text', text: m.content }], // Sinkron dengan UI yang menggunakan .parts
      createdAt: m.createdAt,
    }));

    return NextResponse.json({ 
      messages: formattedMessages, 
      sessionId: lastSession.id 
    });
  } catch (error: any) {
    console.error("MIRA_HISTORY_API_ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
