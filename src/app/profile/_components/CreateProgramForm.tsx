"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAndAssignProgram } from "@/lib/actions/profileActions"
import { FilePlus, Code } from "lucide-react"
import dynamic from "next/dynamic"
import { Label } from "@/components/ui/label"

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), { ssr: false })

// Common time and space complexity options
const complexityOptions = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(n³)", "O(2ⁿ)", "O(n!)"]

// Programming language options with icons
const languageOptions = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
]

interface CreateProgramFormProps {
  userId: string | null
  folderId: string | null
  onSuccess: () => void
}

export default function CreateProgramForm({ userId, folderId, onSuccess }: CreateProgramFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [approach, setApproach] = useState("")
  const [tc, setTc] = useState("O(1)")
  const [sc, setSc] = useState("O(1)")
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("javascript")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (userId && folderId) {
        await createAndAssignProgram({
          id: userId,
          folderId,
          name,
          description,
          code,
          approach,
          tc,
          sc,
        })
        onSuccess() // Refresh the program list
        setIsOpen(false) // Close the dialog
      }
    } catch (err) {
      console.log("Error creating program", err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-7  hover:bg-zinc-200 flex items-center gap-2 px-4 py-2 rounded-md">
          <FilePlus className="h-4 w-4" />
          New Program
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col overflow-hidden border-zinc-700 bg-zinc-900 text-zinc-100">
        <DialogHeader className="pb-4 border-b border-zinc-700">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Code size={20} /> Create New Program
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new program with description, approach, and complexity analysis.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto px-2 py-4 pb-6">
          {/* Program name section */}
          <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
            <Label htmlFor="name" className="text-sm font-medium min-w-24">
              Program Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter program name"
              className="flex-1 text-lg rounded-md bg-zinc-800 border-zinc-700 focus-visible:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Description - takes 2/3 of the width */}
            <div className="md:col-span-2 border border-zinc-700 rounded-md overflow-hidden">
              <div className="bg-zinc-800 p-2 border-b border-zinc-700">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter program description"
                className="h-32 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-900 text-zinc-200 p-3"
              />
            </div>

            {/* Complexity section - takes 1/3 of the width */}
            <div className="space-y-4">
              <div className="border border-zinc-700 rounded-md overflow-hidden">
                <div className="bg-zinc-800 p-2 border-b border-zinc-700">
                  <Label htmlFor="tc" className="text-sm font-medium">
                    Time Complexity
                  </Label>
                </div>
                <div className="p-2">
                  <Select value={tc} onValueChange={setTc}>
                    <SelectTrigger className="border-zinc-700 bg-zinc-900 focus:ring-green-500">
                      <SelectValue placeholder="Time Complexity" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {complexityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border border-zinc-700 rounded-md overflow-hidden">
                <div className="bg-zinc-800 p-2 border-b border-zinc-700">
                  <Label htmlFor="sc" className="text-sm font-medium">
                    Space Complexity
                  </Label>
                </div>
                <div className="p-2">
                  <Select value={sc} onValueChange={setSc}>
                    <SelectTrigger className="border-zinc-700 bg-zinc-900 focus:ring-green-500">
                      <SelectValue placeholder="Space Complexity" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {complexityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Code editor section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 border border-zinc-700 rounded-md overflow-hidden">
              <div className="bg-zinc-800 p-2 border-b border-zinc-700 flex justify-between items-center">
                <Label htmlFor="code" className="text-sm font-medium">
                  Source Code
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-40 text-sm h-8 bg-zinc-900 border-zinc-700 focus:ring-green-500">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-64 overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            <div className="border border-zinc-700 rounded-md overflow-hidden flex flex-col h-64">
              <div className="bg-zinc-800 p-2 border-b border-zinc-700">
                <Label htmlFor="approach" className="text-sm font-medium">
                  Approach
                </Label>
              </div>
              <Textarea
                id="approach"
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                placeholder="Describe your approach and algorithm"
                className="flex-grow resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-900 text-zinc-200 p-3"
              />
              <div className="p-4 bg-zinc-800 border-t border-zinc-700 flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded-md flex items-center gap-2"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}