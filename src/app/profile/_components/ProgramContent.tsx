"use client"

import { useState, useEffect } from "react"
import { renameProgram, deleteProgram, listProgramsByLatest } from "@/lib/actions/profileActions"
import { Button } from "@/components/ui/button"
import { File, MoreHorizontal, Calendar, Code, Pencil } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import CreateProgramForm from "./CreateProgramForm"

interface ProgramContentProps {
  userId: string | null
  folderId: string | null
  folderList: any[]
}

export default function ProgramContent({ userId, folderId, folderList }: ProgramContentProps) {
  const [programList, setProgramList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null)

  const currentFolder = folderList.find((folder) => folder.id === folderId)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        if (userId && folderId) {
          setIsLoading(true)
          const result = await listProgramsByLatest({ userId, folderId })
          setProgramList(result)
          setIsLoading(false)
        }
      } catch (err) {
        console.log("Error fetching programs", err)
        setIsLoading(false)
      }
    }

    if (folderId) {
      fetchPrograms()
    } else {
      setProgramList([])
    }
  }, [userId, folderId])

  const handleSuccess = async () => {
    if (userId && folderId) {
      const result = await listProgramsByLatest({ userId, folderId })
      setProgramList(result)
    }
  }

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
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentFolder?.name || "Programs"}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {programList.length} {programList.length === 1 ? "program" : "programs"}
            </p>
          </div>
          <CreateProgramForm userId={userId} folderId={folderId} onSuccess={handleSuccess} />
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
            <p className="text-muted-foreground mb-4">Create your first program in this folder.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {programList.map((program) => (
              <div
                key={program.id}
                className={cn(
                  "border border-border rounded-md p-4 hover:bg-muted/30 transition-colors cursor-pointer group",
                  selectedProgramId === program.id && "bg-muted/50",
                )}
                onClick={() => setSelectedProgramId(program.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{program.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {program.updatedAt
                            ? `Updated ${formatDistanceToNow(new Date(program.updatedAt), { addSuffix: true })}`
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

                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={async () => {
                            const newName = prompt("Enter new program name");
                            if (newName) {
                              await renameProgram({ programId: program.id, newName });
                              handleSuccess(); // Refresh the program list
                            }
                          }}
                        >
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={async () => {
                            const confirmDelete = confirm("Are you sure you want to delete this program?");
                            if (confirmDelete) {
                              await deleteProgram({ programId: program.id });
                              handleSuccess(); // Refresh the program list
                            }
                          }}
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
    </div>
  )
}