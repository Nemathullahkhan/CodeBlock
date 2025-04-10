"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SavedPrograms from "./SavedPrograms";
import CreatedFolders from "./CreatedFolders";
import ModuleCompleted from "./ModuleCompleted";

export default function ProfileCard() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  const userID = session?.user?.id || null;

  const firstLetter = session?.user?.firstName?.charAt(0)?.toUpperCase();

  return (
    <div className="flex justify-center relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 left-[350px] bg-gradient-to-r from-green-600/20 to-blue-500/20  max-w-xl   blur-3xl z-[-1]" />

      {/* Card Component */}
      <div className="flex justify-center ml-24">
        <Card className="flex-col justify-center p-4 border-zinc-700  bg-transparent/60 z-10">
          <div className="flex justify-center">
            <div className="p-4 border border-zinc-600 rounded-full bg-gradient-to-r from-green-600/10 to-blue-500/10 w-16 h-16 text-primary font-semibold text-center text-2xl">
              <div className="absolute top-0 right-24">dafhkljah</div>
              <p className="flex justify-center">{firstLetter}</p>
            </div>
          </div>
          <CardDescription className="text-3xl tracking-tight  text-primary mt-2 font-semibold  text-center">
            <h1>
              {session?.user?.firstName} {session?.user?.lastName}
            </h1>
            {/* TODO: Joined since  */}
          </CardDescription>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mt-10">
              <SavedPrograms id={userID} />
              <CreatedFolders id={userID} />
              <ModuleCompleted id={userID} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
