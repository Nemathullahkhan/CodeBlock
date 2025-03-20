// import prisma from "@/lib/prisma";
// import { notFound, redirect } from "next/navigation";
// import Photos from "../_components/Photos";
// import Working from "../_components/Working";
// import Illustration from "../_components/Illustration";
// import Implementation from "../_components/Implementation";
// import Complexity from "../_components/Complexity";
// import Applications from "../_components/Applications";
// import Advantages from "../_components/Advantages";
// import DisAdvantages from "../_components/DisAdvantages";
// import VivaQuestions from "../_components/VivaQuestions";
// import FAQComponent from "../_components/FAQComponent";
// import Video from "../_components/Video";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { CheckCircle, Codesandbox } from "lucide-react";
// import ProblemImplementation from "../_components/ProblemImplementation";
// import PageLinks from "../_components/PageLinks";
// import UserBadge from "@/app/(root)/playground/[id]/_components/UserBadge";

// export default async function TopicPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     redirect("/auth/signin");
//   }
//   const userId = session.user.id;

//   const contents = await prisma.content.findUnique({
//     where: { id: params.id },
//     include: {
//       faq: true,
//       vivaQuestions: true,
//       working: true,
//       illustration: true,
//       implementation: true,
//       UserProgress: true,
//       topic: {
//         include: {
//           module: true,
//         },
//       },
//     },
//   });

//   const completedPrograms = contents?.UserProgress.filter(
//     (progress) => progress.userId === userId && progress.completed
//   );

//   if (!contents) return notFound();

//   const moduleId = contents.topic.module.id;
//   const moduleName = contents.topic.module.name;

//   // Define sections for the Table of Contents
//   const sections = [
//     { id: "working", title: "Working" },
//     { id: "illustration", title: "Illustration" },
//     { id: "implementation", title: "Implementation" },
//     { id: "complexity", title: "Complexity Analysis" },
//     { id: "applications", title: "Applications" },
//     { id: "advantages", title: "Advantages" },
//     { id: "disadvantages", title: "Disadvantages" },
//     { id: "faq", title: "FAQ" },
//     { id: "viva-questions", title: "Viva Questions" },
//     { id: "videos", title: "Videos" },
//     { id: "problems", title: "Problem and Implmentation" },
//   ];

//   const formatTitle = (title: string) => {
//     const parts = title.split(/\(([^)]+)\)/);
//     if (parts.length === 1) {
//       return <>{title}</>;
//     }
//     return (
//       <>
//         {parts[0]}
//         <span className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400">
//           ({parts[1]})
//         </span>
//       </>
//     );
//   };

//   const title = contents.title;
//   return (
//     <div className="min-h-screen bg-zinc-950">
//       <div className="w-[1400px] sticky mx-auto flex justify-center">
//         <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  m-3 w-full">
//           {/* Left-aligned Codesandbox */}
//           <div className="flex justify-start items-center">
//             <Link href="/home" className="flex items-center gap-2">
//               <Codesandbox />
//               <span className="text-lg">CodeBlock</span>
//             </Link>
//           </div>

//           {/* Right-aligned UserBadge */}
//           <div className="flex justify-end items-center">
//             <UserBadge />
//           </div>
//         </div>
//       </div>
//       <div className="px-10">
//         <PageLinks id={moduleId} moduleName={moduleName} />
//       </div>
//       <div className="w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="space-y-4 mx-40">
//             <div className="flex gap-2">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight  text-gray-50">
//                 {/* {contents.title} */}
//                 {formatTitle(title)}
//               </h1>
//               {completedPrograms?.map((program) => (
//                 <div key={program.id} className="text-green-400 mt-10">
//                   <CheckCircle className="w-6 h-6" />
//                 </div>
//               ))}
//             </div>
//             <p className="text-lg text-gray-400 max-w-4xl ">
//               {contents.description}
//             </p>
//             <div className="w-full h-[0.5px] rounded-full bg-zinc-800"></div>
//           </div>
//           <div className="tracking-wide text-gray-300 space-y-4 mx-40 ">
//             {contents.brief.split(":").map((part, index) => (
//               <p key={index}>{part.trim()}</p>
//             ))}
//           </div>

