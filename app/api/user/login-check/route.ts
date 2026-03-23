import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let newExp = user.exp + 10; // Bonus login harian
    let newLevel = Math.floor(newExp / 100) + 1; // Tiap 100 XP naik level

    // Logika Penentuan Gelar (Title)
    let newTitle = user.title;
    if (newLevel >= 2) newTitle = "Calm Voyager";
    if (newLevel >= 5) newTitle = "Mindfulness Warrior";
    if (newLevel >= 10) newTitle = "Zen Master";
    if (user.streak >= 7) newTitle = "Resilient Soul";

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        exp: newExp,
        level: newLevel,
        title: newTitle,
        lastActive: new Date()
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update rank" }, { status: 500 });
  }
}