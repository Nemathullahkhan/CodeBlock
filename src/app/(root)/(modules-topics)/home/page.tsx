// "use client";
// import { getModules } from "@/lib/actions/moduleActions";
// import { useEffect, useState } from "react";
// import ModuleCard from "../components/ModuleCard";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import CreationMod from "../components/CreationMod";
// import { useSession } from "next-auth/react";

// interface ModuleType {
//   id: string;
//   name?: string;
//   description?: string;
// }

// export default function Page() {
//   const [modules, setModules] = useState<ModuleType[] | null>(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const getAllModules = async () => {
//       const getSubject = await getModules();
//       setModules(getSubject);
//     };
//     getAllModules();
//   }, []);

//   return (
//     <>
//       {/* Todo - design the home page */}
//       {/* <div className="mx-10"><CreationMod/></div> */}
//       {session && session.user ? (
//         <>
//       <div className="max-w-7xl px-8 py-6">
//         <div className="space-y-6">
//           <div className=" flex justify-center items-center py-5">
//             <span className ="text-4xl tracking-tight font-semibold">Welcome , <span className="italic"></span></span>
//           </div>
//           {modules === null ? (
//             Array.from({ length: 3 }, (_, index) => (
//               <Skeleton
//                 key={index}
//                 className="max-w-md h-16 rounded-lg bg-zinc-900/90"
//               />
//             ))
//           ) : (
//             <>
//               {modules?.map((mod) => (
//                 <div className="max-w-md text-center" key={mod.id}>
//                   <Link href={`/module/${mod.id}`}>
//                     <ModuleCard {...mod} />
//                   </Link>
//                 </div>
//               ))}
//             </>
//           )}
//           ):
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { getModules } from "@/lib/actions/moduleActions";
import { useEffect, useState } from "react";
import ModuleCard from "../components/ModuleCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";



interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function Page() {
  const [modules, setModules] = useState<ModuleType[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getAllModules = async () => {
      const getSubject = await getModules();
      setModules(getSubject);
    };
    getAllModules();
  }, []);

  return (
    <>
      {/* Todo - design the home page */}
      {/* <div className="mx-10"><CreationMod/></div> */}
      {session && session.user && (
        <div className="w-full mx-10 my-8 ">
          <div className="space-y-6">
            <div className="flex justify-center items-center py-5 ">
              <span className="text-4xl tracking-tight font-semibold ml-4">
                Welcome,{" "}
                <span
                className={` font-semibold tracking- bg-gradient-to-br from-zinc-400 to-zinc-900 bg-clip-text text-transparent`}
                >
                  {session.user.firstName} {session.user.lastName}
                </span>
              </span>
            </div>
            {modules === null
              ? Array.from({ length: 3 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="max-w-md h-16 rounded-lg bg-zinc-900/90"
                  />
                ))
              : modules.map((mod) => (
                  <div className="max-w-xs text-center h-[400px] flex items-center" key={mod.id}>
                    <Link href={`/module/${mod.id}`}>
                      <ModuleCard {...mod} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
