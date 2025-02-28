"use client";
import { getModules } from "@/lib/actions/moduleActions";
import { useEffect, useState } from "react";
import ModuleCard from "../components/ModuleCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import CreationMod from "../components/CreationMod";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function Page() {
  const [modules, setModules] = useState<ModuleType[] | null>(null);

  useEffect(() => {
    const getAllModules = async () => {
      const getSubject = await getModules();
      setModules(getSubject);
    };
    getAllModules();
  }, []);

  return (
    <>
      {/* Todo - design the home page */}
      <div className="mx-10"><CreationMod/></div>

      {modules === null ? (
        Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="max-w-md h-16 rounded-lg bg-zinc-900/90" />
        ))
      ) : (
        <>
          {modules?.map((mod) => (
            <div className="max-w-md text-center" key={mod.id}>
              <Link href={`/module/${mod.id}`}>
                <ModuleCard {...mod} />
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}
