import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface implementProps {
    implementation?:{
        intuition:string | null,
        approach: string | null,
        code:unknown
    } | null
}


export default function Implementation({implementation}:implementProps) {
  return (
    <Card className="bg-zinc-900 ">
      <CardHeader>
        <CardTitle className="text-gray-100">Implementation</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-gray-100 text-xl font-semibold  tracking-tight">Intuition</h1>
        <p className="text-gray-300">{implementation?.intuition}</p>
        <h1 className="text-gray-100 text-xl font-semibold  tracking-tight">Approach</h1>
        <p className="text-gray-300">{implementation?.approach}</p>
        {/* To fix this  */}
        <pre className="bg-zinc-800 p-4 rounded text-gray-200 whitespace-pre-line">
          {JSON.stringify(implementation?.code, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}