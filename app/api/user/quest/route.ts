import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { xpReward } = await req.json();

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { exp: { increment: xpReward } } // Tambahkan XP sesuai hadiah quest!
    });

    return NextResponse.json({ message: "Quest Selesai!", exp: user.exp }, { status: 200 });
  } catch (error) {
    console.error("QUEST_ERROR:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
