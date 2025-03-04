"use client";

import { Button } from "@/components/ui/button";
import { questionCompleted } from "@/lib/actions/ideActions";

export default function SubmitButton({ id, disabled }: { id: string; disabled?: boolean }) {
  const handleButton = async () => {
    const something = await questionCompleted({ id });
    console.log(something);
  };

  return (
    <Button
      variant={"secondary"}
      className="w-24 bg-gradient-to-tr from-emerald-500 text-white font-bold to-emerald-700"
      onClick={handleButton}
      disabled={disabled} // Disable button based on the prop
    >
      {disabled === true ? "Already Submitted" :"Submit"}
    </Button>
  );
}