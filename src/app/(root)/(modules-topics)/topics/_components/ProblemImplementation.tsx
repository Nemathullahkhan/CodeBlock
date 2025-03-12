// import { CheckCircle, Circle } from "lucide-react";
// import Link from "next/link";

// export default function ProblemImplementation({ id,completedPrograms}: { id: string, completedPrograms:boolean }) {
//   return (
//     <section id="problems" className="space-y-6">
//       <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">Problem and Implmentation</h1>
//       <p className="mt-10 text-zinc-500">Utilize the online IDE to practice and implement the solution for this problem. Try
//         <Link href = {`/playground`} className="text-blue-500 mx-2 hover:border-b-2 hover:border-blue-300">

//         Playground
//         </Link>
//       </p>
//       <Link
//         href={`/playground/${id}`}
//         className="block mt-6 text-blue-500 hover:text-blue-400"
//       >
//         {completedPrograms === true ? (
//             <div className="">
//                 <CheckCircle className="w-4 h-4"/>
//             </div>
//         )
//             : (
//                 <div className="">
//                     <Circle className = "w-4 h-4"/>
//                 </div>
//             )}
//             Questions
//       </Link>
//     </section>
//   );
// }

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
  programName:string;
  completedPrograms: UserProgress[] | undefined;
}

export default function ProblemImplementation({
  id,
  programName,
  completedPrograms,
}: ProblemImplementationProps) {
  // Check if the program is completed
  const isCompleted = completedPrograms?.some((program) => program.completed);

  return (
    // <section id="problems" className="space-y-6">
    //   <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
    //     Problem and Implementation
    //   </h1>
    //   <p className="mt-10 text-zinc-500">
    //     Utilize the online IDE to practice and implement the solution for this problem. Try
    //     <Link
    //       href={`/playground`}
    //       className="text-blue-500 mx-2 hover:border-b-2 hover:border-blue-300"
    //     >
    //       Playground
    //     </Link>
    //   </p>
    //   <Link
    //     href={`/playground/${id}`}
    //     className="block mt-6 text-blue-500 hover:text-blue-400"
    //   >
    //     {isCompleted ? (
    //       <div className="flex items-center gap-2">
    //         <CheckCircle className="w-4 h-4" />
    //         <span>Completed</span>
    //       </div>
    //     ) : (
    //       <div className="flex items-center gap-2">
    //         <Circle className="w-4 h-4" />
    //         <span>{completedPrograms?.map((program,idx)=>(
    //             <p key = {idx}>{programName}</p>
    //         ))}</span>
    //       </div>
    //     )}
    //   </Link>
    // </section>

    <section id="problems" className="space-y-6">
  <h1 className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
    Problem and Implementation 
  </h1>
  <p className="mt-4 text-zinc-400">
    Utilize the online IDE to practice and implement the solution for this problem. Try the{" "}
    <Link
      href={`/playground`}
      className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
    >
      Playground
    </Link>{" "}
    to experiment with the code.
  </p>

  <div className="mt-6">

    <Link
      href={`/playground/${id}`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
    >
      {isCompleted ? (
        <>
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium">Completed: {programName}</p>
        </>
      ) : (
        <>
          <Circle className="w-5 h-5" />
          <span className="font-medium">
            Solve this question:{" "} {programName}
          </span>
        </>
      )}
    </Link>
  </div>

  {completedPrograms && completedPrograms.length > 0 && (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-zinc-400">Your Progress:</p>
      <div className="flex flex-wrap gap-2">
        {completedPrograms.map((program, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{programName}</span>
          </div>
        ))}
      </div>
    </div>
  )}
</section>
  );
}