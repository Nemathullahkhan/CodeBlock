import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
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

export default async function TopicPage({
  params,
}: {
  params: { id: string };
}) {
  // const topics = await prisma.topic.findUnique({
  //     where:{id:params.id},
  //     include:{
  //         contents:{
  //             include:{
  //                 faq:true,
  //                 vivaQuestions:true,
  //                 working:true,
  //                 illustration:true,
  //                 implementation:true
  //             }
  //         }
  //     },
  // });
  // if(!topics) return notFound(); // Show 404
  const contents = await prisma.content.findUnique({
    where: { id: params.id },
    include: {
      faq: true,
      vivaQuestions: true,
      working: true,
      illustration: true,
      implementation: true,
    },
  });

  if (!contents) return notFound();

  // return (
  //   <div className="min-h-screen max-w-8xl mx-6">
  //     <div className="">
  //       <h1 className="text-6xl">{contents.title}</h1>
  //       <p className="text-xl ml-2">{contents.description}</p>
  //     </div>

  //     {/* Photos components */}
  //     {contents.photos && contents.photos.length > 0 && (
  //       <div className="text-center flex justify-center">
  //         <Photos photos={contents.photos} />
  //       </div>
  //     )}

  //     {/* Table of Contents */}
  //     <div className="text-3xl tracking-tight">
  //       <h1>Table of Contents</h1>
  //     </div>

  //     {/* Working */}
  //     <div className="">
  //       <Working working={contents.working} />
  //     </div>

  //     {/* Illustration */}
  //     <div className="">
  //       <Illustration illustration={contents.illustration} />
  //     </div>

  //     {/* Implementation */}
  //     <div className="">
  //       <Implementation implementation={contents.implementation} />
  //     </div>

  //     {/* Complexity Analysis */}
  //     <div className="">
  //       <Complexity
  //         complexityAnalysis={contents.complexityAnalysis ?? undefined}
  //       />
  //     </div>

  //     {/* Applications */}
  //     <div className="">
  //       <Applications applications={contents.applications ?? undefined} />
  //     </div>

  //     {/* Advantages */}
  //     <div className="">
  //       <Advantages advantages={contents.advantages ?? undefined} />
  //     </div>

  //     {/* DisAdvantages */}
  //     <div className="">
  //       <DisAdvantages disadvantages={contents.disadvantages ?? undefined} />
  //     </div>

  //     {/* FAQ */}
  //     <div className="">
  //     <h1 className="text-xl font-semibold tracking-tight text-gray-100">FAQ</h1>
  //     <FAQComponent faq = {contents.faq} />
  //     </div>
      
  //     {/* Viva Questions */}

  //     <div className="">
  //       <h1 className="text-xl font-semibold tracking-tight text-gray-100">Viva Questions</h1>
  //       <VivaQuestions vivaQuestions={contents.vivaQuestions} />
  //     </div>

  //     {/* Videos */}
  //     <div className="">
  //       <Video videos={contents.videos} />
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-50">
              {contents.title}
            </h1>
            <p className="text-lg text-gray-400 max-w-4xl">
              {contents.description}
            </p>
          </div>

          {/* Photos */}
          {contents.photos && contents.photos.length > 0 && (
            <div className="flex justify-center py-8">
              <Photos photos={contents.photos} />
            </div>
          )}

          <Separator className="my-8 bg-zinc-800" />

          {/* Table of Contents */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
              Table of Contents
            </h2>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {contents.working && (
              <section>
                <Working working={contents.working} />
              </section>
            )}

            {contents.illustration && (
              <section>
                <Illustration illustration={contents.illustration} />
              </section>
            )}

            {contents.implementation && (
              <section>
                <Implementation implementation={contents.implementation} />
              </section>
            )}

            {contents.complexityAnalysis && (
              <section>
                <Complexity complexityAnalysis={contents.complexityAnalysis} />
              </section>
            )}

            {contents.applications && (
              <section>
                <Applications applications={contents.applications} />
              </section>
            )}

            {contents.advantages && (
              <section>
                <Advantages advantages={contents.advantages} />
              </section>
            )}

            {contents.disadvantages && (
              <section>
                <DisAdvantages disadvantages={contents.disadvantages} />
              </section>
            )}

            {/* FAQ Section */}
            {contents.faq && contents.faq.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
                  Frequently Asked Questions
                </h2>
                <FAQComponent faq={contents.faq} />
              </section>
            )}

            {/* Viva Questions */}
            {contents.vivaQuestions && contents.vivaQuestions.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-50">
                  Viva Questions
                </h2>
                <VivaQuestions vivaQuestions={contents.vivaQuestions} />
              </section>
            )}

            {/* Videos */}
            {contents.videos && contents.videos.length > 0 && (
              <section className="space-y-6">
                <Video videos={contents.videos} />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


