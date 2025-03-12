"use client";

import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

export default function UserBadge() {
  const { data: session } = useSession();
  
  // Extract first letter from user's first name
  const firstLetter = session?.user?.firstName?.charAt(0)?.toUpperCase() || "?";

  return (
    <Badge className="rounded-full h-8">
      {firstLetter}
    </Badge>
  );
}
