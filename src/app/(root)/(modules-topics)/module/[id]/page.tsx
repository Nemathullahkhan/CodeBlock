import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function mulePage({ params }: { params: { id: string } }) {
  // Fetch the mule along with topics and their content
  const mule = await prisma.module.findUnique({
    where: { id: params.id },
    include: {
      topics: {
        include: {
          contents: true // Fetch content for each topic
        },
      },
    },
  });

  if (!mule) return notFound(); // Show 404 if mule not found

  // Getting all total number of programs
  // const totalPrograms = await prisma.content.count({
  //   where:{
  //     topic:{
  //       moduleId:params.id
  //     }
  //   }
  // });
  return (
    <div className="min-h-screen px-8">
      <Card>
        <CardTitle>{mule.name}</CardTitle>
        <CardDescription>{mule.description}</CardDescription>
        <div className="flex gap-2">
          <span>{mule.topics.length} Topics</span>
    
          {/* Start Learning */}
          {/* Progress Bar */}
          </div>
          <CardContent>
            {mule.topics.map((topic)=>(
                <div className="bg-zinc-700" key ={topic.id}>
                  <h1 className="bg-zinc-800">{topic.name}</h1>
                  <p className="text-sm"> {topic.description}</p>
                  {/* Progress tracker */}
                  {topic.contents.map((data)=>(
                    <div className="px-2" key ={data.id}>
                      <Link href ={`/topics/${data.id}`}>
                       {data.title}
                      </Link>
                    </div>
                  ))}
                </div>
            ))}
          </CardContent>
      </Card>

    </div>
  );
}
