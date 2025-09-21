import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
    {
        question: "How do you ensure maids are regular?",
        answer: "We track daily attendance which clients can mark for their monthly bookings. This directly impacts the maid's public reliability score. Reliable maids with high attendance appear higher in search results, creating a strong incentive for regularity."
    },
    {
        question: "How are maids verified?",
        answer: "All maids on our platform undergo a mandatory ID verification process. We also encourage community-based reviews which help in building a trustworthy profile."
    },
    {
        question: "What is the reliability score?",
        answer: "It's a unique metric we calculate based on a maid's attendance record (weighted 70%) and their average review rating (weighted 30%). This score provides a transparent and data-driven way for families to choose dependable help."
    },
    {
        question: "Can clients review maids?",
        answer: "Yes. After a monthly booking period is completed, clients can leave a rating (from 1 to 5 stars) and detailed feedback. This helps other users and provides valuable feedback to the maids."
    },
    {
        question: "How does MaidLink help the country?",
        answer: "By bringing technology to a traditionally unorganized sector, we aim to formalize domestic work. This ensures fair pay, creates digital work histories for maids, improves their access to financial services, and builds a foundation of trust and accountability."
    }
];


export default function FAQPage() {
  return (
    <div className="container py-12 md:py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-semibold hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
