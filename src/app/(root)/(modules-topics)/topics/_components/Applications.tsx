// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface props {
  applications?: string[];
}

export default function Applications({ applications }: props) {
  return (
    // Card design

    // <Card className="bg-zinc-900 border-zinc-800">
    //   <CardHeader>
    //     <CardTitle className="text-gray-50">Applications</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <p className="text-gray-300 leading-7">{applications}</p>
    //   </CardContent>
    // </Card>

    // Section design
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6">
        Applications
      </h2>
      <ul className="space-y-3 list-disc list-inside text-gray-300 ml-4 px-10">
        {applications?.map((app, index) => {
          const [boldText, ...normalText] = app.split("-");
          return (
            <p key={index} className="flex gap-1 text-gray-300">
              <p className=" text-gray-400 hover:text-gray-50 transition-colors">{boldText} – </p>
              {normalText.join(" – ")}
            </p>
          );
        })}
      </ul>
    </section>
  );
}
