

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
  return (
    <>
    <h1>Welcome</h1>
    {/* <div className=""><CreationMod/></div> */}
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

