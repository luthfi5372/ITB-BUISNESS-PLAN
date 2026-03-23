import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { generateReply } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Login dulu" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { message } = await req.json();
    const userChats = await prisma.moodLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    const context = userChats.map((log: any) => log.note).filter((note: any): note is string => note !== null);

    const reply = await generateReply(message, context);

    // Award EXP for chatting with Mira
    const expGain = 20; // EXP for each message
    const newExp = (user.exp || 0) + expGain;
    const newLevel = Math.floor(newExp / 100) + 1;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        exp: newExp,
        level: newLevel
      }
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("MIRA_ERROR:", error);
    return NextResponse.json({ error: "Mira lagi istirahat, coba lagi nanti" }, { status: 500 });
  }
}

