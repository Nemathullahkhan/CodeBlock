"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Circle,
  Codesandbox,
  GraduationCap,
  Layout,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StarterLinks from "../_components/StarterLinks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getModuleData } from "@/lib/actions/moduleActions";
import UserBadge from "@/app/(root)/playground/[id]/_components/UserBadge";

// Define types for the data structures
type Content = {
  id: string;
  title: string;
};

type Topic = {
  id: string;
  name: string;
  description?: string;
  contents: Content[];
};

type CourseModule = {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
};

type UserProgress = {
  contentId: string;
  completed: boolean;
};

export default function ModulePage( ) {
  const params = useParams();
  const moduleId = params.id as string;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [moduleData, setModuleData] = useState<{
    courseModule: CourseModule | null;
    totalPrograms: number;
    userProgress: UserProgress[];
    progress: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Only fetch data if we have a session and an ID
    if (status === "authenticated" && session?.user?.id && moduleId) {
      const fetchData = async () => {
        try {
          // Ensure session.user.id is defined
          if (!session.user?.id) {
            console.error("User ID is undefined");
            return;
          }

          // Fetch data and assert the type
          const data = await getModuleData(moduleId, session.user.id);
          setModuleData(data);
        } catch (error) {
          console.error("Error fetching module data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      // If session.user.id is undefined, set loading to false
      setLoading(false);
    }
  }, [moduleId, session, status, router]);

  if (loading || !moduleData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-primary">Loading course content...</p>
        </div>
      </div>
    );
  }

  // If module is not found
  if (!moduleData.courseModule) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-primary">Module not found</p>
          <Link href="/home" className="text-sm text-muted-foreground hover:text-primary">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const { courseModule, totalPrograms, userProgress, progress } = moduleData;

  // Create a map of content IDs to completion status
  const userProgressMap = new Map(
    userProgress.map((up) => [up.contentId, up.completed])
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Rest of the component */}
      <div className="w-[1400px] sticky mx-auto flex justify-center">
        <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800 m-3 w-full">
          {/* Left-aligned Codesandbox */}
          <div className="flex justify-start items-center">
            <Link href="/home" className="flex items-center gap-2">
              <Codesandbox />
              <span className="text-lg">CodeBlock</span>
            </Link>
          </div>

          {/* Right-aligned UserBadge */}
          <div className="flex justify-end items-center">
            <UserBadge />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <section className="space-y-6">
          <StarterLinks name={courseModule.name} />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-primary">
                {courseModule.name}
              </h1>
            </div>
            <p className="text-md text-muted-foreground max-w-3xl">
              {courseModule.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              <span className="text-sm text-zinc-100">
                <span className="text-primary font-semibold">
                  {courseModule.topics?.length}
                </span>{" "}
                Topics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-zinc-100">
                <span className="text-primary font-semibold">
                  {totalPrograms}
                </span>{" "}
                Programs
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mx-10">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="text-primary font-medium">
                <span
                  className={`text-xl font-semibold ${
                    progress === 0 ? "text-zinc-300" : "text-emerald-500"
                  }`}
                >
                  {progress}%
                </span>
              </span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="mt-10">
          <Card className="border-none bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Course Curriculum</CardTitle>
              </div>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {courseModule.topics.map((topic, topicIdx) => (
                    <div
                      key={topic.id}
                      className="group rounded-lg border border-zinc-700 bg-card/50 transition-colors hover:bg-card"
                    >
                      {/* Topic Header */}
                      <div className="p-4 flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {topicIdx + 1}
                        </div>
                        <div className="space-y-1">
                          <h2 className="font-semibold tracking-tight text-xl">
                            {topic.name}
                          </h2>
                          {topic.description && (
                            <p className="text-sm text-muted-foreground mr-10 ml-4">
                              {topic.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="ml-auto border-zinc-700 border ">
                          {topic.contents.length} Lessons
                        </Badge>
                      </div>

                      {/* Content List */}
                      <div className="border-t border-zinc-700 bg-muted/50">
                        {topic.contents.map((content, idx) => {
                          const isCompleted =
                            userProgressMap.get(content.id) || false;

                          return (
                            <Link
                              key={idx}
                              href={`/topics/${content.id}`}
                              className="flex items-center gap-2 p-2 px-10 transition-colors hover:bg-muted border-b-2 border-zinc-400/10"
                            >
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                {content.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
