"use server";

import { mergeSortData } from "../data/(divide_conquer)/mergesort";
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

// function ot add questions 
export async function questions() {
  try{
    const program = await prisma.content.findUnique({
      where:{id:"cm7j5g8wc0003bugszt63oddx"}
    })

    if(!program) throw new Error("Id is incorrect");

    const questions = await prisma.questions.create({
      data:{
        question: mergeSortData.questions.question,
        examples:mergeSortData.questions.examples,
        constraints:mergeSortData.questions.constraints,
        difficulty:mergeSortData.questions.difficulty,
        testcases:mergeSortData.questions.testcases,
        averageTime:mergeSortData.questions.averageTime,
        contentId:"cm7j5g8wc0003bugszt63oddx" 
      },
    });
    return questions;
  }catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

export async function getQuestions () {
  try{

    // const program = await prisma.content.findUnique({
    //   where:{id:"cm7j5g8wc0003bugszt63oddx"},
    // })
    // if(!program) throw new Error("Id is incorrect");

    const section = await prisma.questions.findUnique({
      where:{id:"cm7nxxjmq0001bu60dkjxcr6w"}
    })
    return section;
  }catch(err:any){
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}