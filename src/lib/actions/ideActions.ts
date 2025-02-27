import prisma from "../prisma"

interface props {
  contentId: string
}

export async function getSolution({contentId}:props) {
  const contents = await prisma.content.findUnique({
    where: {id:contentId}
  })
  if(!contents) throw new Error("Failed to find the content");
}