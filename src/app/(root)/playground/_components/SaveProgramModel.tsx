// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
// import { DialogTitle } from "@radix-ui/react-dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Import Input component
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
// import { getFolders, createAndAssignProgram, createFolder } from "@/lib/actions/profileActions"; // Import server actions
// import Link from "next/link"; // Import Link component

// interface Program {
//   id: string;
//   name: string;
//   userId: string;
//   description: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   code: string | null;
//   foldersId: string;
//   approach: string | null;
//   tc: string | null;
//   sc: string | null;
// }

// interface Folder {
//   id: string;
//   name: string;
//   userId: string;
//   description: string | null;
//   createdAt: Date;
//   Programs: Program[];
// }

// interface SaveProgramModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }


// const SaveProgramModal = ({ isOpen, onClose }: SaveProgramModalProps) => {
//   const [folders, setFolders] = useState<Folder[]>([]);
//   const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
//   const [isCreatingFolder, setIsCreatingFolder] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [programName, setProgramName] = useState("");
//   const [description] = useState("");
//   const [approach] = useState("");
//   const [tc] = useState("");
//   const [sc] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     const fetchFolders = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const folders = await getFolders({ id: session.user.id });
//         setFolders(folders);
//       } catch (error) {
//         console.error("Error fetching folders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isOpen && status === "authenticated") {
//       fetchFolders();
//     }
//   }, [isOpen, session?.user?.id, status]);

//   const handleFolderSelection = (folderId: string) => {
//     setSelectedFolderId(folderId);
//   };

//   const handleCreateFolder = async () => {
//     if (!newFolderName.trim()) {
//       alert("Please enter a folder name.");
//       return;
//     }

//     if (!session?.user?.id) {
//       alert("You must be logged in to create a folder. ");
//       return;
//     }

//     try {
//       const newFolder = await createFolder({
//         id: session.user.id,
//         name: newFolderName,
//       });

//       const folderWithPrograms: Folder = {
//         ...newFolder,
//         Programs: [],
//       };

//       setFolders((prev) => [...prev, folderWithPrograms]);
//       setSelectedFolderId(newFolder.id);
//       setIsCreatingFolder(false);
//       setNewFolderName("");
//     } catch (error) {
//       console.error("Error creating folder:", error);
//       alert("Failed to create folder. Please try again.");
//     }
//   };

//   const handleSaveProgram = async () => {
//     const { getCode } = useCodeEditorStore.getState();

//     const code = getCode();

//     if (!selectedFolderId) {
//       alert("Please select a folder to save the program.");
//       return;
//     }

//     if (!programName.trim()) {
//       alert("Please enter a program name.");
//       return;
//     }

//     if (status !== "authenticated" || !session?.user?.id) {
//       alert("You must be logged in to save a program.");
//       return;
//     }

//     try {
//       await createAndAssignProgram({
//         id: session.user.id,
//         folderId: selectedFolderId,
//         name: programName,
//         description: description,
//         code: code,
//         approach: approach,
//         tc: tc,
//         sc: sc,
//       });

//       alert("Program saved successfully!");
//       onClose();
//     } catch (error) {
//       console.error("Error saving program:", error);
//       alert("Failed to save program. Please try again.");
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose} >
//       <DialogContent className="max-w-2xl p-4 border-zinc-700 space-y-2">
//         <DialogHeader>
//           <DialogTitle className="text-2xl tracking-tighter font-semibold">Save Program</DialogTitle>
//         </DialogHeader>

//         {status !== "authenticated" ? (
//           <div className="text-center">
//             <p className="text-sm text-zinc-400 mb-4">
//               You must be logged in to save a program. NOTE: <span className="text-red-500 font-semibold">YOUR CODE WILL NOT BE SAVED</span>
//             </p>
//             <Link href="/auth/signin">
//               <Button variant="default" className="h-5 text-sm">
//                 Sign In
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="space-y-2">
//               <label htmlFor="program-name" className="text-sm font-medium">
//                 Program Name <span className="text-red-500">*</span>
//               </label>
//               <Input
//                 id="program-name"
//                 placeholder="Enter program name"
//                 value={programName}
//                 onChange={(e) => setProgramName(e.target.value)}
//                 className="w-full h-8 text-sm"
//               />
//             </div>

