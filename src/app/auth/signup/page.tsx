import SignUpForm from "@/app/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="max-w-7xl flex justify-center mt-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-2 overflow-y-hidden">
        <div className="flex flex-col justify-center items-center ">
          <span className="text-sm font-sans mb-4 tracking-tight">
            Already user? Try{" "}
            <Link href={"/auth/signup"} className="text-blue-400">
              {" "}
              Sign-in
            </Link>
          </span>
          <SignUpForm />
        </div>
        <div className="flex justify-center">
          <Image
            src={"/lordslogo.jpeg"}
            width="500"
            height={500}
            alt="login.png"
          />
        </div>
      </div>
    </div>
  );
}

// import SignUpForm from "@/app/components/SignUpForm"
// import Image from "next/image"
// import Link from "next/link"

// const page = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3 overflow-y-hidden">
//         <div className="md:col-span-2 flex justify-center items-center ">
//         <p className="text-center p-2 ">Already Signed Up?</p>
//         <Link href = {"/auth/signin"} className="text-blue-500  tracking-tight text-md">Sign In</Link>
//         </div>
//         <SignUpForm />
//         <Image src ={"/lordslogo.jpeg"}  width="500" height={500} alt = "login.png" />
//     </div>
//   )
// }

// export default page
