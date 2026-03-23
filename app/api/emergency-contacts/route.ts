import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const contacts = await prisma.emergencyContact.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET EMERGENCY CONTACTS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch emergency contacts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, phone, relation, isPrimary } = await req.json();

    if (!name || !phone || !relation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If setting as primary, unset other primaries
    if (isPrimary) {
      await prisma.emergencyContact.updateMany({
        where: { userId: user.id },
        data: { isPrimary: false },
      });
    }

    const contact = await prisma.emergencyContact.create({
      data: {
        userId: user.id,
        name,
        phone,
        relation,
        isPrimary: isPrimary || false,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("POST EMERGENCY CONTACT ERROR:", error);
    return NextResponse.json({ error: "Failed to create emergency contact" }, { status: 500 });
  }
}