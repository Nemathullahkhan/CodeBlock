"use server";

import { mergeSortData } from "../data/(divide_conquer)/mergesort";
import { quickSortData } from "../data/(divide_conquer)/quicksort";
import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";
import { knapSackData } from "../data/(dynamic_programming)/knapsack";


import prisma from "../prisma";

interface props {
  contentId: string;
}

export async function getSolution({ contentId }: props) {
  const contents = await prisma.content.findUnique({
    where: { id: contentId },
  });
  if (!contents) throw new Error("Failed to find the content");
}

// function ot add questions
export async function questions() {
  try {
    const program = await prisma.content.findUnique({
      where: { id: "cm7l9h70a0001bu8oovkc9zgb" },
    });

    if (!program) throw new Error("Id is incorrect");

    const questions = await prisma.questions.create({
      data: {
        question: floydsAlgorithmData.questions.question,
        examples: floydsAlgorithmData.questions.examples,
        constraints: floydsAlgorithmData.questions.constraints,
        difficulty: floydsAlgorithmData.questions.difficulty,
        testcases: floydsAlgorithmData.questions.testcases,
        averageTime: floydsAlgorithmData.questions.averageTime,
        contentId: "cm7l9h70a0001bu8oovkc9zgb",
      },
    });
    return questions;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

export async function updateTestCases() {
  try {
    const updatedQuestion = await prisma.questions.update({
      where: { contentId: "cm7t8ogw50001bu98qslpa3g8" },
      data: {
        question: floydsAlgorithmData.questions.question,
        examples: floydsAlgorithmData.questions.examples,
        constraints: floydsAlgorithmData.questions.constraints,
        difficulty: floydsAlgorithmData.questions.difficulty,
        testcases: floydsAlgorithmData.questions.testcases,
        averageTime: floydsAlgorithmData.questions.averageTime,
      },
    });

    return updatedQuestion;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}


export async function getQuestions() {
  try {
    // const program = await prisma.content.findUnique({
    //   where:{id:"cm7j5g8wc0003bugszt63oddx"},
    // })
    // if(!program) throw new Error("Id is incorrect");

    const section = await prisma.questions.findUnique({
      where: { id: "cm7ja3jju000hbugs0bx8uvid" },
    });
    return section;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

export async function questionCompleted({ id }: { id: string }) {
  try {
    const result = await prisma.content.update({
      where:{id},
      data:{ iscompleted: true}, 
      })
      console.log(result);
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}
