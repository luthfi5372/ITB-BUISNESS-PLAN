import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { generateReply } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    let context: string[] = [];

    // Coba ambil session, jika ada maka baca riwayat jurnalnya untuk context
    const session = await getServerSession();
    let user = null;

    if (session?.user?.email) {
      user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) {
        const userChats = await prisma.moodLog.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 5,
        });
        context = userChats.map((log: any) => log.note).filter((note: any): note is string => note !== null);
      }
    }

    const userLevel = user ? user.level : 1;
    const userExp = user ? user.exp : 0;
    const reply = await generateReply(message, context, userLevel, userExp);

    // Kalau user login, tambahkan EXP
    if (user) {
      const expGain = 20;
      const newExp = (user.exp || 0) + expGain;
      const newLevel = Math.floor(newExp / 100) + 1;

      await prisma.user.update({
        where: { id: user.id },
        data: { exp: newExp, level: newLevel }
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("MIRA_ERROR:", error);
    return NextResponse.json({ error: "Mira lagi istirahat, coba lagi nanti" }, { status: 500 });
  }
}

