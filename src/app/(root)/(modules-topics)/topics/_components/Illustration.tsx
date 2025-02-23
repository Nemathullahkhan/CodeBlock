import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IllustrationProps {
  illustration?: {
    summary: string | null;
    tips: string | null;
    images: string[];
  } | null;
}

export default function Illustration({ illustration }: IllustrationProps) {
  if (!illustration) return null;
  return (
    <Card className="bg-zinc-900 ">
      <CardHeader>
        <CardTitle className="text-gray-100">Illustration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{illustration?.summary}</p>
        <p className="text-gray-300">{illustration?.tips}</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {illustration?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Illustration ${index}`}
              className="rounded-lg border w-[300px] h-[150px] items-center border-zinc-700"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