//             <div className="space-y-2 mt-3">
//               <label htmlFor="folder-select" className="text-sm font-medium">
//                 Select Folder <span className="text-red-500">*</span>
//               </label>
//               {isLoading ? (
//                 <Skeleton className="h-8 w-full" />
//               ) : (
//                 <div className="flex gap-2">
//                   <select
//                     id="folder-select"
//                     className="w-full h-8 text-sm p-1 border rounded"
//                     value={selectedFolderId || ""}
//                     onChange={(e) => handleFolderSelection(e.target.value)}
//                   >
//                     <option value="" disabled>Select a folder</option>
//                     {folders.map((folder) => (
//                       <option key={folder.id} value={folder.id}>{folder.name}</option>
//                     ))}
//                   </select>
//                   {!isCreatingFolder && (
//                     <Button
//                       variant="link"
//                       onClick={() => setIsCreatingFolder(true)}
//                       className="text-sm h-8 p-0"
//                     >
//                       + New Folder
//                     </Button>
//                   )}
//                 </div>
//               )}

//               {isCreatingFolder && (
//                 <div className="space-y-2 mt-2">
//                   <div className="flex gap-2">
//                     <Input
//                       id="new-folder-name"
//                       placeholder="Enter folder name"
//                       value={newFolderName}
//                       onChange={(e) => setNewFolderName(e.target.value)}
//                       className="flex-1 h-8 text-sm"
//                     />
//                     <Button onClick={handleCreateFolder} className="h-8 text-sm">
//                       Create
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => setIsCreatingFolder(false)}
//                       className="h-8 text-sm"
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <DialogFooter className="mt-4">
//               <Button
//                 onClick={handleSaveProgram}
//                 disabled={!selectedFolderId || !programName.trim()}
//                 className="h-8 text-sm"
//               >
//                 Save
//               </Button>
//               <Button variant="outline" onClick={onClose} className="h-8 text-sm">
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SaveProgramModal;

// // const SaveProgramModal = ({ isOpen, onClose }: SaveProgramModalProps) => {
// //   const [folders, setFolders] = useState<Folder[]>([]);
// //   const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
// //   const [isCreatingFolder, setIsCreatingFolder] = useState(false); // State for creating a new folder
// //   const [newFolderName, setNewFolderName] = useState(""); // State for new folder name
// //   const [programName, setProgramName] = useState(""); // State for program name
// //   const [description] = useState(""); // State for program description
// //   const [approach] = useState(""); // State for approach
// //   const [tc] = useState(""); // State for time complexity
// //   const [sc] = useState(""); // State for space complexity
// //   const [isLoading, setIsLoading] = useState(true); // State for loading folders
// //   const { data: session, status } = useSession();

// //   useEffect(() => {
// //     const fetchFolders = async () => {
// //       if (!session?.user?.id) return;

// //       try {
// //         const folders = await getFolders({ id: session.user.id }); // Use server action to fetch folders
// //         setFolders(folders);
// //       } catch (error) {
// //         console.error("Error fetching folders:", error);
// //       } finally {
// //         setIsLoading(false); // Stop loading after fetching
// //       }
// //     };

// //     if (isOpen && status === "authenticated") {
// //       fetchFolders();
// //     }
// //   }, [isOpen, session?.user?.id, status]);

// //   const handleFolderSelection = (folderId: string) => {
// //     setSelectedFolderId(folderId);
// //   };

// //   const handleCreateFolder = async () => {
// //     if (!newFolderName.trim()) {
// //       alert("Please enter a folder name.");
// //       return;
// //     }

// //     if (!session?.user?.id) {
// //       alert("You must be logged in to create a folder.");
// //       return;
// //     }

// //     try {
// //       const newFolder = await createFolder({
// //         id: session.user.id,
// //         name: newFolderName,
// //       });
// //       setFolders((prev) => [...prev, newFolder]); // Add the new folder to the list
// //       setSelectedFolderId(newFolder.id); // Select the newly created folder
// //       setIsCreatingFolder(false); // Exit folder creation mode
// //       setNewFolderName(""); // Clear the input
// //     } catch (error) {
// //       console.error("Error creating folder:", error);
// //       alert("Failed to create folder. Please try again.");
// //     }
// //   };

// //   const handleSaveProgram = async () => {
// //     const { getCode, userInput, output } = useCodeEditorStore.getState();

// //     const code = getCode();
// //     const input = userInput;
// //     const result = output;

