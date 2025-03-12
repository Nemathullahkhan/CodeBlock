

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const moduleId = params.id;

    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    // ✅ Fetch total content in the module
    const totalPrograms = await prisma.content.count({
      where: { topic: { moduleId } },
    });

    if (totalPrograms === 0) {
      return NextResponse.json({ progress: "0" });
    }

    // ✅ Fetch completed programs for the user
    const completedPrograms = await prisma.userProgress.count({
      where: {
        userId, // Filter by user
        content: { topic: { moduleId } },
        completed: true, // Ensure this field exists in UserProgress model
      },
    });

    // ✅ Calculate progress
    const progress = ((completedPrograms / totalPrograms) * 100).toFixed(2);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
