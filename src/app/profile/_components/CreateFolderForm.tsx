"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFolder } from "@/lib/actions/profileActions";
import { DialogTitle } from "@radix-ui/react-dialog";
import {  Folder, Plus } from "lucide-react";
import { useState } from "react";

interface CreateFolderFormProps {
  userId: string | null;
  onSuccess: () => void;
}

export default function CreateFolderForm({
  userId,
  onSuccess,
}: CreateFolderFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userId) {
        await createFolder({
          id: userId,
          name,
          description,
        });
        onSuccess(); // Refresh the folder list
        setIsOpen(false); // Close the dialog
        setName(""); // Reset the name field
        setDescription(""); // Reset the description field
      }
    } catch (err) {
      console.log("Error creating folder", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-full justify-between  flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-800"
        >
          <div className="flex gap-2">
            <Folder className="h-4 w-4" />
            New Folder
          </div>
          <Plus className="flex justify-end h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl h-[65vh] flex flex-col overflow-hidden border-zinc-700 bg-zinc-900 text-zinc-100">
        <DialogHeader className="pb-1 border-b border-zinc-700">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Folder size={20} /> Create New Folder
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new folder with a name and description.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 flex-1 overflow-y-auto px-2 py-2 pb-4"
        >
          <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3">
            <Label htmlFor="name" className="text-sm font-medium min-w-24">
              Folder Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name"
              className="flex-1 text-lg pb-1 h-7 rounded-md bg-zinc-800 border-zinc-700 "
              required
            />
          </div>
          <div className="flex items-center gap-1.5 border-b -pt-4 border-zinc-800 pb-4">
            <Label
              htmlFor="description"
              className="text-sm font-medium min-w-24"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter folder description"
              className="flex-1 text-lg rounded-md bg-zinc-800 border-zinc-700 resize-none h-32 overflow-y-auto"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded-md w-32 h-6"
            >
              Create Folder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
