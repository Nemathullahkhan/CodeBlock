// import Questionaire from "./_components/Questionaire";
// import { BookOpen, Code, FileCode } from "lucide-react";
// import QuestionEditorPanel from "./_components/QuestionEditor";
// import QuestionOutputPanel from "./_components/QuestionOutputPanel";
// import SubmitButton from "./_components/SubmitButton";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import QuestionRunButton from "./_components/QuestionRunButton";
// import SolutionTab from "./_components/SolutionTab";
// import TestCaseComponent from "./_components/RandomComponentForTesting";
// import { ProblemSidebar } from "./_components/ProblemSidebar";
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
      {children} {/* Render the actual page */}
    </SidebarProvider>
  );
}
