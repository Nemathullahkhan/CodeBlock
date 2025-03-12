import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Working({
  working,
}: {
  working?: { explanation: string } | null;
}) {
  if (!working) return null;
  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6 mt-10">
        Working{" "}
      </h2>
      <p className="text-gray-300 leading-7 px-10">{working.explanation}</p>
    </section>
  );
}
