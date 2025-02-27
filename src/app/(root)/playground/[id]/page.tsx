"use client";

import EditorPanel from "@/app/(root)/_components/EditorPanel";
import InputPanel from "@/app/(root)/_components/InputPanel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import OutputPanelAST from "./_components/OutputPanelAST";

export default function Page() {
  const [solutionView, setSolutionView] = useState(false);
  const [solution, setSolution] = useState<
    { language: string; code: string }[] | null
  >(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const params = useParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [code, setCode] = useState("");
  const [copied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    // logic to copy the output
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleView = () => setSolutionView((prev) => !prev);

  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/solution/${id}`);
        const data = await res.json();
        if (res.ok && data.code) {
          setSolution(data.code);
        } else {
          console.error("Error fetching solution:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchSolution();
  }, [id]);
  return (
    <>
      <div className="h-screen overflow-hidden p-4">
        <div className="max-w-[1800px] mx-auto p-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 h-full">
            {/* Switch  */}
            {solutionView ? (
              <div>
                <div className="p-4 border rounded-lg  text-zinc-300">
                  <h2 className="text-2xl font-semibold mb-3 tracking-tight">Solution</h2>

                  <Breadcrumb>
                    <BreadcrumbList className="ml-3">
                      {solution?.map((item, idx) => (
                        <>
                          <BreadcrumbItem className="-mr-5 -ml-5">
                            <Button
                              variant={"link"}
                              className="hover:outline-none"
                              key={idx}
                              onClick={() => {
                                setSelectedLanguage(item.language);
                                setCode(item.code);
                              }}
                            >
                              {item.language}
                            </Button>
                          </BreadcrumbItem>
                          <span className="h-4 w-[0.5px] bg-zinc-400 mx-4"></span>
                        </>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>

                  {selectedLanguage !== "" && (
                    <div
                      className="bg-zinc-800 p-4 rounded-md overflow-auto scrollbar-thin
                scrollbar-thumb-zinc-300 scrollbar-track-black max-h-[400px] mt-4 relative"
                    >
                      <button
                        onClick={handleCopy}
                        className="absolute right-4 flex gap-1.5 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-gray-300 bg-black
              rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all border-red-400"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>

                      <pre className="whitespace-pre-wrap text-sm font-mono p-2">
                        {
                          solution?.find(
                            (item) => item.language === selectedLanguage
                          )?.code
                        }
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <EditorPanel />
            )}

            <div className="">
              <Button
                variant={"outline"}
                className={`w-32  z-10 ${
                  solutionView
                    ? "text-white-600 border-zinc-300"
                    : "text-white bg-black"
                }`}
                onClick={toggleView}
              >
                {solutionView ? "Editor" : "Solution"}
              </Button>
              <div className="lg:flex-col gap-3 mt-2">
                <InputPanel />
                <OutputPanelAST />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
