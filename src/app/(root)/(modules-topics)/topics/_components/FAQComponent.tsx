import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface props {
    faq?: {
        question: string | null,
        answer: string | null,
    }[]| null
}

export default function FAQComponent({faq}:props) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2 px-6">
    {faq?.map((item, index) => (
      <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800 px-4">
      <AccordionTrigger className="text-gray-400 hover:text-gray-50 text-left">{item.question}</AccordionTrigger>
        <AccordionContent className="text-gray-300 leading-7">{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
  );
}