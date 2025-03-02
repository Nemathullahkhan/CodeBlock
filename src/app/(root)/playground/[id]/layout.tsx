import Questionaire from "./_components/Questionaire";
import { Clock } from "lucide-react";
import QuestionEditorPanel from "./_components/QuestionEditor";
import QuestionOutputPanel from "./_components/QuestionOutputPanel";
import RandomComponentForTesting from "./_components/RandomComponentForTesting";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import SubmitButton from "./_components/SubmitButton";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const name = await prisma.content.findUnique({
    where: { id },
  });
  const programName = name?.title || null;

  return (
    <div className="h-screen  p-4">
      <div className="max-w-[1800px] mx-auto p-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]  h-full">
          <div>
            {/* Header */}
            {/* Todo */}
            <div className="flex gap-4">
              <div className="flex gap-2">
                <Clock />
                <span>Problem</span>
              </div>

              <div className="flex gap-2">
                <Clock />
                <span>Editorial</span>
              </div>

              {/* Submit Button */}
              <SubmitButton id ={id}/>
            </div>
            <Questionaire id={id} /> {/* ✅ Renders Server Component Fast */}
          </div>
          <div>
            <QuestionEditorPanel programName={programName} id={id} />
            <QuestionOutputPanel />
            <RandomComponentForTesting />
          </div>
        </div>
        {children} {/* Render the actual page */}
      </div>
    </div>
  );
}
