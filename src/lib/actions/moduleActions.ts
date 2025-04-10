"use server";

import prisma from "@/lib/prisma";
import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";
import { primsData } from "../data/(greedy_techniques)/prims";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "../auth";

export async function fetchContent(id: string, userId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || session.user.id !== userId) {
    redirect("/auth/signin");
  }

  const content = await prisma.content.findUnique({
    where: { id },
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
          contents: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
  });

  if (!content) {
    notFound();
  }

  return content;
}

// Mark content as completed
export async function markContentAsCompleted(userId: string, contentId: string) {
  await prisma.userProgress.upsert({
    where: {
      userId_contentId: {
        userId,
        contentId,
      },
    },
    update: {
      completed: true,
    },
    create: {
      userId,
      contentId,
      completed: true,
    },
  });
}



export async function getModuleData(moduleId: string, userId: string) {
  // Verify authentication on the server side
  const session = await getServerSession(authOptions);
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
        courseModule: null, // Renamed from `module` to `courseModule`
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
    const courseModule = {
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
      courseModule, // Renamed from `module` to `courseModule`
      totalPrograms,
      userProgress,
      progress,
    };
  } catch (error) {
    console.error("Error fetching module data:", error);
    throw new Error("Failed to fetch module data");
  }
}

// Create modules
export async function createModule() {
  const result = await prisma.module.create({
    data: {
      name: "Java Programming ",
      description:
        "Practical course on Java Programming based on the syllabus followed at LIET in India. Solutions and approaches explained in an easy  simplified manner",
    },
  });
  return result;
}
//  function to get modules
export async function getModules() {
  try {
    const result = await prisma.module.findMany();
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch modules", );
  }
}
// function to add topics in module
export async function createTopics() {
  const result = await prisma.topic.create({
    data: {
      name: "Backtracking",
      description:
        "Algorithms that incrementally build a solution and backtrack if a conflict occurs.",
      moduleId: "cm7j4tic90000buo8oh7a0scf",
    },
  });
  console.log(result);
}
// function to create Content
export async function createContent() {
  try {
    const result = await prisma.content.create({
      data: {
        title: floydsAlgorithmData.content.title,
        description: floydsAlgorithmData.content.description,
        brief: floydsAlgorithmData.content.brief,
        photos: floydsAlgorithmData.content.photos,
        complexityAnalysis: floydsAlgorithmData.content.complexityAnalysis,
        applications: floydsAlgorithmData.content.applications,
        advantages: floydsAlgorithmData.content.advantages,
        disadvantages: floydsAlgorithmData.content.disadvantages,
        videos: floydsAlgorithmData.content.videos,
        topicId: "cm7kklzg8000pbutcs2ksz8zq",
      },
    });
    return result;
  } catch (err) {
    // console.error("Failed to create content",err);
    console.log(err);
    throw new Error("Failed to create");
  }
}
// function to create fAQ and implementation questions
export async function createFAQ() {
  try {
    const content = await prisma.content.findUnique({
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });

    const createQuestions = await prisma.faqQuestion.create({
      data: {
        question: floydsAlgorithmData.faq[0].question,
        answer: floydsAlgorithmData.faq[0].answer,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
      },
    });
    console.log(content)
    return createQuestions;
  } catch (err) {
    console.error("Failed to create FAQ's", err);
  }
}
// function to create viva Questions
export async function createViva() {
  try {
    const program = await prisma.content.findUnique({
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });
    if (!program) throw new Error("Wrong id ");

    const createVivaQuestions = await prisma.vivaQuestion.create({
      data: {
        question: floydsAlgorithmData.vivaQuestions[0].question,
        answer: floydsAlgorithmData.vivaQuestions[0].answer,
        contentId: "cm7lgm7w7004jbu8ouk8n694l"
      },
    });
    return createVivaQuestions;
  } catch (err) {
    console.error("Failed to create Viva questions", err);
  }
}
// working
export async function working() {
  try {
    const program = await prisma.content.findUnique({
      where: { id: "cm7uvzzus0005buksajyrtv9o" },
    });
    if (!program) throw new Error("Wrong id ");

    const processing = await prisma.working.create({
      data: {
        explanation: floydsAlgorithmData.working.explanation,
        contentId:"cm7uvzzus0005buksajyrtv9o",
      },
    });
    return processing;
  } catch (err) {
    console.error("Failed to write the processing", err);
  }
}

export async function updateImplementation() {
  try {
    const implementation = await prisma.implementation.findUnique({
      where: { id: "cm7leb51o0021bu8oy55cxyij" },
    });

    if (!implementation) throw new Error("Wrong ID - Implementation not found");

    const updating = await prisma.implementation.update({
      where: { id: "cm7leb51o0021bu8oy55cxyij" },
      data: {
        intuition: primsData.implementation.intuition,
        approach: primsData.implementation.approach,
        code: primsData.implementation.code,
        contentId: "cm7le8hlv001tbu8ohh0p6nqu", 
      },
    });

    return updating;
  } catch (err) {
    console.log("Error occurred at updateImplementation", err);
  }
}

export async function implementation() {
  try {
    // Fetch the related content
    const program = await prisma.content.findUnique({
      where: { id: "cm7uvzzus0005buksajyrtv9o" },
    });

    if (!program) throw new Error("Wrong ID - Content not found");

    // Create the implementation with multiple code languages
    const implementing = await prisma.implementation.create({
      data: {
        intuition: floydsAlgorithmData.implementation.intuition,
        approach: floydsAlgorithmData.implementation.approach,
        code: floydsAlgorithmData.implementation.code,
        contentId: "cm7uvzzus0005buksajyrtv9o",
      },
    });
    return implementing;
  } catch (err) {
    console.log(err);
    throw new Error("Server Error: Unable to create implementation");
  }
}


export async function illustration() {
  try {
    const program = await prisma.content.findUnique({
      where: { id: "cm7uvzzus0005buksajyrtv9o" },
    });

    if (!program) throw new Error("Id is incorrect");

    const illustrate = await prisma.illustration.create({
      data: {
        summary: floydsAlgorithmData.illustration.summary,
        tips: floydsAlgorithmData.illustration.tips,
        images: floydsAlgorithmData.illustration.images,
        explanation: floydsAlgorithmData.illustration.explanation,
        contentId: "cm7uvzzus0005buksajyrtv9o",
      },
    });
    return illustrate;
  } catch (err) {
    console.error("Failed to process implementation:", err);
    throw new Error("Server Error: Unable to create implementation");
  }
}


