"use client";
import { useEffect, useState } from "react";
import { userPrograms } from "@/lib/actions/profileActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns"; // Import date-fns for date formatting

// Define the Program type based on your Prisma model
interface Program {
  id: string;
  foldersId: string;
  userId: string;
  name: string;
  description: string | null;
  code: string | null;
  approach: string | null;
  createdAt: Date;
  updatedAt: Date;
  tc: string | null;
  sc: string | null;
}

export default function ProgramList({
  id,
  folderId,
}: {
  id: string | null;
  folderId: string;
}) {
  const [programList, setProgramList] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        if (id && folderId) {
          const result = await userPrograms({ id, folderId });
          setProgramList(result);
        }
      } catch (err) {
        console.log("Error occurred at rendering programs", err);
      }
    };
    fetchPrograms();
  }, [id, folderId]);

  return (
    <div className="mt-4">
      <h2>Programs in Selected Folder</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programList?.map((program, index) => (
            <TableRow key={index}>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.description || "No description"}</TableCell>
              <TableCell>
                {format(new Date(program.updatedAt), "MMM dd, yyyy HH:mm")} {/* Format the date */}
              </TableCell>
              <TableCell>{program.code || "No code"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}