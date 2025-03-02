"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function ProgressBar({ id }: { id: string }) {
  const [progress, setProgress] = useState<number | null>(null);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/progress/${id}`);
      const data = await response.json();
      setProgress(data.progress ?? 0); // Use 0 as fallback if progress is null/undefined
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      setProgress(0); // Fallback to 0 in case of an error
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [id]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Course Progress</span>
        <span className="text-primary font-medium">
          {progress !== null ? progress.toFixed(2) : "0.00"}%
        </span>
      </div>
      <Progress value={progress ?? 0} className="h-2" />
    </div>
  );
}