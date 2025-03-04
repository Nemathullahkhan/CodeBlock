// import Questionaire from "./_components/Questionaire";
// import { Clock } from "lucide-react";
// import QuestionEditorPanel from "./_components/QuestionEditor";
// import QuestionOutputPanel from "./_components/QuestionOutputPanel";
// import RandomComponentForTesting from "./_components/RandomComponentForTesting";
// import prisma from "@/lib/prisma";
// import { Button } from "@/components/ui/button";
// import SubmitButton from "./_components/SubmitButton";

// export default async function Layout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   const { id } = params;
//   const name = await prisma.content.findUnique({
//     where: { id },
//   });
//   const programName = name?.title || null;

//   return (
//     <div className="h-screen  p-4">
//       <div className="max-w-[1800px] mx-auto p-4 h-full">
//         <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]  h-full">
//           <div>
//             {/* Header */}
//             {/* Todo */}
//             <div className="flex gap-4">
//               <div className="flex gap-2">
//                 <Clock />
//                 <span>Problem</span>
//               </div>

//               <div className="flex gap-2">
//                 <Clock />
//                 <span>Editorial</span>
//               </div>

//               {/* Submit Button */}
//               <SubmitButton id ={id}/>
//             </div>
//             <Questionaire id={id} /> {/* ✅ Renders Server Component Fast */}
//           </div>
//           <div>
//             <QuestionEditorPanel programName={programName} id={id} />
//             <QuestionOutputPanel />
//             <RandomComponentForTesting />
//           </div>
//         </div>
//         {children} {/* Render the actual page */}
//       </div>
//     </div>
//   );
// }

import Questionaire from "./_components/Questionaire";
import { BookOpen, Code, FileCode } from "lucide-react";
import QuestionEditorPanel from "./_components/QuestionEditor";
import QuestionOutputPanel from "./_components/QuestionOutputPanel";
import prisma from "@/lib/prisma";
import SubmitButton from "./_components/SubmitButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionRunButton from "./_components/QuestionRunButton";
import SolutionTab from "./_components/SolutionTab";
import TestCaseComponent from "./_components/RandomComponentForTesting";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const content = await prisma.content.findUnique({
    where: { id },
    include:{
      Questions:true,
      implementation:true,
    }
  });
  const programName = content?.title || null;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1800px] mx-auto p-4 h-full">
        <div className="w-full flex items-center justify-between px-4 py-2 bg-zinc-950 ">
          {/* Buttons (Run + Submit) */}
          <div className="flex items-center gap-2 bg-stone-800/70 p-1 mx-auto rounded-lg">
            {/* Run Button */}
            <QuestionRunButton id={id} />

            {/* Submit Button (No Extra Button Wrapper Needed) */}
            <SubmitButton id={id} />
          </div>
          {/* <div className="">
            
          </div> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-4 h-full">
          <div className="bg-black rounded-xl border-2 border-zinc-900 overflow-hidden">
            {/* Header */}

            <div className="border-b border-zinc-500 ">
              <Tabs defaultValue="problem" className="w-full">
                <TabsList className="bg-zinc-900 border border-[#30363d]">
                  <TabsTrigger
                    value="problem"
                    className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
                  >
                    <FileCode className="w-4 h-4 mr-2" />
                    Problem
                  </TabsTrigger>
                  <TabsTrigger
                    value="editorial"
                    className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Solution
                  </TabsTrigger>
                  <TabsTrigger
                    value="submissions"
                    className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Submissions
                  </TabsTrigger>
                  <TabsTrigger
                    value="testcases"
                    className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Submissions
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="problem" className="mt-0">
                  <div className="p-4">
                    <Questionaire id={id} />
                  </div>
                </TabsContent>
                <TabsContent value="editorial" className="mt-0">
                  <div className="p-4 text-gray-300">
                    <p>
                      <SolutionTab id = {id}/>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="submissions" className="mt-0">
                  <div className="p-4 text-gray-300">
                    <h3 className="text-xl font-bold mb-4">Your Submissions</h3>
                    <div className="bg-black rounded-md p-4 border border-[#30363d]">
                      <p className="text-center text-gray-400">
                        No submissions yet
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="testcases" className="mt-0">
                <TestCaseComponent id = {id} />                  
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="space-y-4">
            <QuestionEditorPanel programName={programName} id={id} />
            <QuestionOutputPanel questionId={id}/>
          </div>
        </div>
        {children} {/* Render the actual page */}
      </div>
    </div>
  );
}
