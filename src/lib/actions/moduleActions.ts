"use server";

import prisma from "@/lib/prisma";
import { mergeSortData } from "../data/(divide_conquer)/mergesort";

// Create modules
export async function createModule() {
  const result = await prisma.module.create({
    data: {
      name: "Design And Analysis of Algorithms ",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India. Solutions and approaches explained using C++, Java & Python",
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
    c
    throw new Error("failed to fetch modules",err);
  }
}
// function to add topics in module
export async function createTopics() {
  const result = await prisma.topic.create({
    data: {
      name: "Divide and Conquer",
      description:
        "Algorithms that recursively divide problems into subproblems",
      moduleId: "cm7f4ndrz0008bue4mhqje0qh",
    },
  });
}
// function to create Content
export async function createContent(){
  try{
    const result = await prisma.content.create({
      // data:{
      //   title:"Quick Sort",
      //   description:"Somting",
      //   photos:["Somting"],
      //   complexityAnalysis:"Something",
      //   applications:"Something",
      //   advantages:["Something"],
      //   disadvantages:["Something"],
      //   topicId:"cm7f4otem000abue44msxb0xv",
      // }
      data:{
        title:mergeSortData.content.title,
        description:mergeSortData.content.description,
        photos:mergeSortData.content.photos,
        complexityAnalysis:mergeSortData.content.complexityAnalysis,
        applications:mergeSortData.content.applications,
        advantages:mergeSortData.content.advantages,
        disadvantages:mergeSortData.content.disadvantages,
        topicId:"cm7f4otem000abue44msxb0xv",
      }
    })
    return result;
  }catch(err){
    console.error("Failed to create content",err);
  }
}
// function to create fAQ and implementation questions
export async function createFAQ(){
  try{
    const content = await prisma.content.findUnique({
      where:{id:"cm7g2rs5j0003buf8uumw3bgr"}
    });

    const createQuestions = await prisma.faqQuestion.create({
      // data:{
      //   question:"What is Quick Sort?",
      //   answer:"Quick sort is the sorting algorithm",
      //   contentId:"cm7f5ypuj0001buc4xp1vi2fq"
      // }
      data:{
          question:mergeSortData.faq[0].question,
          answer:mergeSortData.faq[0].answer,
          contentId:"cm7g2rs5j0003buf8uumw3bgr"
        }
    });

    return createQuestions;
  }catch(err){
    console.error("Failed to create FAQ's",err);
  }
}
// function to create viva Questions
export async function createViva(){
  try{
    const program = await prisma.content.findUnique({
      where:{id:"cm7g2rs5j0003buf8uumw3bgr"},
    });
    if(!program) throw new Error("Wrong id ");

    const createVivaQuestions = await prisma.vivaQuestion.create({
      data:{
        question:mergeSortData.vivaQuestions[0].question,
        answer:mergeSortData.vivaQuestions[0].answer,
        contentId:mergeSortData.vivaQuestions[0].contentId,
      }
    });
    return createVivaQuestions;
  }catch(err){
    console.error("Failed to create Viva questions",err);
  }
}
// working 
export async function working(){
  try{
    const program = await prisma.content.findUnique({
      where:{id:"cm7g2rs5j0003buf8uumw3bgr"},
    });
    if(!program) throw new Error("Wrong id ");

    const processing = await prisma.working.create({
      data:{
        explanation:mergeSortData.working.explanation,
        contentId:mergeSortData.working.contentId
      }
    })
    return processing;
  }catch(err){
    console.error("Failed to write the processing",err);
  }
}
export async function implementation() {
  try {
    // Fetch the related content
    const program = await prisma.content.findUnique({
      where: { id: "cm7g2rs5j0003buf8uumw3bgr" },
    });

    if (!program) throw new Error("Wrong ID - Content not found");

    // Create the implementation with multiple code languages
    const implementing = await prisma.implementation.create({
      data: {
        intuition: mergeSortData.implementation.intuition, 
        approach: mergeSortData.implementation.approach, 
        code: mergeSortData.implementation.code,
        contentId: program.id, 
      },
    });
    return implementing;
  } catch (err) {
    console.error("Failed to process implementation:", err);
    throw new Error("Server Error: Unable to create implementation");
  }
}
export async function illustration(){
  try{
    const program = await prisma.content.findUnique({
      where:{id:"cm7g2rs5j0003buf8uumw3bgr"}
    });

    if(!program) throw new Error("Id is incorrect");

    const illustrate = await prisma.illustration.create({
      // data:{
      //   summary:"somwthing",
      //   tips:"Something",
      //   images:[
      //     "something.com"
      //   ],
      //   contentId:program.id
      data:{
        summary:mergeSortData.illustration.summary,
        tips:mergeSortData.illustration.tips,
        images:mergeSortData.illustration.images,
        contentId:mergeSortData.illustration.contentId,
      }
    });
    return illustrate;
  }catch(err){
    console.error("Failed to process implementation:", err);
    throw new Error("Server Error: Unable to create implementation");
  }
}




















