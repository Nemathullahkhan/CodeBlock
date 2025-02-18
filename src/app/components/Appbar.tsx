import Link from "next/link";
import SigninButton from "./SigninButton";

export default function Appbar() {
  return (
    <nav className="max-w-4xl mx-auto flex items-center justify-between px-10 py-4 my-4 border-2 border-zinc-900 rounded-full shadow-lg">
  {/* Home Link */}
  <Link
    href="/"
    className="text-zinc-300 font-medium px-6 py-2  hover:scale-110 transition-all duration-300"
  >
    Home
  </Link>
  
    <SigninButton/>

  {/* Signup Link */}
  {/* <Link
    href="/auth/signup"
    className="text-blue-500 font-medium bg-blue-950/50 px-5 py-1 rounded-lg  hover:text-white hover:scale-105 transition-all duration-300"
  >
    Sign Up
  </Link> */}
</nav>

  );
}
