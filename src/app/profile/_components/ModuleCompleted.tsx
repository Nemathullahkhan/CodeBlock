"use client";

import {
  getAllModules,
  getModuleCompleted,
} from "@/lib/actions/profileActions";
import { useEffect, useState } from "react";

export default function ModuleCompleted({ id }: { id: string | null }) {
  const [moduleCount, setModuleCount] = useState<number | null>(null);
  const [allmodule, setAllModule] = useState<number | null>(null);

  useEffect(() => {
    const fetchModuleCompleted = async () => {
      try {
        const count = await getModuleCompleted({ id: id || null });
        setModuleCount(count);
        const allCount = await getAllModules();
        setAllModule(allCount);
      } catch (err) {
        console.log("Some error", err);
        setModuleCount(null);
        setAllModule(null);
      }
    };
    fetchModuleCompleted();
  }, [id]);

  return (
    <div className="flex-col bg-zinc-900/30 rounded-md border-2 border-zinc-900 ">
      <h1 className="flex text-cyan-600 justify-center items-center text-md tracking-tight font-medium px-2">
        Modules Completed
      </h1>
      <p className=" font-extralight text-xl tracking-tighter text-primary text-center mt-1">
        {moduleCount} {"/ "}
        {allmodule}
      </p>
    </div>
  );
}
