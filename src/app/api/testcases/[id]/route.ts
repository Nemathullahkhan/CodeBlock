import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
