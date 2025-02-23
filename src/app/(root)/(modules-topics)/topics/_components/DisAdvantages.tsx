interface props {
    disadvantages?:string[]
}

export default function DisAdvantages({disadvantages}:props) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-gray-100">Disadvantages</h3>
      <ul className="list-disc list-inside text-gray-300">
        {disadvantages?.map((disadvantage, index) => (
          <li key={index}>{disadvantage}</li>
        ))}
      </ul>
    </div>
  );
}