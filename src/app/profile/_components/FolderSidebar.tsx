// "use client"

// import { useState } from "react"
// import { createFolder } from "@/lib/actions/profileActions"
// import { ChevronDown, ChevronRight, File, Folder, FolderPlus, MoreHorizontal, Plus } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface FolderSidebarProps {
//   userId: string | null
//   folders: any[]
//   selectedFolderId: string | null
//   setSelectedFolderId: (id: string) => void
//   refreshFolders: () => Promise<void>
//   isLoading: boolean
// }

// export default function FolderSidebar({
//   userId,
//   folders,
//   selectedFolderId,
//   setSelectedFolderId,
//   refreshFolders,
//   isLoading,
// }: FolderSidebarProps) {
//   const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

//   const handleCreateFolder = async () => {
//     try {
//       if (userId) {
//         await createFolder()
//         refreshFolders()
//       }
//     } catch (err) {
//       console.log("Error creating folder", err)
//     }
//   }
//   const handleSuccess = async () => {
//       if (userId && folderId) {
//         const result = await listProgramsByLates({ userId, folderId })
//         setProgramList(result)
//       }
//     }

//   const toggleFolder = (folderId: string) => {
//     setExpandedFolders((prev) => ({
//       ...prev,
//       [folderId]: !prev[folderId],
//     }))
//   }

//   return (
//     <div className="w-64 border-r border-border flex flex-col h-full bg-muted/10">
//       <div className="p-3 flex items-center justify-between border-b border-border">
//         {/* <h3 className="font-medium text-sm">Create a new Folder </h3>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-7 w-7 rounded-sm hover:bg-muted"
//                 onClick={handleCreateFolder}
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="bottom">
//               <p>New folder</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider> */}

//         <CreateFolderForm  userId = {userId} onSuccess= {handleSuccess}/>
//       </div>

//       <div className="overflow-y-auto flex-1 py-2">
//         {isLoading ? (
//           <div className="space-y-2 px-3">
//             <Skeleton className="h-6 w-full" />
//             <Skeleton className="h-6 w-full" />
//             <Skeleton className="h-6 w-full" />
//           </div>
//         ) : folders.length === 0 ? (
//           <div className="px-4 py-3 text-sm text-muted-foreground">
//             <p>No folders yet</p>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="mt-2 w-full justify-start text-xs"
//               onClick={handleCreateFolder}
//             >
//               <FolderPlus className="mr-2 h-4 w-4" />
//               Create your first folder
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-1">
//             {folders.map((folder) => (
//               <div key={folder.id} className="px-1">
//                 <div
//                   className={cn(
//                     "flex items-center px-2 py-1.5 text-sm rounded-sm group cursor-pointer",
//                     selectedFolderId === folder.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/50",
//                   )}
//                   onClick={() => setSelectedFolderId(folder.id)}
//                 >
//                   <button
//                     className="mr-1 h-4 w-4 flex items-center justify-center text-muted-foreground"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       toggleFolder(folder.id)
//                     }}
//                   >
//                     {expandedFolders[folder.id] ? (
//                       <ChevronDown className="h-3.5 w-3.5" />
//                     ) : (
//                       <ChevronRight className="h-3.5 w-3.5" />
//                     )}
//                   </button>
//                   <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
//                   <span className="flex-1 truncate">{folder.name}</span>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-40">
//                       <DropdownMenuItem>Rename</DropdownMenuItem>
//                       <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>

//                 {expandedFolders[folder.id] && (
//                   <div className="ml-4 pl-2 border-l border-border mt-1 space-y-1">
//                     {/* This would show programs, but we'll handle that in the main content area */}
//                     <div className="flex items-center px-2 py-1 text-sm rounded-sm text-muted-foreground hover:bg-muted/50 cursor-pointer">
//                       <File className="h-3.5 w-3.5 mr-2" />
//                       <span className="truncate">Programs</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder, FolderPlus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CreateFolderForm from "./CreateFolderForm";

interface FolderSidebarProps {
  userId: string | null;
  folders: any[];
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string) => void;
  refreshFolders: () => Promise<void>;
  isLoading: boolean;
}

export default function FolderSidebar({
  userId,
  folders,
  selectedFolderId,
  setSelectedFolderId,
  refreshFolders,
  isLoading,
}: FolderSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="w-64 border-r border-border flex flex-col h-full bg-muted/10">
      <div className="p-3 flex items-center justify-between border-b border-border">
        <CreateFolderForm userId={userId} onSuccess={refreshFolders} />
      </div>

      <div className="overflow-y-auto flex-1 py-2">
        {isLoading ? (
          <div className="space-y-2 px-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : folders.length === 0 ? (
          <div className="px-4 py-3 text-sm text-muted-foreground">
            <p>No folders yet</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full justify-start text-xs"
              onClick={() => refreshFolders()}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Create your first folder
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder) => (
              <div key={folder.id} className="px-1">
                <div
                  className={cn(
                    "flex items-center px-2 py-1.5 text-sm rounded-sm group cursor-pointer",
                    selectedFolderId === folder.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/50",
                  )}
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  <button
                    className="mr-1 h-4 w-4 flex items-center justify-center text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFolder(folder.id);
                    }}
                  >
                    {expandedFolders[folder.id] ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="flex-1 truncate">{folder.name}</span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {expandedFolders[folder.id] && (
                  <div className="ml-4 pl-2 border-l border-border mt-1 space-y-1">
                    <div className="flex items-center px-2 py-1 text-sm rounded-sm text-muted-foreground hover:bg-muted/50 cursor-pointer">
                      <File className="h-3.5 w-3.5 mr-2" />
                      <span className="truncate">Programs</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}