// // import prisma from "@/lib/prisma";
// // import { SidebarProvider } from "@/components/ui/sidebar";
// // import SomeComponent from "./_components/SomeComponent";

// // export default async function Layout({
// //   children,
// //   params,
// // }: {
// //   children: React.ReactNode;
// //   params: { id: string };
// // }) {
// //   const { id } = params;
// //   const content = await prisma.content.findUnique({
// //     where: { id },
// //     include: {
// //       Questions: true,
// //       implementation: true,
// //     },
// //   });
// //   const programName = content?.title || null;

// //   return (
// //     <SidebarProvider>
// //       <SomeComponent id = {id} programName = {programName}/>
// //       {children} 
// //     </SidebarProvider>
// //   );
// // }

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

"use server";

import prisma from "@/lib/prisma";
import { SidebarProvider } from "@/components/ui/sidebar";
import SomeComponent from "./_components/SomeComponent";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

async function getContent(id: string) {
  return await prisma.content.findUnique({
    where: { id },
    include: {
      Questions: true,
      implementation: true,
    },
  });
}

export default async function Layout({ children, params }: LayoutProps) {
  const id = String(params.id);
  const content = await getContent(id);
  const programName = content?.title || null;

  return (
    <SidebarProvider>
      <SomeComponent id={id} programName={programName} />
      {children}
    </SidebarProvider>
  );
}