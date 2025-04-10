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