"use server";

import prisma from "@/lib/prisma";

export async function getTopicContent(contentId: string) {
  try {
    const contents = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        faq: true,
        vivaQuestions: true,
        working: true,
        illustration: true,
        implementation: true,
        UserProgress: true,
        topic: {
          include: {
            module: true,
          },
        },
      },
    });

    return contents;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}