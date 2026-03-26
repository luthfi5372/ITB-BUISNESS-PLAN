import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Matikan cache agar peringkatnya selalu update real-time!
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Perintahkan Prisma untuk mencari 3 User dengan EXP paling tinggi (descending)
    const topUsers = await prisma.user.findMany({
      orderBy: {
        exp: 'desc',
      },
      take: 3, // Hanya ambil Top 3
      select: {
        name: true,
        exp: true,
      },
    });

    return NextResponse.json({ data: topUsers });
  } catch (error) {
    console.error("LEADERBOARD_ERROR:", error);
    return NextResponse.json({ error: "Gagal mengambil data leaderboard" }, { status: 500 });
  }
}