// //     if (!selectedFolderId) {
// //       alert("Please select a folder to save the program.");
// //       return;
// //     }

// //     if (!programName.trim()) {
// //       alert("Please enter a program name.");
// //       return;
// //     }

// //     if (status !== "authenticated" || !session?.user?.id) {
// //       alert("You must be logged in to save a program.");
// //       return;
// //     }

// //     try {
// //       await createAndAssignProgram({
// //         id: session.user.id,
// //         folderId: selectedFolderId,
// //         name: programName, // Use the provided program name
// //         description: description, // Use the provided description
// //         code: code,
// //         approach: approach, // Use the provided approach
// //         tc: tc, // Use the provided time complexity
// //         sc: sc, // Use the provided space complexity
// //       });

// //       alert("Program saved successfully!");
// //       onClose();
// //     } catch (error) {
// //       console.error("Error saving program:", error);
// //       alert("Failed to save program. Please try again.");
// //     }
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="max-w-2xl p-4 border-zinc-700">
// //         <DialogHeader>
// //           <DialogTitle className="text-2xl tracking-tighter font-semibold">Save Program</DialogTitle>
// //         </DialogHeader>

// //         {/* Show message if user is not authenticated */}
// //         {status !== "authenticated" ? (
// //           <div className="text-center">
// //             <p className="text-sm text-zinc-400 mb-4">
// //               You must be logged in to save a program.
// //             </p>
// //             <Link href="/auth/signin">
// //               <Button variant="default" className="h-8 text-sm">
// //                 Sign In
// //               </Button>
// //             </Link>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Program Name */}
// //             <div className="space-y-2">
// //               <label htmlFor="program-name" className="text-sm font-medium">
// //                 Program Name <span className="text-red-500">*</span>
// //               </label>
// //               <Input
// //                 id="program-name"
// //                 placeholder="Enter program name"
// //                 value={programName}
// //                 onChange={(e) => setProgramName(e.target.value)}
// //                 className="w-full h-8 text-sm"
// //               />
// //             </div>

// //             {/* Folder Selection */}
// //             <div className="space-y-2 mt-3">
// //               <label htmlFor="folder-select" className="text-sm font-medium">
// //                 Select Folder <span className="text-red-500">*</span>
// //               </label>
// //               {isLoading ? (
// //                 <Skeleton className="h-8 w-full" />
// //               ) : (
// //                 <div className="flex gap-2">
// //                   <select
// //                     id="folder-select"
// //                     className="w-full h-8 text-sm p-1 border rounded"
// //                     value={selectedFolderId || ""}
// //                     onChange={(e) => handleFolderSelection(e.target.value)}
// //                   >
// //                     <option value="" disabled>Select a folder</option>
// //                     {folders.map((folder) => (
// //                       <option key={folder.id} value={folder.id}>{folder.name}</option>
// //                     ))}
// //                   </select>
// //                   {!isCreatingFolder && (
// //                     <Button
// //                       variant="link"
// //                       onClick={() => setIsCreatingFolder(true)}
// //                       className="text-sm h-8 p-0"
// //                     >
// //                       + New Folder
// //                     </Button>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Create New Folder */}
// //               {isCreatingFolder && (
// //                 <div className="space-y-2 mt-2">
// //                   <div className="flex gap-2">
// //                     <Input
// //                       id="new-folder-name"
// //                       placeholder="Enter folder name"
// //                       value={newFolderName}
// //                       onChange={(e) => setNewFolderName(e.target.value)}
// //                       className="flex-1 h-8 text-sm"
// //                     />
// //                     <Button onClick={handleCreateFolder} className="h-8 text-sm">
// //                       Create
// //                     </Button>
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => setIsCreatingFolder(false)}
// //                       className="h-8 text-sm"
// //                     >
// //                       Cancel
// //                     </Button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dialog Footer */}
// //             <DialogFooter className="mt-4">
// //               <Button
// //                 onClick={handleSaveProgram}
// //                 disabled={!selectedFolderId || !programName.trim()}
// //                 className="h-8 text-sm"
// //               >
// //                 Save
// //               </Button>
// //               <Button variant="outline" onClick={onClose} className="h-8 text-sm">
// //                 Cancel
// //               </Button>
// //             </DialogFooter>
// //           </>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default SaveProgramModal;



