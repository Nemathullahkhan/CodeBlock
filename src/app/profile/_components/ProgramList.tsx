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

export default function ProgramList({
  id,
  folderId,
}: {
  id: string | null;
  folderId: string;
}) {
  const [programList, setProgramList] = useState<any[]>([]);

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
            <TableHead>Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programList?.map((program, index) => (
            <TableRow key={index}>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.updatedAt}</TableCell>
              <TableCell>{program.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}