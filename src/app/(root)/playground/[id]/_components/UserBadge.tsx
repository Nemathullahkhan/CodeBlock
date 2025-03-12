// "use client";

// import { Badge } from "@/components/ui/badge";
// import { useSession } from "next-auth/react";

// export default function UserBadge() {
//   const { data: session } = useSession();
  
//   // Extract first letter from user's first name
//   const firstLetter = session?.user?.firstName?.charAt(0)?.toUpperCase() || "?";

//   return (
//     <Badge className="rounded-full h-9 w-9 flex justify-center text-xl">
//       {firstLetter}
//     </Badge>
//   );
// }


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

export default function UserBadge() {
  const { data: session } = useSession();

  // Extract first letter from user's first name
  const firstLetter = session?.user?.firstName?.charAt(0)?.toUpperCase() || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className="rounded-full h-9 w-9 flex justify-center text-xl cursor-pointer hover:bg-primary/90">
          {firstLetter}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}