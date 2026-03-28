import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { xpReward } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newXp = (user.xp || 0) + xpReward;
    const newLevel = Math.floor(newXp / 100) + 1;
    let newTitle = "Newbie";
    if (newLevel >= 5 && newLevel < 10) newTitle = "Guardian";
    else if (newLevel >= 10 && newLevel < 25) newTitle = "Warrior";
    else if (newLevel >= 25) newTitle = "Master";

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        xp: newXp,
        level: newLevel,
        title: newTitle
      }
    });

    return NextResponse.json({ message: "Quest Selesai!", xp: updatedUser.xp, level: updatedUser.level, title: updatedUser.title }, { status: 200 });
  } catch (error) {
    console.error("QUEST_ERROR:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
