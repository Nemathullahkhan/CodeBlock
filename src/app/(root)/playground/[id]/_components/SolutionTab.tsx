import Implementation from "@/app/(root)/(modules-topics)/topics/_components/Implementation";
import prisma from "@/lib/prisma";

export default async function SolutionTab({id}:{id:string}) {
  

    const solution = await prisma.content.findUnique({
        where:{id},
        include:{
            implementation:true
        }
    })
    return (
    <div>
        <Implementation implementation={{
                    intuition: solution?.implementation?.intuition ?? null,
                    approach: solution?.implementation?.approach ?? null,
                    code: Array.isArray(solution?.implementation?.code)
                      ? (solution.implementation.code as {
                          language: string;
                          code: string;
                        }[])
                      : null,
                  }}/>
    </div>
  );
}