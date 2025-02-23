interface vivaprops {
    vivaQuestions?:{
        question: string | null,
        answer : string | null,
    }[]| null;
}

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function VivaQuestions({vivaQuestions}:vivaprops) {
  return (
    <Table className="border border-gray-800">
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-100">Question</TableHead>
          <TableHead className="text-gray-100">Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vivaQuestions?.map((viva, index) => (
          <TableRow key={index}>
            <TableCell className="text-gray-300">{viva.question}</TableCell>
            <TableCell className="text-gray-300">{viva.answer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}