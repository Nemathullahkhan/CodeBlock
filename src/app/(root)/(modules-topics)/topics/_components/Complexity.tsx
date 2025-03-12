import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface props {
    complexityAnalysis?:string;
}


export default function Complexity({complexityAnalysis}:props) {
  return (
    <Card className="bg-black border-zinc-800 ">
      <CardHeader>
        <CardTitle className="text-gray-50">Complexity Analysis</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="px-4">
        <pre className="text-gray-300 whitespace-pre-wrap font-mono bg-zinc-900/90 p-2 px-10 rounded-lg leading-7 ">
          {complexityAnalysis}
        </pre>
        </div>
      </CardContent>
    </Card>
  );
}