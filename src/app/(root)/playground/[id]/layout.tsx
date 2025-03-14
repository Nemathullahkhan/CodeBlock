import prisma from "@/lib/prisma";
import { SidebarProvider } from "@/components/ui/sidebar";
import SomeComponent from "./_components/SomeComponent";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const content = await prisma.content.findUnique({
    where: { id },
    include: {
      Questions: true,
      implementation: true,
    },
  });
  const programName = content?.title || null;

  return (
    <SidebarProvider>
      <SomeComponent id = {id} programName = {programName}/>
      {children} 
    </SidebarProvider>
  );
}
