import { PageMotion } from "../components/PageMotion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I reset my password?", a: "Go to the sign-in page and tap 'Forgot password?'. We'll email you a secure reset link." },
  { q: "How do I switch language?", a: "Tap the globe icon in the top bar and pick English, Hindi or Marathi." },
  { q: "How do certificates work?", a: "Complete every lesson in a course to earn a shareable certificate." },
  { q: "How is my data protected?", a: "Sakhi never sells your data. Everything is encrypted in transit and at rest." },
  { q: "How do I sell on Flourish?", a: "Head to Flourish → Upload a product. Our AI can even help write a great description." },
  { q: "Do I pay any fees?", a: "Learn is free. Earn and Flourish take a small, transparent fee only when you're paid." },
];

export function HelpPage() {
  const [q, setQ] = useState("");
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));
  return (
    <PageMotion className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">How can we help?</h1>
      <div className="relative mt-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search help articles…"
          className="pl-11 h-12 rounded-full text-base"
        />
      </div>
      <Accordion type="single" collapsible className="mt-8">
        {filtered.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageMotion>
  );
}
