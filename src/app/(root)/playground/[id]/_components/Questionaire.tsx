// "use server";

// import { Badge } from "@/components/ui/badge";
// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import { z } from "zod";

// // Define the schema for an example
// const ExampleSchema = z.object({
//   input: z.string(),
//   output: z.string(),
// });

// // Infer the type from the schema
// type Example = z.infer<typeof ExampleSchema>;

// export default async function Questionaire({ id }: { id: string }) {
//   const data = await prisma.content.findUnique({
//     where: { id },
//     include: {
//       Questions: true,
//     },
//   });

//   if (!data) return notFound();

//   // Validate and parse the examples data
//   const examples = data.Questions?.examples;
//   let validatedExamples: Example[] = [];

//   if (examples && Array.isArray(examples)) {
//     try {
//       validatedExamples = examples.map((ex) => ExampleSchema.parse(ex));
//     } catch (error) {
//       console.error("Invalid examples data:", error);
//     }
//   }
  
 

//   return (
//     <div className="min-h-screen bg-zinc-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
//         <div className="space-y-8">
//           {/*Question Header */}
//           <div className="">
//             <h1 className="text-4xl font-bold tracking-tight text-primary">
//               {data.title}
//             </h1>
//             {/* depending on the difficulty set the colour */}
//             <div className="flex gap-4 m-2">
//               <Badge
//                 className={`${
//                   data.Questions?.difficulty === "Easy"
//                     ? "text-green-500"
//                     : data.Questions?.difficulty === "Medium"
//                     ? "text-yellow-500 "
//                     : "text-red-500" 
//                 } bg-gradient-to-br from-slate-950 to-zinc-800 font-thin items-center`}
//               >
//                 {data.Questions?.difficulty}
//               </Badge>
//               <span className="text-sm tracking-tight font-thin text-muted-foreground  items-center">
//                 Average Time:{" "}
//                 <span className="font-bold  items-center">
//                   {data.Questions?.averageTime}
//                 </span>
//               </span>
//             </div>
//           </div>

//           {/* Question */}
//           <section className="flex flex-col gap-4 text-zinc-300">
//             <p className="">{data.Questions?.question}</p>
//             {/* Examples */}
//             <div className="text-primary gap-2">
//               {validatedExamples.map((ex, idx) => (
//                 <div key={idx} className="border rounded-md m-2 bg-zinc-900/90 ">

//                   <div className="">

//                   <div className="text-sm py-1 px-2  bg-gradient-to-br from-zinc-800/70 to-zinc-900 border-b border-zinc-700/50 ">
//                   <p className="text-zinc-200 font-extralight tracking-tight px-4 ">
//                     Example - {idx + 1}
//                   </p>
//                   </div>
//                   <div className="border-l-4 ml-2 border-zinc-900 p-2 flex flex-col px-5">
//                     <span className="text-sm text-primary m-2 font-mono font-semibold">Input:<span className="text-zinc-400 font-normal tracking-wide"> {ex.input}</span></span>

//                     <span className="text-sm text-primary font-semibold font-mono">Output:<span className="text-zinc-400 font-normal tracking-widest"> {ex.output}</span></span>
//                   </div>
                  
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* Constraints */}
//             <div className="text-zinc-300 text-muted-foreground">
//               <h1 className="font-bold text-md text-muted-foreground ">Constraints:</h1>
//               <div className="m-2">
//               {data?.Questions?.constraints.map((cons,idx)=>(
//                 <p key = {idx} className=""> {cons}</p>
//               ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { fetchQuestionData } from "@/lib/actions/rendering";

export default function Questionaire({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [validatedExamples, setValidatedExamples] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchQuestionData(id);
      if (result) {
        setData(result);
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
            <h1 className="text-4xl font-bold tracking-tight text-primary">
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
            <p className="">{data.Questions?.question}</p>
            {/* Examples */}
            <div className="text-primary gap-2">
              {validatedExamples.map((ex, idx) => (
                <div key={idx} className="border rounded-md m-2 bg-zinc-900/90 ">
                  <div className="">
                    <div className="text-sm py-1 px-2  bg-gradient-to-br from-zinc-800/70 to-zinc-900 border-b border-zinc-700/50 ">
                      <p className="text-zinc-200 font-extralight tracking-tight px-4 ">
                        Example - {idx + 1}
                      </p>
                    </div>
                    <div className="border-l-4 ml-2 border-zinc-900 p-2 flex flex-col px-5">
                      <span className="text-sm text-primary m-2 font-mono font-semibold">
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
              <h1 className="font-bold text-md text-muted-foreground ">
                Constraints:
              </h1>
              <div className="m-2">
                {data?.Questions?.constraints.map((cons, idx) => (
                  <p key={idx} className="">
                    {" "}
                    {cons}
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