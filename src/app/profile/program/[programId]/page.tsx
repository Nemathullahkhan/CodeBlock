"use client";

import { getProgramData } from "@/lib/actions/profileActions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Code,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Separator } from "@/components/ui/separator";

// Define the Program type based on your Prisma model
interface Program {
  id: string;
  foldersId: string;
  userId: string;
  name: string;
  description: string | null;
  code: string | null;
  approach: string | null;
  createdAt: Date;
  updatedAt: Date;
  tc: string | null;
  sc: string | null;
}

export default function ProgramPage() {
  const params = useParams();
  const programId = params.programId as string;

  const [program, setProgram] = useState<Program | null>(null); // Use the Program type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      if (!programId) {
        setError("Program ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await getProgramData({ programId });
        setProgram(data);
      } catch (err) {
        setError("Failed to fetch program data. Please try again later."
        );
        console.error("Error fetching program:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, [programId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[60vh] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{error}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/profile" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Go back to profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">No Program Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The program you are looking for does not exist.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/profile" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Go back to profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl mt-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/profile" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back
          </Link>
        </Button>
        <div className="mb-4 flex items-center justify-between px-20 pt-4">
          <div className="flex items-center gap-2">
            <div className="">
              <h3 className="text-zinc-400">Program Name </h3>
              <h1 className="text-5xl tracking-tight font-bold">
                {" "}
                {program.name}
              </h1>
            </div>
          </div>
          <div className="flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} />
              Created: {new Date(program.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} />
              Updated: {new Date(program.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mx-24 mt-4 mb-2">
          <h1 className="text-lg  text-zinc-400  tracking-tight  font-extralight">
            {" "}
            Description
          </h1>
          <p className="mx-2 text-sm">{program.description} </p>
        </div>

        <Separator className="max-w-5xl align-middle mx-32 mt-4" />

        <Tabs defaultValue="approach" className="max-w-7xl mx-20 mt-3">
          <TabsList className="flex mb-4 bg-black max-w-44 rounded-none">
            <TabsTrigger value="approach" className=" border-b rounded-none">
              Approach
            </TabsTrigger>
            <span className="h-4 w-[0.6px] bg-white"></span>
            <TabsTrigger value="code" className="border-b rounded-none">
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approach" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardHeader className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <h2 className="text-2xl tracking-tight font-bold">
                    Approach
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="mx-10">
                {program.approach ? (
                  <p className="text-muted-foreground whitespace-pre-line">
                    {program.approach}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No approach information provided.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Code size={18} className="text-primary" />
                    <h2 className="text-2xl tracking-tight font-bold">Solution</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-zinc-200">Time Complexity:</h3>
                      <p className="ml-2 text-lg font-semibold text-zinc-300">{program.tc}</p>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-zinc-200">Space Complexity:</h3>
                      <p className="ml-2 text-lg font-semibold text-zinc-300">{program.sc}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 mx-10">
                <div className="w-full">
                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      margin: 0,
                      borderRadius: "0 0 0.5rem 0.5rem",
                      fontSize: "0.95rem",
                      minHeight: "40vh",
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{ opacity: 0.5 }}
                  >
                    {program.code || "// No code provided"}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}