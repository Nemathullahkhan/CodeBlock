"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function ModuleCard({ id, name, description }: ModuleType) {
  const [progress, setProgress] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/progress/${id}`);
        const data = await res.json();
        if (data.progress) {
          const progressValue = Number.parseFloat(data.progress);
          if (progressValue > 0) setProgress(progressValue);
        }
      } catch (error) {
        console.error("Failed to load progress", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [id]);

  const estimatedHours = Math.floor(Math.random() * 10) + 2;

  const lessonCount = Math.floor(Math.random() * 12) + 3;

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden bg-zinc-900/80 border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] group relative">
      {/* Decorative top gradient bar */}
      <div className={`h-1.5 w-full bg-zinc-500/20`}></div>

      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full border border-primary/30"></div>
        <div className="absolute right-8 top-20 w-20 h-20 rounded-full border border-primary/30"></div>
        <div className="absolute right-20 bottom-12 w-32 h-32 rounded-full border border-primary/30"></div>
      </div>

      <div className="flex items-start p-4">
        <div className="flex-grow">
          <CardHeader className="p-0 mb-2 relative">
            <div className="flex-col justify-between items-start relative">
              {progress !== null && progress > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute top-0 right-0 bg-emerald-600  hover:bg-emerald-700 text-xs font-medium backdrop-blur-2xl  rounded-md  "
                >
                  In Progress
                </Badge>
              )}
              <CardTitle className="text-2xl font-semibold text-white">
                {name}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="text-zinc-400 text-sm px-3 mb-2">
            <CardDescription className="line-clamp-3 min-h-[10rem]">
              {description ||
                "Explore this comprehensive module to enhance your skills and knowledge."}
            </CardDescription>
          </CardContent>
        </div>
      </div>

      <CardFooter className="mt-auto border-t border-zinc-800/50 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full text-xs text-zinc-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{estimatedHours} hours</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{lessonCount} lessons</span>
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-5 w-full rounded-lg bg-zinc-800" />
        ) : progress !== null && progress > 0 ? (
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Progress</span>
              <span className="text-green-400 text-sm font-semibold">
                {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-1.5 [&>div]:bg-primary  " />
          </div>
        ) : (
          <div className="w-full text-center">
            <span className="text-xs text-zinc-500 hover:text-primary transition-colors">
              Start this module
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
