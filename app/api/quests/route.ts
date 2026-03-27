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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { level: true, xp: true, title: true }
    });

    // Ambil semua quest
    const allQuests = await prisma.quest.findMany();

    // Ambil quest yang sudah diselesaikan user HARI INI
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userQuests = await prisma.userQuest.findMany({
      where: {
        userId,
        createdAt: {
          gte: today
        }
      }
    });

    const completionMap = new Map(userQuests.map(uq => [uq.questId, uq.isCompleted]));

    const questsWithStatus = allQuests.map(q => ({
      ...q,
      completed: completionMap.get(q.id) || false
    }));

    return NextResponse.json({ 
      quests: questsWithStatus,
      user: user
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { questId } = await req.json();

    const quest = await prisma.quest.findUnique({ where: { id: questId } });
    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    // Cek apakah sudah diselesaikan hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.userQuest.findFirst({
      where: {
        userId,
        questId,
        createdAt: { gte: today }
      }
    });

    if (existing?.isCompleted) {
      return NextResponse.json({ message: "Already completed today" });
    }

    // Tandai selesai
    await prisma.userQuest.upsert({
      where: {
        userId_questId_createdAt: {
          userId,
          questId,
          createdAt: existing?.createdAt || new Date()
        }
      },
      update: { isCompleted: true, completedAt: new Date() },
      create: { userId, questId, isCompleted: true, completedAt: new Date() }
    });

    // Tambah XP ke User
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: quest.xpReward }
      }
    });

    // Cek Level Up
    const nextLevelXp = user.level * 100;
    let leveledUp = false;
    if (user.xp >= nextLevelXp) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          level: { increment: 1 },
          title: user.level + 1 >= 5 ? "Zen Master" : "Mood Explorer"
        }
      });
      leveledUp = true;
    }

    return NextResponse.json({ 
      success: true, 
      xpGained: quest.xpReward, 
      leveledUp,
      newLevel: leveledUp ? user.level + 1 : user.level
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
