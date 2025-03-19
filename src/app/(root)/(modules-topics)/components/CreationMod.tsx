// "use client";

// import { Button } from "@/components/ui/button";
// import { questions, updateTestCases } from "@/lib/actions/ideActions";
// import {
//   createContent,
//   createFAQ,
//   createModule,
//   createTopics,
//   createViva,
//   getModules,
//   illustration,
//   implementation,
//   updateImplementation,
//   working,
// } from "@/lib/actions/moduleActions";
// import { useState, useTransition } from "react";

// interface ModuleType {
//   id: string;
//   name?: string;
//   description?: string;
// }

// export default function CreationMod() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const [modules, setModules] = useState<ModuleType[]>([]);

//   const handleCreateModule = () => {
//     startTransition(async () => {
//       try {
//         const newModule = await createModule();
//         console.log("Module Created:", newModule);
//       } catch (err: any) {
//         setError(err.message);
//         console.error("Error creating module:", err);
//       }
//     });
//   };
//   const handleCreateTopic = () => {
//     startTransition(async () => {
//       try {
//         const newTopics = await createTopics();
//         console.log("new topic is created", newTopics);
//       } catch (err: any) {
//         setError(err.message);
//         console.error("Error creating topics:", err);
//       }
//     });
//   };
//   const handleGetModules = () => {
//     startTransition(async () => {
//       try {
//         const allModules = await getModules();
//         setModules(allModules);
//       } catch (err: any) {
//         setError(err.message);
//         console.error("Error fetching modules:", err);
//       }
//     });
//   };

//   const handleContent = () => {
//     startTransition(async () => {
//       try {
//         const createinfo = await createContent();
//       } catch (err: any) {
//         setError(err.message);
//         console.error("Failed to create content", err);
//       }
//     });
//   };

//   const handleQuestions = () => {
//     startTransition(async () => {
//       try {
//         const createqu = await createFAQ();
//       } catch (err: any) {
//         setError(err.message);
//         console.error("failed to get Question", err);
//       }
//     });
//   };

//   const handleVivaQuestions = () => {
//     startTransition(async () => {
//       try {
//         const vivaque = await createViva();
//       } catch (err: any) {
//         setError(err.message);
//         console.error("Failed to viva questions", err);
//       }
//     });
//   };


//   const handleWorking = ()=>{
//     startTransition(async()=>{
//       try{
//         const workin = await working();
//       }catch(err){
//         setError(err.message);
//         console.error("Failed toe enter the working",err);
//       }
//     })
//   }

//   const handleImplementation = () =>{
//     startTransition(async()=>{
//       try{
//         const implement = await implementation();
//       }catch(err){
//         setError(err.message);
//         console.error("Failed to enter the implementation",err);
//       }
//     })
//   }
  
//   const handleupdateImplementation = () =>{
//     startTransition(async()=>{
//       try{
//         const implement = await updateImplementation();
//       }catch(err){
//         setError(err.message);
//         console.error("Failed to enter the implementation",err);
//       }
//     })
//   }

//   const handleIllustration = ()=>{
//     startTransition(async ()=>{
//       try {
//          const illu = await illustration();
//       } catch (err) {
//         setError(err.message);
//         console.error("failed to add illustrate",err);
//       }
//     })
//   }

//   const handlePlaygroundQuestions = ()=>{
//     startTransition(async ()=>{
//       try{
//         const pq = await questions();
//       }catch (err) {
//         setError(err.message);
//         console.error("failed to add illustrate",err);
//       }
//     })
//   }
//   const handletestCases = ()=>{
//     startTransition(async ()=>{
//       try{
//         const pq = await updateTestCases();
//       }catch (err) {
//         setError(err.message);
//         console.error("failed to add illustrate",err);
//       }
//     })
//   }
//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="max-w-md grid grid-cols-2 ml-10 gap-2">
//         <Button
//           onClick={handleCreateModule}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}

//         >
//           {isPending ? "Creating..." : "Create Module"}
//         </Button>

//         <Button onClick={handleCreateTopic} disabled={isPending}
//         className="w-36 h-10 text-xs" variant={"outline"}>
//           {isPending ? "Creating..." : "Create Topic"}
//         </Button>

//         <Button
//           onClick={handleGetModules}
         
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Fetching..." : "Fetch Modules"}
//         </Button>

//         <Button
//           onClick={handleContent}
          
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Fetching..." : "Create Content"}
//         </Button>

//         <Button onClick={handleQuestions}  disabled={isPending}
//         className="w-36 h-10 text-xs" variant={"outline"}>
//           {isPending ? "Fetching..." : "Create Questions"}
//         </Button>

//         <Button
//           onClick={handleVivaQuestions}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Create Viva Questions"}
//         </Button>

//         <Button
//           onClick={handleWorking}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Enter Working"}
//         </Button>

        
//         <Button
//           onClick={handleImplementation}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Enter implementation"}
//         </Button>

//         <Button
//           onClick={handleIllustration}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Enter illustration"}
//         </Button>


//       </div>
//       <div className="mx-10 mt-4">
//         <h1 className="text-2xl">Playground Questions</h1>
//         <Button
//           onClick={handlePlaygroundQuestions}
//           disabled={isPending}
//           className="w-36 h-10 mx-10 p-2 border-2 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Enter Questions/testCases"}
//         </Button>
//       </div>
//       <div className="mx-10 mt-4">
//         <h1 className="text-2xl">Playground TestCases Questions</h1>
//         <Button
//           onClick={handletestCases}
//           disabled={isPending}
//           className="w-36 h-10 mx-10 p-2 border-2 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Enter Questions/testCases"}
//         </Button>
//       </div>

//       <Button
//           onClick={handleupdateImplementation}
//           disabled={isPending}
//           className="w-36 h-10 text-xs" variant={"outline"}
//         >
//           {isPending ? "Creating.." : "Update implementation"}
//         </Button>

      
//     </div>
//   );
// }
