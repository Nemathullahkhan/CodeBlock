import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface props {
    faq?: {
        question: string | null,
        answer: string | null,
    }[]| null
}

export default function FAQComponent({faq}:props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faq?.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-gray-100">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}