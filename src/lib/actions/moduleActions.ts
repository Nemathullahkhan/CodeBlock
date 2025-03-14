"use server";

//  cm7kklzg8000pbutcs2ksz8zq

import prisma from "@/lib/prisma";
import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";





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
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });
    if (!program) throw new Error("Wrong id ");

    const processing = await prisma.working.create({
      data: {
        explanation: floydsAlgorithmData.working.explanation,
        contentId:"cm7lgm7w7004jbu8ouk8n694l",
      },
    });
    return processing;
  } catch (err) {
    console.error("Failed to write the processing", err);
  }
}
export async function implementation() {
  try {
    // Fetch the related content
    const program = await prisma.content.findUnique({
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });

    if (!program) throw new Error("Wrong ID - Content not found");

    // Create the implementation with multiple code languages
    const implementing = await prisma.implementation.create({
      data: {
        intuition: floydsAlgorithmData.implementation.intuition,
        approach: floydsAlgorithmData.implementation.approach,
        code: floydsAlgorithmData.implementation.code,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
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
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });

    if (!program) throw new Error("Id is incorrect");

    const illustrate = await prisma.illustration.create({
      data: {
        summary: floydsAlgorithmData.illustration.summary,
        tips: floydsAlgorithmData.illustration.tips,
        images: floydsAlgorithmData.illustration.images,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
        explanation: floydsAlgorithmData.illustration.explanation,
      },
    });
    return illustrate;
  } catch (err) {
    console.error("Failed to process implementation:", err);
    throw new Error("Server Error: Unable to create implementation");
  }
}


