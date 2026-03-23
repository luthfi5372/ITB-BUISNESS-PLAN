import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session?.user?.email) {
      return NextResponse.json({ error: "Harus login dulu" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;
    const { mood, note, activities } = await req.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check last log today
    const todayLog = await prisma.moodLog.findFirst({
      where: {
        userId,
        createdAt: { gte: today }
      }
    });

    if (todayLog) {
      return NextResponse.json({ error: "Sudah log mood hari ini" }, { status: 400 });
    }

    // Update streak and award EXP
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    const newStreak = currentUser?.lastActive && currentUser.lastActive >= today ? (currentUser.streak || 0) + 1 : 1;
    const expGain = 10; // EXP for daily mood check
    const newExp = (currentUser?.exp || 0) + expGain;
    const newLevel = Math.floor(newExp / 100) + 1; // Level up every 100 EXP

    await prisma.user.update({
      where: { id: userId },
      data: { 
        streak: newStreak,
        lastActive: new Date(),
        exp: newExp,
        level: newLevel,
      }
    });

    const newLog = await prisma.moodLog.create({
      data: {
        userId,
        mood: Number(mood),
        note: note || "",
        activities: activities || [],
      },
    });

    return NextResponse.json({ ...newLog, streak: newStreak });
  } catch (error) {
    console.error("🚨 POST MOOD ERROR:", error);
    return NextResponse.json({ error: "Gagal simpan mood" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession();

    // Jika tidak ada session, kirim data kosong saja (tidak error 500)
    if (!session || !session?.user?.email) {
      return NextResponse.json([]);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const logs = await prisma.moodLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("🚨 GET MOOD ERROR:", error);
    return NextResponse.json([], { status: 200 });  // Return empty array even on error
  }
}
