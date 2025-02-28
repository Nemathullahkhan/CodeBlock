// "use client";

// import { useParams } from "next/navigation";
// import Questionaire from "./_components/Questionaire";

// export default function Page() {
//   const params = useParams();
//   const id = typeof params?.id === "string" ? params.id : "";
//   return (
//     <>
//       <div className="h-screen overflow-hidden p-4">
//         <div className="max-w-[1800px] mx-auto p-4 h-full">
//           <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 h-full">
//             <div className="">
//               <h1>Question Section</h1>
//               <Questionaire id={id} />
//             </div>
//             <div className="">
//               <h1>Editor</h1>
//               <h2>OutputPanel with testcases</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


export default function page() {
  return null;
}


// import EditorPanel from "@/app/(root)/_components/EditorPanel";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// type QuestionType = {
//   id: string;
//   question: string;
// };

// export default function Page() {

//   const [questions, setQuestions] = useState<QuestionType | null>(null);

//   const params = useParams();
//   const id = params?.id; // Ensure `id` is not undefined

//   useEffect(() => {
//     if (!id) return; // Prevent fetching if `id` is missing

//     const fetchSolutions = async () => {
//       try {
//         const response = await fetch(`/api/questions/${id}`); // Fix API URL
//         if (!response.ok) {
//           throw new Error("Failed to fetch questions");
//         }
//         const data = await response.json();
//         setQuestions(data?.Questions ?? null);
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//       }
//     };

//     fetchSolutions();
//   }, [id]); // Add `id` as a dependency

//   return (
//     <>
//       <div className="h-screen overflow-hidden p-4">
//         <div className="max-w-[1800px] mx-auto p-4 h-full">
//           <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 h-full">
//             <div>
//               {/* <h1>{id}</h1> */}
//               {questions ? (
//                 <>
//                 <h1>{}</h1>
//                 <h1>{questions.question}</h1>
//                 </>
//               ):(
//                 <>
//                 </>
//               )}
//             </div>
//             <div className="lg:flex-col gap-3 mt-2">
//               <EditorPanel />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
