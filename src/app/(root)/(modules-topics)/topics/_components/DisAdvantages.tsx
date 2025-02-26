// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface props {
  disadvantages?: string[];
}

export default function DisAdvantages({ disadvantages }: props) {
  return (
    // Card design
    //   <Card className="bg-zinc-900 border-zinc-800">
    //   <CardHeader>
    //     <CardTitle className="text-gray-50">Disadvantages</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <ul className="space-y-3 list-disc list-inside text-gray-300">
    //       {disadvantages?.map((disadvantage, index) => (
    //         <li key={index} className="leading-7">
    //           {disadvantage}
    //         </li>
    //       ))}
    //     </ul>
    //   </CardContent>
    // </Card>
    // Section design
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6">
        Disadvantages
      </h2>
      <ul className="space-y-3 list-disc list-inside text-gray-300 ml-4 px-10">
        {disadvantages?.map((disadvantage, index) => (
          <li key={index} className="leading-7">
            {disadvantage}
          </li>
        ))}
      </ul>
    </section>
  );
}
