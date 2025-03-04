import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract module ID from the query params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    // ✅ Count total programs in this module
    const totalPrograms = await prisma.content.count({
      where: { topic: { moduleId: id } },
    });

    // ✅ Count completed programs
    const completedPrograms = await prisma.content.count({
      where: { topic: { moduleId: id }, iscompleted: true },
    });

    // ✅ Calculate progress percentage
    const progress = totalPrograms > 0 ? ((completedPrograms / totalPrograms) * 100).toFixed(2) : "0";

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