//           {/* Photos */}
//           {contents.photos && contents.photos.length > 0 && (
//             <div className="flex justify-center py-8">
//               <Photos photos={contents.photos} />
//             </div>
//           )}

//           <Separator className="my-8 bg-zinc-800" />

//           {/* Main Content Layout */}
//           <div className="grid grid-cols-[20%_2%_78%] gap-2">
//             {/* Table of Contents */}
//             <div className="sticky top-12 h-[calc(100vh-6rem)] overflow-y-auto">
//               <div className="space-y-2 p-4  ">
//                 <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
//                   Table of contents
//                 </h2>
//                 <div className="space-y-2 mt-2">
//                   {sections.map((section) => (
//                     <Link
//                       key={section.id}
//                       href={`#${section.id}`}
//                       className="block text-gray-400 hover:text-gray-50 transition-colors"
//                     >
//                       {section.title}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Vertical Separator */}
//             <Separator orientation="vertical" className="bg-zinc-800" />

//             {/* Content Sections */}
//             <div className="space-y-12">
//               {contents.working && (
//                 <section id="working">
//                   <Working working={contents.working} />
//                 </section>
//               )}

//               {contents.illustration && (
//                 <section id="illustration">
//                   <Illustration illustration={contents.illustration} />
//                 </section>
//               )}

//               {contents.implementation && (
//                 <section id="implementation">
//                   <Implementation
//                     implementation={{
//                       intuition: contents.implementation.intuition,
//                       approach: contents.implementation.approach,
//                       code: contents.implementation.code as
//                         | { language: string; code: string }[]
//                         | null,
//                     }}
//                   />
//                 </section>
//               )}

//               {contents.complexityAnalysis && (
//                 <section id="complexity">
//                   <Complexity
//                     complexityAnalysis={contents.complexityAnalysis}
//                   />
//                 </section>
//               )}

//               {contents.applications && (
//                 <section id="applications">
//                   <Applications applications={contents.applications} />
//                 </section>
//               )}

//               {contents.advantages && (
//                 <section id="advantages">
//                   <Advantages advantages={contents.advantages} />
//                 </section>
//               )}

//               {contents.disadvantages && (
//                 <section id="disadvantages">
//                   <DisAdvantages disadvantages={contents.disadvantages} />
//                 </section>
//               )}

//               {contents.faq && contents.faq.length > 0 && (
//                 <section id="faq" className="space-y-6">
//                   <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
//                     Frequently Asked Questions
//                   </h2>
//                   <FAQComponent faq={contents.faq} />
//                 </section>
//               )}

//               {contents.vivaQuestions && contents.vivaQuestions.length > 0 && (
//                 <section id="viva-questions" className="space-y-6">
//                   <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
//                     Viva Questions
//                   </h2>
//                   <VivaQuestions vivaQuestions={contents.vivaQuestions} />
//                 </section>
//               )}

//               {contents.videos && contents.videos.length > 0 && (
//                 <section id="videos" className="space-y-6">
//                   <Video videos={contents.videos} />
//                 </section>
//               )}

//               {/* Playground */}
//               <section id="problems" className="space-y-6">
//                 <ProblemImplementation
//                   id={contents.id}
//                   completedPrograms={completedPrograms}
//                   programName={contents.title}
//                 />
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Photos from "../_components/Photos";
import Working from "../_components/Working";
import Illustration from "../_components/Illustration";
import Implementation from "../_components/Implementation";
import Complexity from "../_components/Complexity";
import Applications from "../_components/Applications";
import Advantages from "../_components/Advantages";
import DisAdvantages from "../_components/DisAdvantages";
import VivaQuestions from "../_components/VivaQuestions";
import FAQComponent from "../_components/FAQComponent";
import Video from "../_components/Video";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CheckCircle, Codesandbox } from "lucide-react";
import ProblemImplementation from "../_components/ProblemImplementation";
import PageLinks from "../_components/PageLinks";
import UserBadge from "@/app/(root)/playground/[id]/_components/UserBadge";
import { CompleteButton } from "../_components/CompleteButton";



