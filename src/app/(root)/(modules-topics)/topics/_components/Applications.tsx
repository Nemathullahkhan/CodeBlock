import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface props {
    applications?:string;
}

export default function Applications({applications}:props) {
  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-gray-100">Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{applications}</p>
      </CardContent>
    </Card>
  );
}