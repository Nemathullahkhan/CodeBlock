// "use server"

// import Implementation from "@/app/(root)/(modules-topics)/topics/_components/Implementation";
// import prisma from "@/lib/prisma";

// export default async function SolutionTab({id}:{id:string}) {
  

//     const solution = await prisma.content.findUnique({
//         where:{id},
//         include:{
//             implementation:true
//         }
//     })
//     return (
//     <div>
//         <Implementation implementation={{
//                     intuition: solution?.implementation?.intuition ?? null,
//                     approach: solution?.implementation?.approach ?? null,
//                     code: Array.isArray(solution?.implementation?.code)
//                       ? (solution.implementation.code as {
//                           language: string;
//                           code: string;
//                         }[])
//                       : null,
//                   }}/>
//     </div>
//   );
// }

"use client"; // Mark as Client Component

import { useEffect, useState } from "react";
import Implementation from "@/app/(root)/(modules-topics)/topics/_components/Implementation";
import { fetchSolution } from "@/lib/actions/rendering";

export default function SolutionTab({ id }: { id: string }) {
  const [solution, setSolution] = useState<{
    intuition: string | null;
    approach: string | null;
    code: { language: string; code: string }[] | null;
  } | null>(null);

  useEffect(() => {
    // Fetch solution data using the server action
    async function loadSolution() {
      const data = await fetchSolution(id);
      setSolution(data);
    }

    loadSolution();
  }, [id]);

  if (!solution) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div>
      <Implementation implementation={solution} />
    </div>
  );
}