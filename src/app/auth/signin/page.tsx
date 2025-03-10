import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SignInPage = ({ searchParams }: Props) => {
  console.log(searchParams);
  return (
    <div className="grid grid-cols-2  items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <span className="text-sm font-sans tracking-tight">
          New user? Try <Link href = {"/auth/signup"} className="text-blue-400"> signup</Link>
        </span>
        <SignInForm callbackUrl={searchParams.callbackUrl} />
        <Link href={"/auth/forgotPass"} className="text-sm text-zinc-400">
          Forgot Your Password?
        </Link>
      </div>
      <div className="bg-stone-600 w-full min-h-screen flex justify-center py-auto">
        Image or Something
      </div>
    </div>
  );
};

export default SignInPage;
