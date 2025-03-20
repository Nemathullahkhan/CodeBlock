import React from "react";

export default function Working({
  working,
}: {
  working?: { explanation: string } | null;
}) {
  if (!working) return null;

  // Replace literal '\n' with actual newline characters
  const formattedExplanation = working.explanation.replace(/\\n/g, "\n");

  // Split the explanation string by actual newline characters
  const explanationLines = formattedExplanation.split("\n");

  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6 mt-10">
        Working
      </h2>
      <p className="text-gray-300 leading-7 px-10">
        {explanationLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== explanationLines.length - 1 && (
              <div className="h-1"></div> // Add spacing between lines
            )}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}