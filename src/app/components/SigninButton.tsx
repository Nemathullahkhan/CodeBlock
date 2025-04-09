"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession(); 
  console.log({session});
  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <p>{`${session.user.firstName}  ${session.user.lastName} `}</p>
          <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"api/auth/signout"}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Button onClick={()=> signIn()}>
            Sign In
          </Button>
          <Link
            href="/auth/signup"
            className="text-sky-500 font-medium bg-blue-950/50 px-5 py-1 rounded-lg  hover:text-white hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default SigninButton;
