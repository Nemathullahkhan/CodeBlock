"use client"

import { Button } from "@/components/ui/button";
import { questionCompleted } from "@/lib/actions/ideActions";

export default function SubmitButton({id}:{id:string}) {
    
    const handleButton = async ()=>{
        const something = await questionCompleted({id});
        console.log(something);
    }
  return (
    <Button  variant = {"secondary"}  className= "w-24 bg-gradient-to-tr from-emerald-500 text-white font-bold to-emerald-700"onClick={handleButton}>SUBMIT </Button>
  );
}

// "use client"

// import { Button } from "@/components/ui/button"
// import { questionCompleted } from "@/lib/actions/ideActions"
// import { useState } from "react"
// import { CheckCircle, Loader2 } from "lucide-react"

// export default function SubmitButton({ id }: { id: string }) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)

//   const handleButton = async () => {
//     try {
//       setIsSubmitting(true)
//       const result = await questionCompleted({ id })
//       console.log(result)
//       setIsSuccess(true)

//       // Reset success state after 3 seconds
//       setTimeout(() => {
//         setIsSuccess(false)
//       }, 3000)
//     } catch (error) {
//       console.error("Error submitting solution:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Button
//       onClick={handleButton}
//       disabled={isSubmitting}
//       className={`font-medium ${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-[#238636] hover:bg-[#2ea043]"}`}
//     >
//       {isSubmitting ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Submitting...
//         </>
//       ) : isSuccess ? (
//         <>
//           <CheckCircle className="mr-2 h-4 w-4" />
//           Submitted!
//         </>
//       ) : (
//         "Submit"
//       )}
//     </Button>
//   )
// }

