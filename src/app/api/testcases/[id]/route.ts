import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await and destructure the params Promise
    const result = await prisma.content.findUnique({
      where: { id },
      include: { Questions: true },
    });
    console.log("Database result:", result); 

    if (!result) {
      return NextResponse.json(
        { error: "TestCases not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.Questions, { status: 200 });
  } catch (error) {
    console.error("Error fetching testcases: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}