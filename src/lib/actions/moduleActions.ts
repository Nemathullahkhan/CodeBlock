"use server";

//  cm7kklzg8000pbutcs2ksz8zq

import prisma from "@/lib/prisma";
import { mergeSortData } from "../data/(divide_conquer)/mergesort";
import { quickSortData } from "../data/(divide_conquer)/quicksort";
import { knapSackData } from "../data/(dynamic_programming)/knapsack";
import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";
import { dijkstraData } from "../data/(graph_algorithms)/dijkstra";
import { kruskalData } from "../data/(greedy_techniques)/krushkal";
import { primsData } from "../data/(greedy_techniques)/prims";
import { topologicalSortData } from "../data/(graph_algorithms)/topological";
import { bfsData } from "../data/(graph_algorithms)/bfs";
import { dfsData } from "../data/(graph_algorithms)/dfs";
import { warshallData } from "../data/(graph_algorithms)/warshall";
import { nQueensData } from "../data/(backtracking)/nqueen";




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
    throw new Error("failed to fetch modules", err);
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
}
// function to create Content
export async function createContent() {
  try {
    const result = await prisma.content.create({
      data: {
        title: nQueensData.content.title,
        description: nQueensData.content.description,
        brief: nQueensData.content.brief,
        photos: nQueensData.content.photos,
        complexityAnalysis: nQueensData.content.complexityAnalysis,
        applications: nQueensData.content.applications,
        advantages: nQueensData.content.advantages,
        disadvantages: nQueensData.content.disadvantages,
        videos: nQueensData.content.videos,
        topicId: "cm7lgjquq004hbu8otwz96s1k",
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
        question: nQueensData.faq[0].question,
        answer: nQueensData.faq[0].answer,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
      },
    });

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
        question: nQueensData.vivaQuestions[0].question,
        answer: nQueensData.vivaQuestions[0].answer,
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
        explanation: nQueensData.working.explanation,
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
        intuition: nQueensData.implementation.intuition,
        approach: nQueensData.implementation.approach,
        code: nQueensData.implementation.code,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
      },
    });
    return implementing;
  } catch (err) {
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
        summary: nQueensData.illustration.summary,
        tips: nQueensData.illustration.tips,
        images: nQueensData.illustration.images,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
        explanation: nQueensData.illustration.explanation,
      },
    });
    return illustrate;
  } catch (err) {
    console.error("Failed to process implementation:", err);
    throw new Error("Server Error: Unable to create implementation");
  }
}


// Function for the 