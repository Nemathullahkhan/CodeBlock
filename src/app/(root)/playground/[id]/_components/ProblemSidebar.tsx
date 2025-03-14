"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Codesandbox } from "lucide-react";

interface Program {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Topic {
  id: string;
  name: string;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  contents: Program[];
}

export function ProblemSidebar({
  isVisible,
  onClose,
  currentQuestionId
}: {
  isVisible: boolean;
  onClose: () => void;
  currentQuestionId:string
}) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };
  useEffect(() => {
    if (currentQuestionId) {
      setTopics((prevTopics) =>
        prevTopics.map((topic) => ({
          ...topic,
          contents: topic.contents.map((program) => ({
            ...program,
            isCompleted: program.id === currentQuestionId ? false : program.isCompleted,
          })),
        }))
      );
    }
  }, [currentQuestionId]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/topics");

        if (!response.ok) {
          throw new Error(`Failed to fetch topics: ${response.status}`);
        }

        const data = await response.json();

        const initialExpandState: Record<string, boolean> = {};
        data.forEach((topic: Topic) => {
          initialExpandState[topic.id] = true;
        });

        setExpandedTopics(initialExpandState);
        setTopics(data);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch topics");
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchProblem();
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

      <div
        className={`fixed left-0 top-0 h-full w-80 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 overflow-hidden ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar className="w-full ">
          <SidebarHeader>
            <div className=" flex flex-col  gap-2 border-b border-zinc-800">
              <div className="flex justify-start items-center gap-2">
                <Codesandbox className="w-10 h-10 text-primary/20" />
                <Link href="/home" className="text-primary hover:text-white">
                  CodeBlock
                </Link>
              </div>
            </div>
          </SidebarHeader>
          <span className="text-zinc-300/90 mx-4 text-2xl font-semibold  tracking-tight">
            Problem List
          </span>

          <SidebarContent className="overflow-y-auto  scrollbar-thin scrollbar-thumb-zinc-600  scrollbar-track-black ">
            <div className="py-2">
              {loading ? (
                <div className="px-6 py-4 text-zinc-400">Loading topics...</div>
              ) : error ? (
                <div className="px-6 py-4 text-red-400">Error: {error}</div>
              ) : topics.length === 0 ? (
                <div className="px-6 py-4 text-zinc-400">
                  No topics available
                </div>
              ) : (
                <div className="space-y-1">
                  {topics.map((topic) => (
                    <div key={topic.id} className="px-2">
                      <button
                        className="w-full flex items-center justify-between px-4 py-2 text-left text-zinc-400 hover:text-primary  rounded-md transition-colors"
                        onClick={() => toggleTopic(topic.id)}
                      >
                        <span className="font-medium">{topic.name}</span>
                        {expandedTopics[topic.id] ? (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      {expandedTopics[topic.id] &&
                        topic.contents &&
                        topic.contents.length > 0 && (
                          <div className="ml-4 pl-2 border-l border-zinc-800 mt-1 space-y-1">
                            {topic.contents.map((program) => (
                              <Link
                                key={program.id}
                                href={`/playground/${program.id}`}
                                className="block px-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/30 rounded-md transition-colors"
                                onClick={onClose}
                              >
                                <div className="flex items-center gap-2">
                                  {program.isCompleted && (
                                    <span className="text-green-500">✔</span> // Green tick for completed programs
                                  )}
                                  <span>{program.title}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
}
