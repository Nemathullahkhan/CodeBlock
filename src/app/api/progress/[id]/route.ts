import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const moduleId = await params;

    if (!moduleId || typeof moduleId !== "string") {
      return NextResponse.json(
        { error: "Module ID is required and must be a string" },
        { status: 400 }
      );
    }

    const totalPrograms = await prisma.content.count({
      where: { topic: { moduleId } },
    });

    if (totalPrograms === 0) {
      return NextResponse.json({ progress: "0" });
    }

    const completedPrograms = await prisma.userProgress.count({
      where: {
        userId,
        content: { topic: { moduleId } },
        completed: true,
      },
    });

    const progress = ((completedPrograms / totalPrograms) * 100).toFixed(2);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

