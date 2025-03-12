// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IllustrationProps {
  illustration?: {
    explanation: string | null;
    summary: string | null;
    tips: string[];
    images: string[];
  } | null;
}

export default function Illustration({ illustration }: IllustrationProps) {
  if (!illustration) return null;
  return (

    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6">
        Illustration
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {illustration.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[2/1] overflow-hidden rounded-lg border border-zinc-800/50"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Illustration ${index + 1}`}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl text-gray-300">
          <div className="text-gray-300 leading-7 px-2">
            {illustration?.explanation?.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>

        <h1 className="text-xl font-bold tracking-tight  px-8">
          Implementation tips
        </h1>
        {illustration?.tips?.map((tip,idx)=>(
          <p className="px-10 text-gray-300" key = {idx}><span className="text-gray-600 font-bold"> - </span> {tip}</p>
        ))}
        <h1 className="text-xl font-bold tracking-tight text-gray-5 px-8">
          Summary
        </h1>
        <p className="text-gray-300 leading-7 px-10">{illustration.summary}</p>
      </div>
    </section>
  );
}
