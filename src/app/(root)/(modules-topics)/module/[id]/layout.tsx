import UserBadge from "@/app/(root)/playground/[id]/_components/UserBadge";
import {  Codesandbox } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-[1300px] sticky mx-auto flex justify-center border-b-4 border-zinc-800">
        <div className="flex items-center justify-between px-10 py-2   m-3 w-full">
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
      {children}
    </>
  );
}
