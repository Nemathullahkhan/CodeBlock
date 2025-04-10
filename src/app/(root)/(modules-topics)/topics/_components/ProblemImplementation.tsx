// // import { Button } from "@/components/ui/button";
// // import { CheckCircle, Circle } from "lucide-react";
// // import Link from "next/link";

// // interface UserProgress {
// //   id: string;
// //   userId: string;
// //   contentId: string;
// //   completed: boolean;
// //   attempts: number;
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // interface ProblemImplementationProps {
// //   id: string;
// //   programName: string;
// //   completedPrograms: UserProgress[] | undefined;
// // }

// // export default function ProblemImplementation({
// //   id,
// //   programName,
// //   completedPrograms,
// // }: ProblemImplementationProps) {
// //   // Check if the program is completed
// //   const isCompleted = completedPrograms?.some((program) => program.completed);

// //   return (
// //     <section id="problems" className="space-y-6">
// //       <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
// //         Problem and Implementation
// //       </h1>
// //       <p className="mt-4 text-zinc-400">
// //         Utilize the online IDE to practice and implement the solution for this
// //         problem. Try the{" "}
// //         <Link
// //           href={`/playground`}
// //           className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
// //         >
// //           Playground
// //         </Link>{" "}
// //         to experiment with the code.
// //       </p>

// //       <div className="mt-6">
// //         {isCompleted ? (
// //           <>
// //             <div className="flex ">
// //               <Button
// //                 variant={"ghost"}
// //                 className="bg-gradient-to-tl from-emerald-950 to-emerald-600"
// //               >
// //                 <CheckCircle className="w-5 h-5" />
// //                 <p className="font-medium">Completed: {programName}</p>
// //               </Button>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <Link
// //               href={`/playground/${id}`}
// //               className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
// //             >
// //               <Circle className="w-5 h-5" />
// //               <span className="font-medium">
// //                 Solve this question: {programName}
// //               </span>
// //             </Link>
// //           </>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }


// import { Button } from "@/components/ui/button";
// import { CheckCircle, Circle } from "lucide-react";
// import Link from "next/link";

// interface UserProgress {
//   id: string;
//   userId: string;
//   contentId: string;
//   completed: boolean;
//   attempts: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ProblemImplementationProps {
//   id: string;
//   programName: string;
//   completedPrograms: UserProgress[] | undefined;
//   nextContentId?: string; // Add nextContentId to props
// }

// export default function ProblemImplementation({
//   id,
//   programName,
//   completedPrograms,
//   nextContentId,
// }: ProblemImplementationProps) {
//   // Check if the program is completed
//   const isCompleted = completedPrograms?.some((program) => program.completed);

//   return (
//     <section id="problems" className="space-y-6">
//       <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
//         Problem and Implementation
//       </h1>
//       <p className="mt-4 text-zinc-400">
//         Utilize the online IDE to practice and implement the solution for this
//         problem. Try the{" "}
//         <Link
//           href={`/playground`}
//           className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
//         >
//           Playground
//         </Link>{" "}
//         to experiment with the code.
//       </p>

//       <div className="mt-6">
//         {isCompleted ? (
//           <>
//             <div className="flex items-center gap-4">
//               <Button
//                 variant={"ghost"}
//                 className="bg-gradient-to-tl from-emerald-950 to-emerald-600"
//               >
//                 <CheckCircle className="w-5 h-5" />
//                 <p className="font-medium">Completed: {programName}</p>
//               </Button>
//               dfhkakjfh

//               {nextContentId && (
//                 <Link href={`/topic/${nextContentId}`}>
//                   <Button variant={"link"}>Next</Button>
//                 </Link>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             <Link
//               href={`/playground/${id}`}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
//             >
//               <Circle className="w-5 h-5" />
//               <span className="font-medium">
//                 Solve this question: {programName}
//               </span>
//             </Link>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }


import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  completed: boolean;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProblemImplementationProps {
  id: string;
  programName: string;
  completedPrograms: UserProgress[] | undefined;
  nextContentId?: string; // Add nextContentId to props
}

export default function ProblemImplementation({
  id,
  programName,
  completedPrograms,
  nextContentId,
}: ProblemImplementationProps) {
  // Check if the program is completed
  const isCompleted = completedPrograms?.some((program) => program.completed);

  return (
    <section id="problems" className="space-y-6">
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
        Problem and Implementation
      </h1>
      <p className="mt-4 text-zinc-400">
        Utilize the online IDE to practice and implement the solution for this
        problem. Try the{" "}
        <Link
          href={`/playground`}
          className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
        >
          Playground
        </Link>{" "}
        to experiment with the code.
      </p>

      <div className="mt-6">
        {isCompleted ? (
          <>
            <div className="flex items-center gap-4">
              <Link
                href={`/playground/${id}`}>

                <Button
                  variant={"ghost"}
                  className="bg-gradient-to-tl from-emerald-950 to-emerald-600"
                >
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium">Completed: {programName}</p>
                </Button>
              </Link>

              {/* Render "Next" button only if nextContentId exists */}
              {nextContentId ? (
                <Link href={`/topics/${nextContentId}`}>
                  <Button variant={"link"}>Next</Button>
                </Link>
              ) : (
                <p className="text-gray-400">No more contents in this topic.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/playground/${id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
            >
              <Circle className="w-5 h-5" />
              <span className="font-medium">
                Solve this question: {programName}
              </span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}