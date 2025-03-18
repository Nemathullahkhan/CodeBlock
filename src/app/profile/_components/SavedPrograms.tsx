"use client";

import { getSavedPrograms } from "@/lib/actions/profileActions";
import { useEffect, useState } from "react";

export default function SavedPrograms({ id }: { id: string | null }) {
  const [programCount, setProgramCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgramsCount = async () => {
      try {
        const count = await getSavedPrograms({ id: id || null });
        setProgramCount(count);
      } catch (err) {
        console.error("Error fetching program count:", err);
        setProgramCount(null);
      }
    };
    fetchProgramsCount();
  }, [id]);
  return (
    <div className="flex-col bg-zinc-900/30 rounded-md border-2 border-zinc-900 ">
      <h1 className="flex text-emerald-600 justify-center items-center text-md tracking-tight font-medium">Saved Programs</h1>
      <p className=" font-medium text-lg tracking-tighter text-primary text-center mt-1">{programCount}</p>
    </div>
  );
}
