import { useMemo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"
import { useTranslation } from "../context/LanguageContext"

const FAQ_KEYS = ["safeguarding", "send", "international", "response"]

export default function FAQSection() {
  const { t } = useTranslation()

  const faqs = useMemo(
    () =>
      FAQ_KEYS.map((key) => ({
        key,
        question: t(`faq.items.${key}.q`),
        answer: t(`faq.items.${key}.a`),
      })),
    [t]
  )

  return (
    <Section background="muted" aria-labelledby="faq-heading">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading
            id="faq-heading"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            description={t("faq.description")}
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
              <AccordionItem key={faq.key} value={`item-${index}`}>
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
