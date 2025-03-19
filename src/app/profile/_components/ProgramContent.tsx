// "use client";

// import { useState, useEffect } from "react";
// import {
//   renameProgram,
//   deleteProgram,
//   listProgramsByLatest,
// } from "@/lib/actions/profileActions";
// import { Button } from "@/components/ui/button";
// import { File, MoreHorizontal, Calendar, Code, Pencil } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";
// import CreateProgramForm from "./CreateProgramForm";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import Link from "next/link";

// interface ProgramContentProps {
//   userId: string | null;
//   folderId: string | null;
//   folderList: any[];
// }

// export default function ProgramContent({
//   userId,
//   folderId,
//   folderList,
// }: ProgramContentProps) {
//   const [programList, setProgramList] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
//     null
//   );
//   const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
//   const [newProgramName, setNewProgramName] = useState("");
//   const [programToRename, setProgramToRename] = useState<string | null>(null);

//   const currentFolder = folderList.find((folder) => folder.id === folderId);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         if (userId && folderId) {
//           setIsLoading(true);
//           const result = await listProgramsByLatest({ userId, folderId });
//           setProgramList(result);
//           setIsLoading(false);
//         }
//       } catch (err) {
//         console.log("Error fetching programs", err);
//         setIsLoading(false);
//       }
//     };

//     if (folderId) {
//       fetchPrograms();
//     } else {
//       setProgramList([]);
//     }
//   }, [userId, folderId]);

//   const handleSuccess = async () => {
//     if (userId && folderId) {
//       const result = await listProgramsByLatest({ userId, folderId });
//       setProgramList(result);
//     }
//   };

//   const handleRenameProgram = async () => {
//     if (programToRename && newProgramName) {
//       try {
//         await renameProgram({
//           programId: programToRename,
//           newName: newProgramName,
//         });
//         handleSuccess(); // Refresh the program list
//         setIsRenameDialogOpen(false); // Close the dialog
//         setNewProgramName(""); // Reset the input field
//         setProgramToRename(null); // Reset the program to rename
//       } catch (err) {
//         console.log("Error renaming program:", err);
//       }
//     }
//   };

//   if (!folderId) {
//     return (
//       <div className="flex-1 flex items-center justify-center p-6 bg-background">
//         <div className="text-center max-w-md">
//           <File className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
//           <h3 className="text-xl font-medium mb-2">No folder selected</h3>
//           <p className="text-muted-foreground mb-4">
//             Select a folder from the sidebar or create a new one to get started.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-auto bg-background">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">
//               {currentFolder?.name || "Programs"}
//             </h1>
//             <p className="text-muted-foreground text-sm mt-1">
//               {programList.length}{" "}
//               {programList.length === 1 ? "program" : "programs"}
//             </p>
//           </div>
//           <CreateProgramForm
//             userId={userId}
//             folderId={folderId}
//             onSuccess={handleSuccess}
//           />
//         </div>

//         {isLoading ? (
//           <div className="space-y-4">
//             <Skeleton className="h-16 w-full" />
//             <Skeleton className="h-16 w-full" />
//             <Skeleton className="h-16 w-full" />
//           </div>
//         ) : programList.length === 0 ? (
//           <div className="border border-dashed border-border rounded-lg p-8 text-center">
//             <File className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No programs yet</h3>
//             <p className="text-muted-foreground mb-4">
//               Create your first program in this folder.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {programList.map((program) => (
//               <div
//                 key={program.id}
//                 className={cn(
//                   "border border-border rounded-md p-4 hover:bg-muted/30 transition-colors cursor-pointer group",
//                   selectedProgramId === program.id && "bg-muted/50"
//                 )}
//                 onClick={() => setSelectedProgramId(program.id)}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Link href={`/profile/program/${program.id}`}>
//                       <div className="flex">
//                         <Code className="h-7 w-5 mr-2 mt-2 text-muted-foreground" />

//                         <div>
//                           <h3 className="font-medium">{program.name}</h3>
//                           <div className="flex items-center text-xs text-muted-foreground mt-1">
//                             <Calendar className="h-3 w-3 mr-1" />
//                             <span>
//                               {program.updatedAt
//                                 ? `Updated ${formatDistanceToNow(
//                                     new Date(program.updatedAt),
//                                     { addSuffix: true }
//                                   )}`
//                                 : "Just created"}
//                             </span>
//                             {program.code && (
//                               <>
//                                 <span className="mx-2">•</span>
//                                 <Code className="h-3 w-3 mr-1" />
//                                 <span>{program.code.length} characters</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>