export default async function TopicPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect("/auth/signin");
  }
  const userId = session.user.id;

  const contents = await prisma.content.findUnique({
    where: { id: params.id },
    include: {
      faq: true,
      vivaQuestions: true,
      working: true,
      illustration: true,
      implementation: true,
      UserProgress: true,
      topic: {
        include: {
          module: true,
          contents: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
  });

  const completedPrograms = contents?.UserProgress.filter(
    (progress) => progress.userId === userId && progress.completed
  );

  if (!contents) return notFound();

  const moduleId = contents.topic.module.id;
  const moduleName = contents.topic.module.name;

  // Find the next content
  const allContents = contents.topic.contents;
  const currentIndex = allContents.findIndex(
    (content) => content.id === params.id
  );
  const nextContent = allContents[currentIndex + 1];

  // Define sections for the Table of Contents
  const sections = [
    { id: "working", title: "Working" },
    { id: "illustration", title: "Illustration" },
    { id: "implementation", title: "Implementation" },
    { id: "complexity", title: "Complexity Analysis" },
    { id: "applications", title: "Applications" },
    { id: "advantages", title: "Advantages" },
    { id: "disadvantages", title: "Disadvantages" },
    { id: "faq", title: "FAQ" },
    { id: "viva-questions", title: "Viva Questions" },
    { id: "videos", title: "Videos" },
    { id: "problems", title: "Problem and Implementation" },
  ];

  const formatTitle = (title: string) => {
    const parts = title.split(/\(([^)]+)\)/);
    if (parts.length === 1) {
      return <>{title}</>;
    }
    return (
      <>
        {parts[0]}
        <span className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400">
          ({parts[1]})
        </span>
      </>
    );
  };

  const title = contents.title;

  // Check if the current content ID is "cm7lgm7w7004jbu8ouk8n694l"
  const isSpecificContent = params.id === "cm7lgm7w7004jbu8ouk8n694l";

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="w-[1400px] sticky mx-auto flex justify-center">
        <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  m-3 w-full">
          {/* Left-aligned Codesandbox */}
          <div className="flex justify-start items-center">
            <Link href="/home" className="flex items-center gap-2">
              <Codesandbox />
              <span className="text-lg">CodeBlock</span>
            </Link>
          </div>

          {/* Right-aligned UserBadge */}
          <div className="flex justify-end items-center">
            <UserBadge />
          </div>
        </div>
      </div>
      <div className="px-10">
        <PageLinks id={moduleId} moduleName={moduleName} />
      </div>
      <div className="w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 mx-40">
            <div className="flex gap-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight  text-gray-50">
                {formatTitle(title)}
              </h1>
              {completedPrograms?.map((program) => (
                <div key={program.id} className="text-green-400 mt-10">
                  <CheckCircle className="w-6 h-6" />
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-400 max-w-4xl ">
              {contents.description}
            </p>
            <div className="w-full h-[0.5px] rounded-full bg-zinc-800"></div>
          </div>
          <div className="tracking-wide text-gray-300 space-y-4 mx-40 ">
            {contents.brief.split(":").map((part, index) => (
              <p key={index}>{part.trim()}</p>
            ))}
          </div>

          {/* Photos */}
          {contents.photos && contents.photos.length > 0 && (
            <div className="flex justify-center py-8">
              <Photos photos={contents.photos} />
            </div>
          )}

          <Separator className="my-8 bg-zinc-800" />

          {/* Main Content Layout */}
          <div className="grid grid-cols-[20%_2%_78%] gap-2">
            {/* Table of Contents */}
            <div className="sticky top-12 h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="space-y-2 p-4  ">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
                  Table of contents
                </h2>
                <div className="space-y-2 mt-2">
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-gray-400 hover:text-gray-50 transition-colors"
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Separator */}
            <Separator orientation="vertical" className="bg-zinc-800" />

            {/* Content Sections */}
            <div className="space-y-12">
              {contents.working && (
                <section id="working">
                  <Working working={contents.working} />
                </section>
              )}

              {contents.illustration && (
                <section id="illustration">
                  <Illustration illustration={contents.illustration} />
                </section>
              )}

              {contents.implementation && (
                <section id="implementation">
                  <Implementation
                    implementation={{
                      intuition: contents.implementation.intuition,
                      approach: contents.implementation.approach,
                      code: contents.implementation.code as
                        | { language: string; code: string }[]
                        | null,
                    }}
                  />
                </section>
              )}

              {contents.complexityAnalysis && (
                <section id="complexity">
                  <Complexity
                    complexityAnalysis={contents.complexityAnalysis}
                  />
                </section>
              )}

              {contents.applications && (
                <section id="applications">
                  <Applications applications={contents.applications} />
                </section>
              )}

              {contents.advantages && (
                <section id="advantages">
                  <Advantages advantages={contents.advantages} />
                </section>
              )}

              {contents.disadvantages && (
                <section id="disadvantages">
                  <DisAdvantages disadvantages={contents.disadvantages} />
                </section>
              )}

              {contents.faq && contents.faq.length > 0 && (
                <section id="faq" className="space-y-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
                    Frequently Asked Questions
                  </h2>
                  <FAQComponent faq={contents.faq} />
                </section>
              )}

              {contents.vivaQuestions && contents.vivaQuestions.length > 0 && (
                <section id="viva-questions" className="space-y-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
                    Viva Questions
                  </h2>
                  <VivaQuestions vivaQuestions={contents.vivaQuestions} />
                </section>
              )}

              {contents.videos && contents.videos.length > 0 && (
                <section id="videos" className="space-y-6">
                  <Video videos={contents.videos} />
                </section>
              )}

              {/* Playground */}
              <section id="problems" className="space-y-6">
               {!isSpecificContent && (
                 <ProblemImplementation
                 id={contents.id}
                 completedPrograms={completedPrograms}
                 programName={contents.title}
                 nextContentId={nextContent?.id}
               />
              )}
              </section>

              {/* Render CompleteButton only if contentId matches */}
              {isSpecificContent && (
                <div className="flex justify-start mt-8">
                  <CompleteButton
                    userId={userId}
                    contentId={params.id}
                    isCompleted={!!completedPrograms?.some(
                      (progress) => progress.contentId === params.id
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default async function TopicPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     redirect("/auth/signin");
//   }
//   const userId = session.user.id;

//   const contents = await prisma.content.findUnique({
//     where: { id: params.id },
//     include: {
//       faq: true,
//       vivaQuestions: true,
//       working: true,
//       illustration: true,
//       implementation: true,
//       UserProgress: true,
//       topic: {
//         include: {
//           module: true,
//           contents: {
//             orderBy: { createdAt: "asc" }, // Order contents by creation date or any other field
//           },
//         },
//       },
//     },
//   });

//   const completedPrograms = contents?.UserProgress.filter(
//     (progress) => progress.userId === userId && progress.completed
//   );

//   if (!contents) return notFound();

//   const moduleId = contents.topic.module.id;
//   const moduleName = contents.topic.module.name;

//   // Find the next content
//   const allContents = contents.topic.contents;
//   const currentIndex = allContents.findIndex(
//     (content) => content.id === params.id
//   );
//   const nextContent = allContents[currentIndex + 1];

//   // Define sections for the Table of Contents
//   const sections = [
//     { id: "working", title: "Working" },
//     { id: "illustration", title: "Illustration" },
//     { id: "implementation", title: "Implementation" },
//     { id: "complexity", title: "Complexity Analysis" },
//     { id: "applications", title: "Applications" },
//     { id: "advantages", title: "Advantages" },
//     { id: "disadvantages", title: "Disadvantages" },
//     { id: "faq", title: "FAQ" },
//     { id: "viva-questions", title: "Viva Questions" },
//     { id: "videos", title: "Videos" },
//     { id: "problems", title: "Problem and Implementation" },
//   ];

//   const formatTitle = (title: string) => {
//     const parts = title.split(/\(([^)]+)\)/);
//     if (parts.length === 1) {
//       return <>{title}</>;
//     }
//     return (
//       <>
//         {parts[0]}
//         <span className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400">
//           ({parts[1]})
//         </span>
//       </>
//     );
//   };

//   const title = contents.title;
//   return (
//     <div className="min-h-screen bg-zinc-950">
//         <div className="w-[1400px] sticky mx-auto flex justify-center">
//         <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  m-3 w-full">
//           {/* Left-aligned Codesandbox */}
//           <div className="flex justify-start items-center">
//             <Link href="/home" className="flex items-center gap-2">
//               <Codesandbox />
//               <span className="text-lg">CodeBlock</span>
//             </Link>
//           </div>

//           {/* Right-aligned UserBadge */}
//           <div className="flex justify-end items-center">
//             <UserBadge />
//           </div>
//         </div>
//       </div>
//       <div className="px-10">
//         <PageLinks id={moduleId} moduleName={moduleName} />
//       </div>
//       <div className="w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="space-y-4 mx-40">
//             <div className="flex gap-2">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight  text-gray-50">
//                 {formatTitle(title)}
//               </h1>
//               {completedPrograms?.map((program) => (
//                 <div key={program.id} className="text-green-400 mt-10">
//                   <CheckCircle className="w-6 h-6" />
//                 </div>
//               ))}
//             </div>
//             <p className="text-lg text-gray-400 max-w-4xl ">
//               {contents.description}
//             </p>
//             <div className="w-full h-[0.5px] rounded-full bg-zinc-800"></div>
//           </div>
//           <div className="tracking-wide text-gray-300 space-y-4 mx-40 ">
//             {contents.brief.split(":").map((part, index) => (
//               <p key={index}>{part.trim()}</p>
//             ))}
//           </div>

//           {/* Photos */}
//           {contents.photos && contents.photos.length > 0 && (
//             <div className="flex justify-center py-8">
//               <Photos photos={contents.photos} />
//             </div>
//           )}

//           <Separator className="my-8 bg-zinc-800" />

//           {/* Main Content Layout */}
//           <div className="grid grid-cols-[20%_2%_78%] gap-2">
//             {/* Table of Contents */}
//             <div className="sticky top-12 h-[calc(100vh-6rem)] overflow-y-auto">
//               <div className="space-y-2 p-4  ">
//                 <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
//                   Table of contents
//                 </h2>
//                 <div className="space-y-2 mt-2">
//                   {sections.map((section) => (
//                     <Link
//                       key={section.id}
//                       href={`#${section.id}`}
//                       className="block text-gray-400 hover:text-gray-50 transition-colors"
//                     >
//                       {section.title}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Vertical Separator */}
//             <Separator orientation="vertical" className="bg-zinc-800" />

//             {/* Content Sections */}
//             <div className="space-y-12">
//               {contents.working && (
//                 <section id="working">
//                   <Working working={contents.working} />
//                 </section>
//               )}

//               {contents.illustration && (
//                 <section id="illustration">
//                   <Illustration illustration={contents.illustration} />
//                 </section>
//               )}

//               {contents.implementation && (
//                 <section id="implementation">
//                   <Implementation
//                     implementation={{
//                       intuition: contents.implementation.intuition,
//                       approach: contents.implementation.approach,
//                       code: contents.implementation.code as
//                         | { language: string; code: string }[]
//                         | null,
//                     }}
//                   />
//                 </section>
//               )}

//               {contents.complexityAnalysis && (
//                 <section id="complexity">
//                   <Complexity
//                     complexityAnalysis={contents.complexityAnalysis}
//                   />
//                 </section>
//               )}

//               {contents.applications && (
//                 <section id="applications">
//                   <Applications applications={contents.applications} />
//                 </section>
//               )}

//               {contents.advantages && (
//                 <section id="advantages">
//                   <Advantages advantages={contents.advantages} />
//                 </section>
//               )}

//               {contents.disadvantages && (
//                 <section id="disadvantages">
//                   <DisAdvantages disadvantages={contents.disadvantages} />
//                 </section>
//               )}

//               {contents.faq && contents.faq.length > 0 && (
//                 <section id="faq" className="space-y-6">
//                   <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
//                     Frequently Asked Questions
//                   </h2>
//                   <FAQComponent faq={contents.faq} />
//                 </section>
//               )}

//               {contents.vivaQuestions && contents.vivaQuestions.length > 0 && (
//                 <section id="viva-questions" className="space-y-6">
//                   <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
//                     Viva Questions
//                   </h2>
//                   <VivaQuestions vivaQuestions={contents.vivaQuestions} />
//                 </section>
//               )}

//               {contents.videos && contents.videos.length > 0 && (
//                 <section id="videos" className="space-y-6">
//                   <Video videos={contents.videos} />
//                 </section>
//               )}

//               {/* Playground */}
//               <section id="problems" className="space-y-6">
//                 <ProblemImplementation
//                   id={contents.id}
//                   completedPrograms={completedPrograms}
//                   programName={contents.title}
//                   nextContentId={nextContent?.id} 
//                 />
//               </section>

              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }