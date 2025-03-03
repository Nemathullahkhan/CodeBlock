import SignUpForm from "@/app/components/SignUpForm"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3 mx-10">
        <div className="md:col-span-2 flex justify-center items-center ">
        <p className="text-center p-2 ">Already Signed Up?</p>
        <Link href = {"/auth/signin"} className="text-blue-500  tracking-tight text-md">Sign In</Link>
        </div>
        <SignUpForm/>
        <Image src ={"/lordslogo.jpeg"}  width="500" height={500} alt = "login.png" />
    </div>
  )
}

export default page