// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// interface implementProps {
//   implementation?: {
//     intuition: string | null;
//     approach: string | null;
//     code: { language: string; code: string }[] | null;
//   } | null;
// }

// export default function Implementation({ implementation }: implementProps) {
//   const defaultCodeBlock = implementation?.code?.find(
//     (codeBlock) => codeBlock.language.toLowerCase() === "c"
//   );

//   const [languagezzz, setLanguage] = useState(defaultCodeBlock?.language || "c");
//   const [getCode, setCode] = useState(defaultCodeBlock?.code || "");
//   return (
//     // Card design

//     <Card className="bg-zinc-900 border-zinc-800">
//       <CardHeader>
//         <CardTitle className="text-gray-50">Implementation</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-50">Intuition</h3>
//           <p className="text-gray-300 leading-7">{implementation?.intuition}</p>
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-50">Approach</h3>
//           <p className="text-gray-300 leading-7">{implementation?.approach}</p>
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-50">Code</h3>
//           <div className="flex flex-col border-4 border-black rounded-lg">
//             <div className="flex bg-black px-3">
//               {implementation?.code?.map((codeBlock, index) => (
//                 <div key={index} className=" bg-black">
//                   <Button
//                     variant={"outline"}
//                     className="text-gray-200"
//                     onClick={() => {
//                       setLanguage(codeBlock.language);
//                       setCode(codeBlock.code);
//                     }}
//                   >
//                     {codeBlock.language}
//                   </Button>
//                 </div>
//               ))}
//             </div>
//             <div className="w-full bg-black -mt-1">
//               <SyntaxHighlighter
//                 language={languagezzz.toLowerCase()}
//                 style={atomDark }
//                 wrapLines={true}
//                 showLineNumbers={false} // Hides line numbers
//               >
//                 {getCode}
//               </SyntaxHighlighter>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface implementProps {
  implementation?: {
    intuition: string | null;
    approach: string | null;
    code: { language: string; code: string }[] | null;
  } | null;
}

export default function Implementation({ implementation }: implementProps) {
  const defaultCodeBlock = implementation?.code?.find(
    (codeBlock) => codeBlock.language.toLowerCase() === "c"
  );

  const [language, setLanguage] = useState(defaultCodeBlock?.language || "c");
  const [code, setCode] = useState(defaultCodeBlock?.code || "");

  return (
    <Card className="bg-black border border-zinc-800 shadow-xl rounded-xl">
      <CardHeader className="border-b border-gray-800 pb-3">
        <CardTitle className="text-gray-200 text-2xl font-semibold -ml-[1px]">
          Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Intuition Section */}
        <div className="space-y-3 px-2">
          <h1 className="text-xl font-bold tracking-tight text-gray-5 px-1">
            Intuition
          </h1>
          <p className="text-gray-300  leading-7 px-2">
            {implementation?.intuition}
          </p>
        </div>

        {/* Approach Section */}
        <div className="space-y-3 px-2">
          <h1 className="text-xl font-bold tracking-tight text-gray-5 px-1">
            Approach
          </h1>
          <div className="text-gray-300 leading-7 px-2">
            {implementation?.approach?.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>

        {/* Code Section */}
        <div className="space-y-4 px-2">
          <h3 className="text-lg font-semibold text-gray-300">Code</h3>

          {/* Language Tabs */}
          <div className="flex  gap-1 px-2">
            {implementation?.code?.map((codeBlock, index) => (
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
          <div className="w-full px-4">
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
  );
}