//                   <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 rounded-full"
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 rounded-full"
//                         >
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setProgramToRename(program.id); // Set the program to rename
//                             setIsRenameDialogOpen(true); // Open the dialog
//                           }}
//                         >
//                           Rename
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-destructive"
//                           onClick={async () => {
//                             const confirmDelete = confirm(
//                               "Are you sure you want to delete this program?"
//                             );
//                             if (confirmDelete) {
//                               await deleteProgram({ programId: program.id });
//                               handleSuccess(); // Refresh the program list
//                             }
//                           }}
//                         >
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Rename Dialog */}
//       <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
//         <DialogContent className=" border border-zinc-700">
//           <DialogHeader>
//             <DialogTitle className="text-3xl ">Rename Program</DialogTitle>
//             <DialogDescription className="text-xs">
//               Enter a new name for the program.
//             </DialogDescription>
//           </DialogHeader>
//           <Input
//             value={newProgramName}
//             onChange={(e) => setNewProgramName(e.target.value)}
//             placeholder="Enter new program name"
//             className="mt-2 h-7"
//           />
//           <div className="flex justify-end mt-4">
//             <Button
//               variant={"default"}
//               onClick={handleRenameProgram}
//               disabled={!newProgramName.trim()}
//               className="bg-white h-5"
//             >
//               Rename
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import {
  renameProgram,
  deleteProgram,
  listProgramsByLatest,
} from "@/lib/actions/profileActions";
import { Button } from "@/components/ui/button";
import { File, MoreHorizontal, Calendar, Code, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import CreateProgramForm from "./CreateProgramForm";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

interface ProgramContentProps {
  userId: string | null;
  folderId: string | null;
  folderList: any[];
}

export default function ProgramContent({
  userId,
  folderId,
  folderList,
}: ProgramContentProps) {
  const [programList, setProgramList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newProgramName, setNewProgramName] = useState("");
  const [programToRename, setProgramToRename] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentFolder = folderList.find((folder) => folder.id === folderId);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        if (userId && folderId) {
          setIsLoading(true);
          const result = await listProgramsByLatest({ userId, folderId });
          setProgramList(result);
        }
      } catch (err) {
        console.log("Error fetching programs", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (folderId) {
      fetchPrograms();
    } else {
      setProgramList([]);
    }
  }, [userId, folderId]);

  const handleSuccess = async () => {
    if (userId && folderId) {
      const result = await listProgramsByLatest({ userId, folderId });
      setProgramList(result);
    }
  };

  const handleRenameProgram = async () => {
    if (programToRename && newProgramName) {
      try {
        await renameProgram({
          programId: programToRename,
          newName: newProgramName,
        });
        handleSuccess();
        setIsRenameDialogOpen(false);
        setNewProgramName("");
        setProgramToRename(null);
      } catch (err) {
        console.log("Error renaming program:", err);
      }
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this program?");
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await deleteProgram({ programId });
        handleSuccess();
      } catch (err) {
        console.log("Error deleting program:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!folderId) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="text-center max-w-md">
          <File className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No folder selected</h3>
          <p className="text-muted-foreground mb-4">
            Select a folder from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {currentFolder?.name || "Programs"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {programList.length}{" "}
              {programList.length === 1 ? "program" : "programs"}
            </p>
          </div>
          <CreateProgramForm
            userId={userId}
            folderId={folderId}
            onSuccess={handleSuccess}
          />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : programList.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg p-8 text-center">
            <File className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No programs yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first program in this folder.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {programList.map((program) => (
              <div
                key={program.id}
                className={cn(
                  "border border-border rounded-md p-4 hover:bg-muted/30 transition-colors cursor-pointer group",
                  selectedProgramId === program.id && "bg-muted/50"
                )}
                onClick={() => setSelectedProgramId(program.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link href={`/profile/program/${program.id}`}>
                      <div className="flex">
                        <Code className="h-7 w-5 mr-2 mt-2 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{program.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {program.updatedAt
                                ? `Updated ${formatDistanceToNow(
                                    new Date(program.updatedAt),
                                    { addSuffix: true }
                                  )}`
                                : "Just created"}
                            </span>
                            {program.code && (
                              <>
                                <span className="mx-2">•</span>
                                <Code className="h-3 w-3 mr-1" />
                                <span>{program.code.length} characters</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => {
                        setProgramToRename(program.id);
                        setIsRenameDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setProgramToRename(program.id);
                            setIsRenameDialogOpen(true);
                          }}
                        >
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteProgram(program.id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="border border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-3xl">Rename Program</DialogTitle>
            <DialogDescription className="text-xs">
              Enter a new name for the program.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newProgramName}
            onChange={(e) => setNewProgramName(e.target.value)}
            placeholder="Enter new program name"
            className="mt-2 h-7"
          />
          <div className="flex justify-end mt-4">
            <Button
              variant="default"
              onClick={handleRenameProgram}
              disabled={!newProgramName.trim()}
              className="bg-white h-5"
            >
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}