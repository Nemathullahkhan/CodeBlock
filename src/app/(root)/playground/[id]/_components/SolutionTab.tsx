"use client";

import { useEffect, useState } from "react";
import { fetchSolution } from "@/lib/actions/rendering";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SolutionTab({ id }: { id: string }) {
  const [solution, setSolution] = useState<{
    intuition: string | null;
    approach: string | null;
    code: { language: string; code: string }[] | null;
  } | null>(null);

  const [language, setLanguage] = useState("c"); // Default language
  const [code, setCode] = useState(""); // Default code

  useEffect(() => {
    // Fetch solution data using the server action
    async function loadSolution() {
      const data = await fetchSolution(id);
      setSolution(data);

      // Set default language and code
      if (data?.code) {
        const defaultCodeBlock = data.code.find(
          (codeBlock) => codeBlock.language.toLowerCase() === "c"
        );
        if (defaultCodeBlock) {
          setLanguage(defaultCodeBlock.language);
          setCode(defaultCodeBlock.code);
        }
      }
    }

    loadSolution();
  }, [id]);

  if (!solution) {
    return <div className="max-w-5xl bg-black text-white">Loading...</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto "> {/* Updated to max-w-5xl */}
      <Card className="bg-black border border-zinc-800 shadow-xl rounded-xl">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="text-gray-200 text-2xl font-semibold -ml-[1px]">
            Implementation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Intuition Section */}
          <div className="space-y-3 px-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-50 px-1">
              Intuition
            </h1>
            <p className="text-gray-300 leading-7 px-2">
              {solution.intuition}
            </p>
          </div>

          {/* Approach Section */}
          <div className="space-y-3 px-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-50 px-1">
              Approach
            </h1>
            <div className="text-gray-300 leading-7 px-2">
              {solution.approach?.split("\n").map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-4 px-2">
            <h3 className="text-lg font-semibold text-gray-300">Code</h3>

            {/* Language Tabs */}
            <div className="flex gap-1 px-2">
              {solution.code?.map((codeBlock, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`text-sm px-3 py-1 border rounded-md transition-colors ${
                    language === codeBlock.language
                      ? "bg-zinc-800 text-white border-white" // Selected button styling
                      : "text-gray-400 border-gray-600 hover:bg-zinc-700"
                  }`}
                  onClick={() => {
                    setLanguage(codeBlock.language);
                    setCode(codeBlock.code);
                  }}
                >
                  {codeBlock.language}
                </Button>
              ))}
            </div>

            {/* Code Display */}
            <div className="max-w-3xl px-4">
              <SyntaxHighlighter
                language={language.toLowerCase()}
                style={atomDark}
                wrapLines={true}
                showLineNumbers={false}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}