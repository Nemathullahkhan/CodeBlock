"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { z } from "zod";


export type QuestionData = {
  title: string;
  Questions: {
    difficulty: "Easy" | "Medium" | "Hard";
    averageTime: string;
    question: string;
    examples: Example[];
    constraints: string[];
  };
};

export async function fetchSolution(id: string) {
  const solution = await prisma.content.findUnique({
    where: { id },
    include: {
      implementation: true,
    },
  });

  return {
    intuition: solution?.implementation?.intuition ?? null,
    approach: solution?.implementation?.approach ?? null,
    code: Array.isArray(solution?.implementation?.code)
      ? (solution.implementation.code as {
          language: string;
          code: string;
        }[])
      : null,
  };
}



const ExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
});

type Example = z.infer<typeof ExampleSchema>;

export async function fetchQuestionData(id: string) {
  const data = await prisma.content.findUnique({
    where: { id },
    include: {
      Questions: true,
    },
  });

  if (!data) return notFound();

  let validatedExamples: Example[] = [];
  const examples = data.Questions?.examples;

  if (examples && Array.isArray(examples)) {
    try {
      validatedExamples = examples.map((ex) => ExampleSchema.parse(ex));
    } catch (error) {
      console.error("Invalid examples data:", error);
    }
  }
  return {
    ...data,
    validatedExamples,
  };
};


export async function fetchProblemList () {
  const topics = await prisma.topic.findMany({
    include:{
      contents:{
        select:{
            id:true,
            title:true
        }
      },
  }
  });
  if (!topics) return [];
  return topics;
}

export async function renderTimenSpace({id}:{id:string}){
  try{
    const result = await prisma.content.findUnique({
      where:{id},
      select:{
        timeComplexity:true,
        spaceComplexity:true,
      }
    })
    return result;

  }catch(err){
    console.error("Error occured at the renderTimenSpace",err);
  }

}