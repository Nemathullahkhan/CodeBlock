

"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { fetchQuestionData } from "@/lib/actions/rendering";
import { Example, QuestionData } from "@/app/types/types";
import { JsonValue } from "@prisma/client/runtime/library"; // Adjust the import based on your project

// Define a new type for the result object
interface FetchQuestionDataResponse {
  id: string;
  title: string;
  validatedExamples: Example[];
  Questions?: {
    id: string;
    contentId: string;
    question: string;
    examples: JsonValue; // Use JsonValue since the structure might not match Example[]
    constraints: string[];
    difficulty: string; // Allow any string for flexibility
    averageTime: string;
    testcases: JsonValue; // Use JsonValue since the structure is unknown
  } | null;
  // Add other fields if necessary
}

export default function Questionaire({ id }: { id: string }) {
  const [data, setData] = useState<QuestionData | null>(null);
  const [validatedExamples, setValidatedExamples] = useState<Example[]>([]);

  useEffect(() => {
    async function loadData() {
      const result: FetchQuestionDataResponse = await fetchQuestionData(id);
      if (result) {
        // Transform the result into QuestionData
        const transformedData: QuestionData = {
          id: result.id,
          title: result.title,
          Questions: result.Questions
            ? {
                question: result.Questions.question,
                examples: result.Questions.examples as Example[], // Cast to Example[]
                constraints: result.Questions.constraints,
                difficulty: result.Questions.difficulty as "Easy" | "Medium" | "Hard", // Cast to the expected type
                averageTime: result.Questions.averageTime,
              }
            : undefined,
        };
        setData(transformedData);
        setValidatedExamples(result.validatedExamples);
      } else {
        notFound();
      }
    }
    loadData();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
        <div className="space-y-8">
          {/* Question Header */}
          <div className="">
            <h1 className="text-4xl font-bold tracking-tight  text-primary">
              {data.title}
            </h1>
            <div className="flex gap-4 m-2">
              <Badge
                className={`${
                  data.Questions?.difficulty === "Easy"
                    ? "text-green-500"
                    : data.Questions?.difficulty === "Medium"
                    ? "text-yellow-500 "
                    : "text-red-500"
                } bg-gradient-to-br from-slate-950 to-zinc-800 font-thin items-center`}
              >
                {data.Questions?.difficulty}
              </Badge>
              <span className="text-sm tracking-tight font-thin text-muted-foreground  items-center">
                Average Time:{" "}
                <span className="font-bold  items-center">
                  {data.Questions?.averageTime}
                </span>
              </span>
            </div>
          </div>

          {/* Question */}
          <section className="flex flex-col gap-4 text-zinc-300">
            <p className="leading-7">
              {data.Questions?.question.split("\n").map((line: string, index: number) => (
                <React.Fragment key={index}>
                  {line}
                  <div className="h-1"></div>
                </React.Fragment>
              ))}
            </p>
            {/* Examples */}
            <div className="text-primary gap-2">
              {validatedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="border border-zinc-800 rounded-md m-2 bg-zinc-900/90 "
                >
                  <div className="">
                    <div className="text-sm py-1 px-2  bg-gradient-to-br from-zinc-800/70 to-zinc-900 border-b border-zinc-700/50">
                      <p className="text-zinc-200 font-extralight tracking-tight px-4 ">
                        Example - {idx + 1}
                      </p>
                    </div>
                    <div className="border-l-4 ml-2 border-zinc-900 p-2 flex flex-col px-5">
                      <span className="text-sm text-primary font-mono font-semibold">
                        Input:
                        <span className="text-zinc-400 font-normal tracking-wide">
                          {" "}
                          {ex.input}
                        </span>
                      </span>

                      <span className="text-sm text-primary font-semibold font-mono">
                        Output:
                        <span className="text-zinc-400 font-normal tracking-widest">
                          {" "}
                          {ex.output}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="text-zinc-300 text-muted-foreground">
              <h1 className="font-bold text-md text-primary ">Constraints:</h1>
              <div className="mx-2">
                {data?.Questions?.constraints.map((cons: string, idx: number) => (
                  <p key={idx} className="font-medium text-sm">
                    • {cons}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}