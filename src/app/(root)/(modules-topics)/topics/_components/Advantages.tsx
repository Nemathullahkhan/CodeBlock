
interface props {
    advantages?:string[]
}

export default function Advantages({advantages}:props) {
  return (
    // Section design 
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6">
        Advantages
      </h2>
      <ul className="space-y-3 list-disc list-inside text-gray-300 ml-4 px-10">
        {advantages?.map((advantage, index) => (
          <li key={index} className="leading-7">
            {advantage}
          </li>
        ))}
      </ul>
    </section>
  );
}