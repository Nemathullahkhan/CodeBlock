import { fetchProblemData } from "@/lib/fetchQuestion";
import ProblemWorkspace from "./ProblemWorkspace";

// This is a Server Component that fetches data
export default async function ProblemWorkspaceWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  // Fetch data on the server
  const { programName } = await fetchProblemData(id);
  
  return (
    <>
      <ProblemWorkspace id={id} programName={programName} />
      {children}
    </>
  );
}