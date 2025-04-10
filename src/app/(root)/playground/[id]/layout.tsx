// // // import prisma from "@/lib/prisma";
// // // import { SidebarProvider } from "@/components/ui/sidebar";
// // // import SomeComponent from "./_components/SomeComponent";

// // // export default async function Layout({
// // //   children,
// // //   params,
// // // }: {
// // //   children: React.ReactNode;
// // //   params: { id: string };
// // // }) {
// // //   const { id } = params;
// // //   const content = await prisma.content.findUnique({
// // //     where: { id },
// // //     include: {
// // //       Questions: true,
// // //       implementation: true,
// // //     },
// // //   });
// // //   const programName = content?.title || null;

// // //   return (
// // //     <SidebarProvider>
// // //       <SomeComponent id = {id} programName = {programName}/>
// // //       {children} 
// // //     </SidebarProvider>
// // //   );
// // // }

// "use server";

// import prisma from "@/lib/prisma";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import SomeComponent from "./_components/SomeComponent";

// // Create a function to fetch the content
// async function getContent(id: string) {
//   return await prisma.content.findUnique({
//     where: { id },
//     include: {
//       Questions: true,
//       implementation: true,
//     },
//   });
// }

// export default async function Layout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { id: string; };
// }) {
//   // Get id as a string from params
//   const id = String(params.id);
  
//   // Fetch content
//   const content = await getContent(id);
//   const programName = content?.title || null;

//   return (
//     <SidebarProvider>
//       <SomeComponent id={id} programName={programName} />
//       {children}
//     </SidebarProvider>
//   );
// }
"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import SomeComponent from "./_components/SomeComponent";
import { getContentData } from "@/lib/actions/layoutActions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;
  const [programName, setProgramName] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProgramName = async () => {
      try {
        const { programName } = await getContentData(id);
        setProgramName(programName);
      } catch (error) {
        console.error("Failed to fetch program name:", error);
        setProgramName(null);
      }
    };
    
    fetchProgramName();
  }, [id]); // Add id as dependency
  
  return (
    <SidebarProvider>
      <SomeComponent id={id} programName={programName} />
      {children}
    </SidebarProvider>
  );
}