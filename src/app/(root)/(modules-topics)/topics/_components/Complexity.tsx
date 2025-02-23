import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface props {
    complexityAnalysis?:string;
}


export default function Complexity({complexityAnalysis}:props) {
  return (
    <Card className="bg-zinc-900 ">
      <CardHeader>
        <CardTitle className="text-gray-100">Complexity Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 whitespace-pre-wrap">{complexityAnalysis}</p>
      </CardContent>
    </Card>
  );
}