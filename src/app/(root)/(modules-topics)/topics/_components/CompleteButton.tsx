"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { questionUserProgress } from "@/lib/actions/ideActions";

export function CompleteButton({
  userId,
  contentId,
  isCompleted: initialIsCompleted,
}: {
  userId: string;
  contentId: string;
  isCompleted: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      try {
        // Toggle the completion status
        await questionUserProgress({
          id: contentId,
          userId,
          completed: !isCompleted,
        });

        // Update the local state
        setIsCompleted(!isCompleted);

        // Show a success toast
        toast.success(
          isCompleted ? "Marked as incomplete." : "Marked as completed."
        );
      } catch (error) {
        // Show an error toast
        console.error("Error updating progress:", error);
        toast.error("Failed to update progress.");
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      variant={isCompleted ? "default" : "outline"}
      className="flex items-center gap-2"
    >
      <CheckCircle className="w-4 h-4" />
      {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
    </Button>
  );
}