

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";

// interface ModuleType {
//   id: string;
//   name?: string;
//   description?: string;
// }

// export default  function ModuleCard({ name, description }: ModuleType) {
//   return (
//     <Card className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-zinc-950/30 to-zinc-600/20 border border-x-transparent hover:shadow-lg transition">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-xl font-semibold text-white">{name}</CardTitle>
//       </CardHeader>

//       <CardContent className="text-gray-400 text-sm mt-2">
//         <CardDescription>{description}</CardDescription>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function ModuleCard({ id, name, description }: ModuleType) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress/${id}`); // ✅ Call API using module ID
        const data = await res.json();
        if (data.progress) {
          const progressValue = parseFloat(data.progress);
          if (progressValue > 0) setProgress(progressValue); // ✅ Only set progress if it's > 0
        }
      } catch (error) {
        console.error("Failed to load progress", error);
      }
    };

    fetchProgress();
  }, [id]);

  return (
    <Card className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-zinc-950/30 to-zinc-600/20 border border-x-transparent hover:shadow-lg transition hover:scale-110">
      <div className="text-center  border-2 border-double h-[200px] ">SOMEIMGAE</div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-400 text-sm mt-2">
        <CardDescription>{description}</CardDescription>
      </CardContent>

      {/* ✅ Only show progress bar if progress has started */}
      {progress === null ?
      (
        <Skeleton  className="h-10 rounded-lg bg-zinc-900/90" />
      ): progress > 0 && (
        <div className="mt-4 mx-5">
          <p className="text-xs text-gray-300 mb-1">Progress: <span className="font-semibold text-xl">{progress}%</span></p>
          <Progress value={progress} className="h-1 w-40 [&>div]:bg-green-500" />
        </div>
      )}
    </Card>
  );
}
