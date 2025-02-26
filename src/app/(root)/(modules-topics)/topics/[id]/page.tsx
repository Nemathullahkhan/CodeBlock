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
import Link from "next/link";

export default async function TopicPage({
  params,
}: {
  params: { id: string };
}) {
 


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
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-50">
              {contents.title}
            </h1>
            <p className="text-lg text-gray-400 max-w-4xl">
              {contents.description}
            </p>
            <div className="w-full h-[0.5px] rounded-full bg-zinc-800"></div>
          </div>
          <div className="tracking-wide text-gray-300 space-y-4">
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

          {/* Table of Contents */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
              Table of contents
            </h2>
            <div className="space-y-2 -mt-4 px-10">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-gray-400 hover:text-gray-50 transition-colors "
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-8 bg-zinc-800" />

          {/* Content working  */}
          <div className="space-y-12">
            {contents.working && (
              <section id="working">
                <Working working={contents.working} />
              </section>
            )}

            {/* Illustration */}
            {contents.illustration &&  (
              <section id="illustration">
                <Illustration illustration={contents.illustration} />
              </section>
            )}

            {/* Implementation */}
            {contents.implementation && (
              <section id="implementation">
                <Implementation
                  implementation={{
                    intuition: contents.implementation.intuition,
                    approach: contents.implementation.approach,
                    code: Array.isArray(contents.implementation.code)
                      ? (contents.implementation.code as {
                          language: string;
                          code: string;
                        }[])
                      : null,
                  }}
                />
              </section>
            )}
            {/* Complexity Analysis */}
            {contents.complexityAnalysis && (
              <section id="complexity">
                <Complexity complexityAnalysis={contents.complexityAnalysis} />
              </section>
            )}
            {/* Applications */}
            {contents.applications && (
              <section id="applications">
                <Applications applications={contents.applications} />
              </section>
            )}
            {/* Advantages */}
            {contents.advantages && (
              <section id="advantages">
                <Advantages advantages={contents.advantages} />
              </section>
            )}
            {/* Disadvantages */}
            {contents.disadvantages && (
              <section id="disadvantages">
                <DisAdvantages disadvantages={contents.disadvantages} />
              </section>
            )}

            {/* FAQ Section */}
            {contents.faq && contents.faq.length > 0 && (
              <section id="faq" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
                  Frequently Asked Questions
                </h2>
                <FAQComponent faq={contents.faq} />
              </section>
            )}

            {/* Viva Questions */}
            {contents.vivaQuestions && contents.vivaQuestions.length > 0 && (
              <section id="viva-questions" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-50 px-6">
                  Viva Questions
                </h2>
                <VivaQuestions vivaQuestions={contents.vivaQuestions} />
              </section>
            )}

            {/* Videos */}
            {contents.videos && contents.videos.length > 0 && (
              <section id="videos" className="space-y-6">
                <Video videos={contents.videos} />
              </section>
            )}

            {/* Playground Link */}
            <Link href={`/playground/${contents.id}`}>
              Playground
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
