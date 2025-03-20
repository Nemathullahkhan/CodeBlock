"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface VivaProps {
  vivaQuestions?:
    | {
        question: string | null
        answer: string | null
      }[]
    | null
}

export default function VivaQuestions({ vivaQuestions }: VivaProps) {
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/2 bg-muted/50 font-medium text-foreground">Question</TableHead>
              <TableHead className="bg-muted/50 font-medium text-foreground">Answer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vivaQuestions?.map((viva, index) => (
              <TableRow key={index} className="border-t border-border transition-colors hover:bg-muted/50">
                <TableCell className="border-r border-border p-4">{viva.question}</TableCell>
                <TableCell className="p-4">{viva.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

