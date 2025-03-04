import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const moduleId = await params.id;

    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    // ✅ Fetch Module Data
    const mule = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        topics: {
          include: {
            contents: true,
          },
        },
      },
    });

    if (!mule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // ✅ Count Total Programs in this module
    const totalPrograms = await prisma.content.count({
      where: { topic: { moduleId } },
    });

    // ✅ Count Completed Programs (iscompleted === true)
    const completedPrograms = await prisma.content.count({
      where: { topic: { moduleId }, iscompleted: true },
    });

    // ✅ Calculate Progress Percentage
    const progress = totalPrograms > 0 ? ((completedPrograms / totalPrograms) * 100).toFixed(2) : "0";

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
