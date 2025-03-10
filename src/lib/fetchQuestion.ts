import prisma from "@/lib/prisma";

// Server action to fetch problem data
export async function fetchProblemData(id: string) {
  const content = await prisma.content.findUnique({
    where: { id },
    include: {
      Questions: true,
      implementation: true,
    }
  });
  
  return {
    programName: content?.title || null,
    id,
  };
}