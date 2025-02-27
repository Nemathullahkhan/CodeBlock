import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, 
  context: { params: { id: string } } // Ensure `context` is correctly passed
) {
  try {
    const { params } = await context; // ✅ Await `context` first
    const { id } = params; // ✅ Now safely access `id`

    if (!id) {
      return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
    }

    const content = await prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
