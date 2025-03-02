"use client"

import { Button } from "@/components/ui/button";
import { questionCompleted } from "@/lib/actions/ideActions";

export default function SubmitButton({id}:{id:string}) {
    
    const handleButton = async ()=>{
        const something = await questionCompleted({id});
        console.log(something);
    }
  return (
    <Button onClick={handleButton}>SUBMIT </Button>
  );
}