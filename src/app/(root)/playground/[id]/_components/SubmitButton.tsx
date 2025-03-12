// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { questionCompleted } from "@/lib/actions/ideActions";

// // export default function SubmitButton({ id, disabled }: { id: string; disabled?: boolean }) {
// //   const handleButton = async () => {
// //     const something = await questionCompleted({ id });
// //     console.log(something);
// //   };

// //   return (
// //     <Button
// //       variant={"secondary"}
// //       className="w-24 bg-gradient-to-tr from-emerald-500 text-white font-bold to-emerald-700"
// //       onClick={handleButton}
// //       disabled={disabled} // Disable button based on the prop
// //     >
// //       {disabled === true ? "Already Submitted" :"Submit"}
// //     </Button>
// //   );
// // }
// "use client";

// import { useState, useTransition, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   questionUserProgress,
//   checkUserProgress,
// } from "@/lib/actions/ideActions";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// export default function SubmitButton({
//   id,
//   disabled,
// }: {
//   id: string;
//   disabled?: boolean;
// }) {
//   const [isPending, startTransition] = useTransition();
//   const { data: session, status } = useSession();
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   // Check if user has already completed this problem
//   useEffect(() => {
//     if (status === "loading") return;

//     const checkCompletion = async () => {
//       if (!session?.user?.id) {
//         setIsChecking(false);
//         return;
//       }

//       try {
//         // Add this server action to check if the user has completed the problem
//         const progress = await checkUserProgress({
//           id,
//           userId: session.user.id,
//         });
//         setIsCompleted(progress?.completed || false);
//       } catch (error) {
//         console.error("Error checking completion status:", error);
//       } finally {
//         setIsChecking(false);
//       }
//     };

//     checkCompletion();
//   }, [id, session, status]);

//   const handleSubmit = () => {
//     if (!session?.user?.id) {
//       toast(
//         "Authentication required,Please sign in to track your progress.destructive"
//       );
//       return;
//     }

//     startTransition(async () => {
//       try {
//         // Call the server action to update user progress
//         const result = await questionUserProgress({
//           id: id,
//           userId: session.user.id,
//           completed: true,
//         });

//         setIsCompleted(true);

//         // Show success notification
//         toast("Progress saved!,This problem has been marked as completed.");

//         console.log("Progress updated:", result);
//       } catch (error: any) {
//         console.error("Error updating progress:", error);
//         toast("Error, Failed to update progress");
//       }
//     });
//   };

//   // Button state logic
//   const buttonText = () => {
//     if (isChecking) return "Checking...";
//     if (isPending) return "Saving...";
//     if (isCompleted) return "Completed";
//     if (disabled) return "Already Submitted";
//     return "Submit";
//   };

//   return (
//     <Button
//       variant={"secondary"}
//       className={`w-24 font-bold ${
//         isCompleted
//           ? "bg-green-600 hover:bg-green-700"
//           : "bg-gradient-to-tr from-emerald-500 to-emerald-700"
//       } text-white`}
//       onClick={handleSubmit}
//       disabled={disabled || isPending || isCompleted || isChecking}
//     >
//       {buttonText()}
//     </Button>
//   );
// }

// "use client";

// import { useState, useTransition, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   questionUserProgress,
//   checkUserProgress,
// } from "@/lib/actions/ideActions";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";

// export default function SubmitButton({
//   id,
//   disabled,
// }: {
//   id: string;
//   disabled?: boolean;
// }) {
//   const [isPending, startTransition] = useTransition();
//   const { data: session, status } = useSession();
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   const { runAndVerifyCode, testCaseResults, isRunning } = useCodeEditorStore();

//   // Check if user has already completed this problem
//   useEffect(() => {
//     if (status === "loading") return;

//     const checkCompletion = async () => {
//       if (!session?.user?.id) {
//         setIsChecking(false);
//         return;
//       }

//       try {
//         // Check if the user has completed the problem
//         const progress = await checkUserProgress({
//           id,
//           userId: session.user.id,
//         });
//         setIsCompleted(progress?.completed || false);
//       } catch (error) {
//         console.error("Error checking completion status:", error);
//       } finally {
//         setIsChecking(false);
//       }
//     };

//     checkCompletion();
//   }, [id, session, status]);

//   const handleSubmit = () => {
//     if (!session?.user?.id) {
//       toast("Authentication required. Please sign in to track your progress.", {
//         type: "error",
//       });
//       return;
//     }

//     startTransition(async () => {
//       try {
//         // Run and verify the code
//         await runAndVerifyCode();

//         // Check if all test cases passed
//         const allPassed = testCaseResults.every((result) => result.passed);

//         if (allPassed) {
//           // Save progress if all test cases passed
//           const result = await questionUserProgress({
//             id: id,
//             userId: session.user.id,
//             completed: true,
//           });

//           setIsCompleted(true);

//           // Show success notification
//           toast("All test cases passed! Progress saved.", { type: "success" });

