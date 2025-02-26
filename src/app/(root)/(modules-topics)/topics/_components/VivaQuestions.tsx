interface vivaprops {
  vivaQuestions?:
    | {
        question: string | null;
        answer: string | null;
      }[]
    | null;
}

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function VivaQuestions({ vivaQuestions }: vivaprops) {
  return (
    <div className="rounded-lg  overflow-hidden px-10">
      <Table className="border-2 border-zinc-900">
        <TableHeader>
          <TableRow className="px-2">
            <TableHead className="text-gray-300 bg-zinc-900 font-medium border-r-2 border-zinc-800">
              Question
            </TableHead>
            <TableHead className="text-gray-300 bg-zinc-900 font-medium">
              Answer
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vivaQuestions?.map((viva, index) => (
            <TableRow key={index} className="">
              <TableCell className="text-gray-300  border-r-2 border-zinc-800 hover:bg-black hover:text-gray-50">
                {viva.question}
              </TableCell>
              <TableCell className="text-gray-300 hover:bg-black hover:text-gray-50">
                {viva.answer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
