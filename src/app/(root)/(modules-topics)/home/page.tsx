"use client";

import { getModules } from "@/lib/actions/moduleActions";
import { useEffect, useState } from "react";
import ModuleCard from "../components/ModuleCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Codesandbox, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserBadge from "../../playground/[id]/_components/UserBadge";
import { useRouter } from "next/navigation";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function Page() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [modules, setModules] = useState<ModuleType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const currentHour = new Date().getHours();
  let greeting = "Welcome";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  useEffect(() => {
    if (status === "authenticated") {
      const getAllModules = async () => {
        const getSubject = await getModules();
        setModules(getSubject);
      };
      getAllModules();
    }
  }, [status]);

  const filteredModules = modules?.filter(
    (mod) =>
      mod.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 pb-16">
        <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-900 to-zinc-950"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>

          <section className="relative px-10 -mt-3 mb-4 bg-transparent">
            <div className="flex items-center bg-transparent justify-between w-full">
              <div className="flex justify-start items-center">
                <Link href="/home" className="flex items-center gap-2">
                  <Codesandbox />
                  <span className="text-lg">CodeBlock</span>
                </Link>
              </div>
              <div className="flex justify-end items-center gap-4 ">
                <Link
                  href={"/playground"}
                  className="text-md text-pretty text-blue-400 font-semibold font-sans"
                >
                  {" "}
                  OnlineIDE
                </Link>
                <UserBadge />
              </div>
            </div>
          </section>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tighter text-primary">
                  {greeting},{" "}
                  <span className="text-primary">
                    {session?.user?.firstName || "Learner"}{" "}
                    {session?.user?.lastName}
                  </span>
                </h1>
                <p className="text-zinc-400 px-4 mt-1">
                  Continue your learning journey
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Modules</h2>
              <p className="text-zinc-400 text-sm">
                Continue learning or start something new
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  placeholder="Search modules..."
                  className="pl-9 bg-zinc-900/50 border-zinc-800 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" className="mt-4 md:mt-0">
                <BookOpen className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {modules === null
              ? Array.from({ length: 8 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[320px] rounded-lg bg-zinc-900/90"
                  />
                ))
              : filteredModules?.map((mod) => (
                  <Link
                    href={mod.id === "cm7j4tic90000buo8oh7a0scf" ? `/module/${mod.id}` : "/module/comingsoon"}
                    key={mod.id}
                    className="transition-all"
                  >
                    <ModuleCard {...mod} />
                  </Link>
                ))}
          </div>

          {filteredModules?.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-zinc-700" />
              <h3 className="mt-4 text-lg font-medium text-white">
                No modules found
              </h3>
              <p className="mt-2 text-zinc-400">
                Try adjusting your search query
              </p>
            </div>
          )}
        </section>
      </div>
    );
  }

  return null;
}