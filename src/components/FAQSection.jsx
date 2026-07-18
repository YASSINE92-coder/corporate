import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"

const faqs = [
  {
    question: "What does a safeguarding engagement typically include?",
    answer:
      "We provide bespoke advice, face-to-face training, and auditing for schools, academies, and Early Years settings. This can include preparation for Ofsted pre-registration inspections and ongoing support aligned to KCSIE and Working Together to Safeguard Children.",
  },
  {
    question: "How long is a SEND and Inclusion review?",
    answer:
      "Reviews are typically a one-to-two-day package based on your organisation’s needs. They help improve SEND provision, support SENCos, meet statutory obligations, and raise achievement for all pupils.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. FM Education Services works across the United Kingdom, the United Arab Emirates, the GCC region, and British Schools Overseas, using relevant inspection frameworks including UK, UAE, and BSO.",
  },
  {
    question: "How quickly can we expect a response?",
    answer:
      "You can contact us at any time. If we are not immediately available, we aim to get back to you within the same day.",
  },
]

export default function FAQSection() {
  return (
    <Section background="muted">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you reach out"
            description="Clear answers to the questions school leaders ask most often."
          />
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-6 shadow-sm md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </Section>
  )
}
