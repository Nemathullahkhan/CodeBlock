import { Button } from "@/components/ui/button";
import Image from "next/image";
import Appbar from "./components/Appbar";
import { sendMail } from "@/lib/mail";

export default async function Home() {

  await sendMail({to:"khancodes0@gmail.com",subject:"test",body:"Hello world"});
  return (
    <>
    {/* <Appbar/> */}
    <div className="text-center text-3xl font-bold tracking-tighter"></div>
    </>
  );
}