//           console.log("Progress updated:", result);
//         } else {
//           // Show error if any test case fails
//           toast("Some test cases failed. Please try again.", { type: "error" });
//         }
//       } catch (error: any) {
//         console.error("Error updating progress:", error);
//         toast("Error running code. Please try again.", { type: "error" });
//       }
//     });
//   };

//   // Button state logic
//   const buttonText = () => {
//     if (isChecking) return "Checking...";
//     if (isPending) return "Saving...";
//     return "Submit";
//   };

//   return (
//     <Button
//       variant={"secondary"}
//       className={`w-24 font-bold ${
//         isCompleted
//           ? "bg-green-600 hover:bg-green-700"
//           : "bg-gradient-to-tr from-emerald-500 to-emerald-700"
//       } text-white`}
//       onClick={handleSubmit}
//       disabled={disabled || isPending  || isChecking}
//     >
//       {buttonText()}
//     </Button>
//   );
// }

"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  questionUserProgress,
  checkUserProgress,
} from "@/lib/actions/ideActions";
import { useSession } from "next-auth/react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { renderTimenSpace } from "@/lib/actions/rendering";


export default function SubmitButton({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description: string;
    passedTestCases: number;
    totalTestCases: number;
    timeComplexity: string;
    spaceComplexity: string;
  } | null>(null);

  const { runAndVerifyCode, testCaseResults, isRunning } = useCodeEditorStore();

  // Check if user has already completed this problem
  useEffect(() => {
    if (status === "loading") return;

    const checkCompletion = async () => {
      if (!session?.user?.id) {
        setIsChecking(false);
        return;
      }

      try {
        // Check if the user has completed the problem
        const progress = await checkUserProgress({
          id,
          userId: session.user.id,
        });
        setIsCompleted(progress?.completed || false);
      } catch (error) {
        console.error("Error checking completion status:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkCompletion();
  }, [id, session, status]);

  const handleSubmit = () => {
    if (!session?.user?.id) {
      alert("Authentication required. Please sign in to track your progress.");
      return;
    }

    startTransition(async () => {
      try {
        // Run and verify the code
        await runAndVerifyCode();

        // Fetch time and space complexity using the server action
        const complexity = await renderTimenSpace({ id });

        // Check if all test cases passed
        const passedTestCases = testCaseResults.filter(
          (result) => result.passed
        ).length;
        const totalTestCases = testCaseResults.length;
        const allPassed = passedTestCases === totalTestCases;

        // Set dialog content based on the results
        setDialogContent({
          title: allPassed ? "Success!" : "Test Cases Failed",
          description: allPassed
            ? "All test cases passed! Your progress has been saved."
            : "Some test cases failed. Please review your code and try again.",
          passedTestCases,
          totalTestCases,
          timeComplexity: complexity?.timeComplexity || "N/A", // Use fetched time complexity
          spaceComplexity: complexity?.spaceComplexity || "N/A", // Use fetched space complexity
        });

        // Open the dialog
        setDialogOpen(true);

        if (allPassed) {
          // Save progress if all test cases passed
          await questionUserProgress({
            id: id,
            userId: session.user.id,
            completed: true,
          });

          setIsCompleted(true);
        }
      } catch (error: any) {
        console.error("Error updating progress:", error);
        setDialogContent({
          title: "Error",
          description: "An error occurred while running your code. Please try again.",
          passedTestCases: 0,
          totalTestCases: 0,
          timeComplexity: "N/A",
          spaceComplexity: "N/A",
        });
        setDialogOpen(true);
      }
    });
  };

  // Button state logic
  const buttonText = () => {
    if (isChecking) return "Checking...";
    if (isPending) return "Saving...";
    return "Submit";
  };

  return (
    <>
      <Button
        variant={"secondary"}
        className={`w-24 font-bold ${
          isCompleted
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gradient-to-tr from-emerald-500 to-emerald-700"
        } text-white`}
        onClick={handleSubmit}
        disabled={disabled || isPending || isChecking}
      >
        {buttonText()}
      </Button>

      {/* Results Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={dialogContent?.title === "Success!" ? "text-emerald-600":"text-rose-800"}>{dialogContent?.title}</DialogTitle>
            <DialogDescription>
              {dialogContent?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="f">
              <p className="font-medium">Test Cases:</p>
              <p>
                {dialogContent?.passedTestCases} / {dialogContent?.totalTestCases} passed
              </p>
              <span className="text-xs text-zinc-600">Run the code before submission to get accurate results</span>
            </div>
            <div>
              <p className="font-medium">Time Complexity:</p>
              <p>{dialogContent?.timeComplexity}</p>
            </div>
            <div>
              <p className="font-medium">Space Complexity:</p>
              <p>{dialogContent?.spaceComplexity}</p>
            </div>
          </div>
          <DialogFooter>
            {dialogContent?.title === "Success!" && (
              <Link href={`/next-program`} passHref>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Next Program
                </Button>
              </Link>
            )}
            <Button
              variant="secondary"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}