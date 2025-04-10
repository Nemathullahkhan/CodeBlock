"use client";

import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react"; // Import icons from Lucide React
import Link from "next/link";

export default function UserBadge() {
  const { data: session } = useSession();

  // Extract first letter from user's first name
  const firstLetter = session?.user?.firstName?.charAt(0)?.toUpperCase() || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className="rounded-full h-7 w-7 flex justify-center text-md cursor-pointer hover:bg-primary/90 ">
          {firstLetter}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 border border-zinc-800 bg-zinc-400/10 transition-all duration-300">
        <DropdownMenuItem className="cursor-pointer ">
          <Link href={"/profile"} className="flex gap-2">
            <User className=" h-4 w-4" />
            <span className="border-l border-zinc-500 px-3 text-sm">Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className=" h-4 w-4" />
          <span className="border-l border-zinc-500 px-3 text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
