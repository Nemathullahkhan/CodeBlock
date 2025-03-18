"use client";

import { getCreatedFolder } from "@/lib/actions/profileActions";
import { useEffect, useState } from "react";

export default function CreatedFolders({ id }: { id: string | null }) {
  const [folderCount, setFolderCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchFolderCount = async () => {
      try {
        const count = await getCreatedFolder({ id: id || null });
        setFolderCount(count);
      } catch (err) {
        console.log("Error occured in the CreatedFolders Controller", err);
        setFolderCount(null);
      }
    };
    fetchFolderCount();
  }, [id]);

  return (
    <div className="flex-col bg-zinc-900/30 rounded-md border-2 border-zinc-900 ">
      <h1 className="flex text-zinc-400 justify-center items-center text-md tracking-tight font-medium">
        Created Folders
      </h1>
      <p className="font-medium text-lg tracking-tighter text-primary text-center mt-1">{folderCount}</p>
    </div>
  );
}
