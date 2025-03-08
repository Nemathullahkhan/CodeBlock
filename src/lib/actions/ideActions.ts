"use server";

// import { mergeSortData } from "../data/(divide_conquer)/mergesort";
// import { quickSortData } from "../data/(divide_conquer)/quicksort";
// import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";
// import { knapSackData } from "../data/(dynamic_programming)/knapsack";
// import { dijkstraData } from "../data/(graph_algorithms)/dijkstra";

// import { warshallData } from "../data/(graph_algorithms)/warshall";
// import { topologicalSortData } from "../data/(graph_algorithms)/topological";
// import { bfsData } from "../data/(graph_algorithms)/bfs";
// import { dfsData } from "../data/(graph_algorithms)/dfs";
// import { kruskalData } from "../data/(greedy_techniques)/krushkal";
// import { primsData } from "../data/(greedy_techniques)/prims";
import { nQueensData } from "../data/(backtracking)/nqueen";
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
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });

    if (!program) throw new Error("Id is incorrect");

    const questions = await prisma.questions.create({
      data: {
        question: nQueensData.questions.question,
        examples: nQueensData.questions.examples,
        constraints: nQueensData.questions.constraints,
        difficulty: nQueensData.questions.difficulty,
        testcases: nQueensData.questions.testcases,
        averageTime: nQueensData.questions.averageTime,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
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
      where: { contentId: "cm7wx9udj0003bud004j1fycm" },
      data: {
        question: nQueensData.questions.question,
        examples: nQueensData.questions.examples,
        constraints: nQueensData.questions.constraints,
        difficulty: nQueensData.questions.difficulty,
        testcases: nQueensData.questions.testcases,
        averageTime: nQueensData.questions.averageTime,
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
      where: { id: "cm7lal1lu000nbu8ostvrgszc" },
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
