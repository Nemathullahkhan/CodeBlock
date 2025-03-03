"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ModuleType {
  id: string;
  name?: string;
  description?: string;
}

export default function ModuleCard({ name, description }: ModuleType) {
  return (
    <>
      <Card className="max-h-full flex flex-col justify-center mx-3">
        <div className="h-[250px]"></div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
