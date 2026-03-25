import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
       return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ambil data mood history 7 hari terakhir dari database
    const moods = await prisma.moodLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      take: 7, // Ambil 7 data terakhir
      select: {
        mood: true,
        createdAt: true,
      },
    });

    // Kita pakai index hari Senin-Minggu agar tidak tertimpa ("S" ada tiga)
    // 0: Senin, 1: Selasa, ..., 6: Minggu
    const formattedData: Record<number, number> = {};
    
    moods.forEach((m) => {
      let dayIndex = new Date(m.createdAt).getDay() - 1; // 0 for Monday
      if (dayIndex === -1) dayIndex = 6; // Sunday becomes 6
      formattedData[dayIndex] = m.mood;
    });

    // Lengkapi data default 0
    for (let i = 0; i < 7; i++) {
        if (!(i in formattedData)) {
            formattedData[i] = 0;
        }
    }

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error("MOOD_HISTORY_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