"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { getFolders, createAndAssignProgram, createFolder } from "@/lib/actions/profileActions"
import Link from "next/link"
import { PlusCircle, Save, FolderPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface Program {
  id: string
  name: string
  userId: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  code: string | null
  foldersId: string
  approach: string | null
  tc: string | null
  sc: string | null
}

interface Folder {
  id: string
  name: string
  userId: string
  description: string | null
  createdAt: Date
  Programs: Program[]
}

interface SaveProgramModalProps {
  isOpen: boolean
  onClose: () => void
}

const SaveProgramModal = ({ isOpen, onClose }: SaveProgramModalProps) => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [programName, setProgramName] = useState("")
  const [description] = useState("")
  const [approach] = useState("")
  const [tc] = useState("")
  const [sc] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchFolders = async () => {
      if (!session?.user?.id) return

      try {
        const folders = await getFolders({ id: session.user.id })
        setFolders(folders)
      } catch (error) {
        console.error("Error fetching folders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen && status === "authenticated") {
      fetchFolders()
    }
  }, [isOpen, session?.user?.id, status])

  const handleFolderSelection = (folderId: string) => {
    setSelectedFolderId(folderId)
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert("Please enter a folder name.")
      return
    }

    if (!session?.user?.id) {
      alert("You must be logged in to create a folder.")
      return
    }

    try {
      const newFolder = await createFolder({
        id: session.user.id,
        name: newFolderName,
      })

      const folderWithPrograms: Folder = {
        ...newFolder,
        Programs: [],
      }

      setFolders((prev) => [...prev, folderWithPrograms])
      setSelectedFolderId(newFolder.id)
      setIsCreatingFolder(false)
      setNewFolderName("")
    } catch (error) {
      console.error("Error creating folder:", error)
      alert("Failed to create folder. Please try again.")
    }
  }

  const handleSaveProgram = async () => {
    const { getCode } = useCodeEditorStore.getState()

    const code = getCode()

    if (!selectedFolderId) {
      alert("Please select a folder to save the program.")
      return
    }

    if (!programName.trim()) {
      alert("Please enter a program name.")
      return
    }

    if (status !== "authenticated" || !session?.user?.id) {
      alert("You must be logged in to save a program.")
      return
    }

    try {
      await createAndAssignProgram({
        id: session.user.id,
        folderId: selectedFolderId,
        name: programName,
        description: description,
        code: code,
        approach: approach,
        tc: tc,
        sc: sc,
      })

      alert("Program saved successfully!")
      onClose()
    } catch (error) {
      console.error("Error saving program:", error)
      alert("Failed to save program. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 border border-zinc-300/20  rounded-lg shadow-lg bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-tighter">Save Program</DialogTitle>
        </DialogHeader>

        {status !== "authenticated" ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              You need to sign in to save your program
              <span className="block mt-1 text-red-500 text-md font-medium">Your code will not be saved</span>
            </p>
            <Link href="/auth/signin">
              <Button variant="default" size="sm" className="w-full h-5">
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="program-name" className="text-sm font-medium">
                Program Name
              </Label>
              <Input  
                id="program-name"
                placeholder="Enter program name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="folder-select" className="text-sm font-medium">
                  Select Folder
                </Label>
                {!isCreatingFolder && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreatingFolder(true)}
                    className="h-7 px-2 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    New Folder
                  </Button>
                )}
              </div>

              {isLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <Select value={selectedFolderId || ""} onValueChange={handleFolderSelection}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select a folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {isCreatingFolder && (
                <Card className="p-3 mt-2 border border-border/50 bg-muted/30">
                  <div className="space-y-2">
                    <Label htmlFor="new-folder-name" className="text-xs font-medium">
                      New Folder Name
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="new-folder-name"
                        placeholder="Enter folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="h-8 text-sm flex-1"
                      />
                      <Button size="sm" className="h-8 px-3" onClick={handleCreateFolder}>
                        <FolderPlus className="h-3.5 w-3.5 mr-1" />
                        Create
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCreatingFolder(false)}
                      className="h-7 text-xs w-full mt-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            <DialogFooter className="pt-2">
              <Button variant="outline" size="sm" onClick={onClose} className="h-9">
                Cancel
              </Button>
              <Button
                onClick={handleSaveProgram}
                disabled={!selectedFolderId || !programName.trim()}
                className="h-9"
                size="sm"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Program
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SaveProgramModal
