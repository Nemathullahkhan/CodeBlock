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

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { CheckCircle, Codesandbox } from "lucide-react";
import ProblemImplementation from "../_components/ProblemImplementation";
import PageLinks from "../_components/PageLinks";
import UserBadge from "@/app/(root)/playground/[id]/_components/UserBadge";



// Server actions file for data fetching
import { getTopicContent } from "@/lib/actions/contentActions";

interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  completed: boolean;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  contentId: string;
}

interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  contentId: string;
}

interface Working {
  id: string;
  contentId: string;
  explanation: string;
}

interface Illustration {
  id: string;
  contentId: string;
  summary: string | null;
  tips: string[];
  images: string[];
  explanation: string;
}

interface Implementation {
  id: string;
  contentId: string;
  intuition: string;
  approach: string;
  code: { language: string; code: string }[] | null;// JSON type
}

interface Module {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
  module: Module;
}

interface Content {
  id: string;
  title: string;
  description: string;
  brief: string;
  photos: string[];
  complexityAnalysis: string | null;
  timeComplexity: string;
  spaceComplexity: string | null;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  iscompleted: boolean;
  videos: string[];
  testCases: string[];
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
  faq: FAQ[];
  vivaQuestions: VivaQuestion[];
  working: Working | null;
  illustration: Illustration | null;
  implementation: Implementation | null;
  UserProgress: UserProgress[];
  topic: Topic;
}
export default function TopicPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contents, setContents] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [topicId, setTopicId] = useState<string>("");

  // Store the id separately to avoid using params directly in the dependency array
  useEffect(() => {
    if (params && params.id) {
      setTopicId(params.id);
    }
  }, []);

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Fetch data when session is available and topicId is set
    if (status === "authenticated" && session?.user?.id && topicId) {
      const fetchData = async () => {
        try {
          const data = await getTopicContent(topicId);
          if (!data) {
            router.push("/404");
            return;
          }
          setContents(data as Content);
        } catch (error) {
          console.error("Error fetching content:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [topicId, status, session, router]);

  // Show loading state
  if (loading || !contents) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const moduleId = contents.topic.module.id;
  const moduleName = contents.topic.module.name;
  const completedPrograms = contents.UserProgress.filter(
    (progress: UserProgress) => progress.userId === session?.user?.id && progress.completed
  );

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
              {completedPrograms?.map((program: UserProgress) => (
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
            {contents.brief.split(":").map((part: string, index: number) => (
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
                <ProblemImplementation
                  id={contents.id}
                  completedPrograms={completedPrograms}
                  programName={contents.title}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


