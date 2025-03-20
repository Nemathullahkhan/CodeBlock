import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getModuleData(moduleId: string, userId: string) {
  // Verify authentication on the server side
  const session = await getServerSession(authOption);
  if (!session || !session.user?.id || session.user.id !== userId) {
    // If not authenticated or IDs don't match, redirect
    redirect("/auth/signin");
  }

  try {
    // Fetch the module data
    const moduleData = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        topics: {
          include: {
            contents: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!moduleData) {
      return {
        module: null,
        totalPrograms: 0,
        userProgress: [],
        progress: 0,
      };
    }

    // Count total programs
    const totalPrograms = await prisma.content.count({
      where: {
        topic: {
          moduleId: moduleId,
        },
      },
    });

    // Get user progress
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        content: {
          topic: { moduleId: moduleId },
        },
      },
      select: {
        contentId: true,
        completed: true,
      },
    });

    const completedPrograms = userProgress.filter((up) => up.completed).length;

    const progress = totalPrograms
      ? parseFloat(((completedPrograms / totalPrograms) * 100).toFixed(2))
      : 0;

    // Transform the module data into a plain object
    const moduleaa = {
      id: moduleData.id,
      name: moduleData.name,
      description: moduleData.description,
      topics: moduleData.topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        contents: topic.contents.map((content) => ({
          id: content.id,
          title: content.title,
        })),
      })),
    };

    // Return the formatted data
    return {
      moduleaa,
      totalPrograms,
      userProgress,
      progress,
    };
  } catch (error) {
    console.error("Error fetching module data:", error);
    throw new Error("Failed to fetch module data");
  }
}