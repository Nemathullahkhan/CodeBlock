"use client";

import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

const SignInPage = ({ searchParams }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const [resolvedSearchParams, setResolvedSearchParams] = useState<{
    callbackUrl?: string;
  }>({});

  useEffect(() => {
    // Resolve the searchParams promise
    const resolveParams = async () => {
      const params = await searchParams;
      setResolvedSearchParams(params);
    };
    resolveParams();

    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router, searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="flex flex-col items-center p-4 relative z-10 rounded-lg backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl pointer-events-none" />
        <h1 className="text-3xl font-sans m-1 font-semibold">Sign In</h1>
        <span className="text-sm font-sans tracking-tight">
          New user? Try{" "}
          <Link href={"/auth/signup"} className="text-blue-400">
            signup
          </Link>
        </span>
        <SignInForm callbackUrl={resolvedSearchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SignInPage;