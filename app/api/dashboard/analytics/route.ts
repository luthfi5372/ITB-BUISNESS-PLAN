import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { generateInsight } from "@/lib/openai";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ streak: 0, stability: 0, insight: 'Log mood to see insights.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ streak: 0, stability: 0, insight: 'Log mood to see insights.' });
    }

    const userId = user.id;
    const streak = user.streak;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moodLogs = await prisma.moodLog.findMany({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo },
      },
    });

    const stability = moodLogs.length > 0
      ? (moodLogs.reduce((sum: number, log: { mood: number }) => sum + log.mood, 0) / moodLogs.length * 20).toFixed(0) // Scale to %
      : 0;

    const insight = await generateInsight(moodLogs, []);

    return NextResponse.json({ 
      streak, 
      stability: Number(stability), 
      insight,
      mindfulnessDays: streak // Alias for UI
    });
  } catch (error) {
    console.error('ANALYTICS_ERROR:', error);
    return NextResponse.json({ streak: 0, stability: 0, insight: 'Try logging your mood daily.' });
  }
}

