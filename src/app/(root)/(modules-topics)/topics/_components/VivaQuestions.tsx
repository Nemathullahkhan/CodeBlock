// interface vivaprops {
//   vivaQuestions?:
//     | {
//         question: string | null;
//         answer: string | null;
//       }[]
//     | null;
// }

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// export default function VivaQuestions({ vivaQuestions }: vivaprops) {
//   return (
//     <div className="rounded-lg  overflow-hidden px-10">
//       <Table className="border-2 border-zinc-700 rounded-2xl">
//         <TableHeader>
//           <TableRow className="px-2">
//             <TableHead className="text-gray-300 bg-zinc-900 font-medium border-r-2 border-zinc-800">
//               Question
//             </TableHead>
//             <TableHead className="text-gray-300 bg-zinc-900 font-medium">
//               Answer
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {vivaQuestions?.map((viva, index) => (
//             <TableRow key={index} className="">
//               <TableCell className="text-gray-300  border-r-2 border-zinc-800 hover:bg-black hover:text-gray-50">
//                 {viva.question}
//               </TableCell>
//               <TableCell className="text-gray-300 hover:bg-black hover:text-gray-50">
//                 {viva.answer}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

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

