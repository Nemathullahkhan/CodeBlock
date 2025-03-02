
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Circle, GraduationCap, Layout } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import StarterLinks from "../_components/StarterLinks"

export default async function MulePage({ params }: { params: { id: string } }) {
  const mule = await prisma.module.findUnique({
    where: { id: params.id },
    include: {
      topics: {
        include: {
          contents: true,
        },
      },
    },
  })

  if (!mule) return notFound()

  const totalPrograms = await prisma.content.count({
    where: {
      topic: {
        moduleId: params.id,
      },
    },
  })

  // Assuming we track progress (you can modify this based on your data model)
  const completedPro = await prisma.content.findMany({
    where: {
      topic: {
        moduleId: params.id,
      },
    },
  });
  
  // Calculate the number of completed programs
  const completedPrograms = completedPro.filter((completed) => completed.iscompleted === true).length;
 
  const progressRounded = (completedPrograms/totalPrograms)*100;
  
  const progress = progressRounded.toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <section className="space-y-6">
        <StarterLinks/>
          <div className="space-y-4">

            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-primary">{mule.name}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">{mule.description}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              <span className="text-sm">
                <span className="text-primary font-semibold">{mule.topics?.length}</span> Topics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm">
                <span className="text-primary font-semibold">{totalPrograms}</span> Programs
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="text-primary font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="mt-12">
          <Card className="border-none bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Course Curriculum</CardTitle>
              </div>

              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {mule.topics.map((topic, topicIdx) => (
                    <div key={topic.id} className="group rounded-lg border bg-card/50 transition-colors hover:bg-card">
                      {/* Topic Header */}
                      <div className="p-4 flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {topicIdx + 1}
                        </div>
                        <div className="space-y-1">
                          <h2 className="font-semibold tracking-tight text-lg">{topic.name}</h2>
                          {topic.description && <p className="text-sm text-muted-foreground mr-10 ml-4">{topic.description}</p>}
                        </div>
                        <Badge variant="outline" className="ml-auto ">
                          {topic.contents.length} Lessons
                        </Badge>
                      </div>

                      {/* Content List */}
                      <div className="border-t bg-muted/50">
                        {topic.contents.map((content, idx) => (
                          <Link
                            key={content.id}
                            href={`/topics/${content.id}`}
                            className="flex items-center gap-4 p-4 transition-colors hover:bg-muted"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                              
                              {content.iscompleted === true ? (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{content.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

