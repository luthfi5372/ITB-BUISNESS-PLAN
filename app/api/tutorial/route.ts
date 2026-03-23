import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Menggunakan instance prisma global dari MINDMATE+

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    // Update status tutorial user menjadi true
    const user = await prisma.user.update({
      where: { email: email },
      data: { hasSeenTutorial: true },
    });

    return NextResponse.json({ message: "Tutorial selesai!", user });
  } catch (error) {
    console.error("TUTORIAL_ERROR:", error);
    return NextResponse.json({ error: "Gagal update status tutorial" }, { status: 500 });
  }
}
