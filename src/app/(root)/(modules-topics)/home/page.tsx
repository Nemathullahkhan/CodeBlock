

"use client";
import { getModules } from "@/lib/actions/moduleActions";
import { useEffect, useState } from "react";
import ModuleCard from "../components/ModuleCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import CreationMod from "../components/CreationMod";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function Page() {
  const [modules, setModules] = useState<ModuleType[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getAllModules = async () => {
      const getSubject = await getModules();
      setModules(getSubject);
    };
    getAllModules();
  }, []);

  // return (
  //   <>
  //     {session && session.user && (
  //       <div className="w-full mx-auto my-8 px-6">

  //          <div className="mx-10"><CreationMod/></div>
  //         {/* Welcome Message */}
  //         <div className="flex justify-center items-center py-5">
  //           <span className="text-2xl tracking-tight font-semibold">
  //             Welcome,{" "}
  //             <span className="font-thin bg-gradient-to-br from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
  //               {session.user.firstName} {session.user.lastName}
  //             </span>
  //           </span>
  //         </div>

  //         {/* Module Grid */}
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
  //           {modules === null
  //             ? Array.from({ length: 3 }, (_, index) => (
  //                 <Skeleton key={index} className="h-40 rounded-lg bg-zinc-900/90" />
  //               ))
  //             : modules.map((mod) => (
  //                 <Link href={`/module/${mod.id}`} key={mod.id}>
  //                   <ModuleCard {...mod}  />
  //                 </Link>
  //               ))} 
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
    <h1>Welcome</h1>
    <div className=""><CreationMod/></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {modules === null
              ? Array.from({ length: 3 }, (_, index) => (
                  <Skeleton key={index} className="h-40 rounded-lg bg-zinc-900/90" />
                ))
              : modules.map((mod) => (
                  <Link href={`/module/${mod.id}`} key={mod.id}>
                    <ModuleCard {...mod}  />
                  </Link>
                ))} 
          </div>
    </>
  )
}

