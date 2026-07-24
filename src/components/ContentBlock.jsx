import { motion } from "framer-motion"
import { slideInLeft, slideInRight } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { TiltedCard } from "./ui/tilted-card"

export default function ContentBlock({
  eyebrow = "Professional delivery",
  title,
  description,
  image,
  imageAlt = "FM Education Services education consultancy",
  reverse = false,
}) {
  return (
    <Section>
      <Container>
        <div className={`flex flex-col items-center gap-12 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reverse ? slideInRight : slideInLeft}
          >
            <TiltedCard
              imageSrc={image}
              altText={imageAlt}
              width={1000}
              height={640}
              className="h-80 w-full"
              imageClassName="rounded-3xl border-0 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              rotateAmplitude={8}
              scaleOnHover={1.02}
            />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reverse ? slideInLeft : slideInRight}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
            <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
              {title}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">{description}</p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
