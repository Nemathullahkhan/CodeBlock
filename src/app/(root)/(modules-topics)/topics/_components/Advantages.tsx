interface props {
    advantages?:string[]
}

export default function Advantages({advantages}:props) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-gray-100">Advantages</h3>
      <ul className="list-disc list-inside text-gray-300">
        {advantages?.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
    </div>
  );
}