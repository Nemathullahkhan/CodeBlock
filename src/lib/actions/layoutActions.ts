// lib/actions/layoutActions.ts
"use server"

import prisma from "@/lib/prisma";

export async function getContentData(id: string) {
  const content = await prisma.content.findUnique({
    where: { id },
    include: {
      Questions: true,
      implementation: true,
    },
  });
  
  return {
    programName: content?.title || null
  };
}