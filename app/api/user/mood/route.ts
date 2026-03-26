import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { moodValue } = body;

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 1. Simpan history mood hari ini ke database
    await prisma.moodLog.create({
      data: {
        userId: user.id,
        mood: moodValue,
      }
    });

    // 2. Tambahkan 30 XP ke akun user dan pastikan level naik! 🔥
    const newExp = user.exp + 30;
    const newLevel = Math.floor(newExp / 1000) + 1;
    let newTitle = "Newbie";
    if (newLevel >= 5 && newLevel < 10) newTitle = "Guardian";
    else if (newLevel >= 10 && newLevel < 25) newTitle = "Warrior";
    else if (newLevel >= 25) newTitle = "Master";

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        exp: newExp,
        level: newLevel,
        title: newTitle
      }
    });

    return NextResponse.json({ message: "Mood berhasil disimpan!", exp: updatedUser.exp, level: updatedUser.level, title: updatedUser.title }, { status: 200 });
  } catch (error) {
    console.error("SIMPAN_MOOD_ERROR:", error);
    return NextResponse.json({ error: "Terjadi kesalahan di server" }, { status: 500 });
  }
}
