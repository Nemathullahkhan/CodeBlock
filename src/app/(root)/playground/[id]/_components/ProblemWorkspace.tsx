// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookOpen, Code, FileCode } from "lucide-react";
// import { ProblemSidebar } from "./ProblemSidebar";
// import QuestionRunButton from "./QuestionRunButton";
// import SubmitButton from "./SubmitButton";
// import Questionaire from "./Questionaire";
// import SolutionTab from "./SolutionTab";
// import QuestionEditorPanel from "./QuestionEditor";
// import QuestionOutputPanel from "./QuestionOutputPanel";
// interface ProblemWorkspaceProps {
//   id: string;
//   programName: string | null;
// }

// export default function ProblemWorkspace({ id, programName }: ProblemWorkspaceProps) {
//   return (
//     <div className="min-h-screen bg-black">
//       <div className="max-w-[1800px] mx-auto p-4 h-full">
//         <div className="w-full flex items-center justify-between px-4 py-2 bg-zinc-950 ">
//           {/* Buttons (Run + Submit) */}
//           <ProblemSidebar id={id} />

//           <div className="flex items-center gap-2 bg-stone-800/70 p-1 mx-auto rounded-lg">
//             {/* Run Button */}
//             <QuestionRunButton id={id} programName={programName} />

//             {/* Submit Button (No Extra Button Wrapper Needed) */}
//             <SubmitButton id={id} />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-4 h-full">
//           <div className="bg-black rounded-xl border-2 border-zinc-900 overflow-hidden">
//             {/* Header */}

//             <div className="border-b border-zinc-500 ">
//               <Tabs defaultValue="problem" className="w-full">
//                 <TabsList className="bg-zinc-900 border border-[#30363d]">
//                   <TabsTrigger
//                     value="problem"
//                     className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
//                   >
//                     <FileCode className="w-4 h-4 mr-2" />
//                     Problem
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="editorial"
//                     className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
//                   >
//                     <BookOpen className="w-4 h-4 mr-2" />
//                     Solution
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="submissions"
//                     className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
//                   >
//                     <Code className="w-4 h-4 mr-2" />
//                     Submissions
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="testcases"
//                     className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black"
//                   >
//                     <Code className="w-4 h-4 mr-2" />
//                     Submissions
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="problem" className="mt-0">
//                   <div className="p-4">
//                     <Questionaire id={id} />
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="editorial" className="mt-0">
//                   <div className="p-4 text-gray-300">
//                     <SolutionTab id={id} />
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="submissions" className="mt-0">
//                   <div className="p-4 text-gray-300">
//                     <h3 className="text-xl font-bold mb-4">Your Submissions</h3>
//                     <div className="bg-black rounded-md p-4 border border-[#30363d]">
//                       <p className="text-center text-gray-400">
//                         No submissions yet
//                       </p>
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <QuestionEditorPanel programName={programName} id={id} />
//             <QuestionOutputPanel questionId={id} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
