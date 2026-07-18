import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight, GraduationCap, SearchCheck, ShieldCheck } from "lucide-react"
import { fadeInUp, staggerContainer, fadeInUpStagger } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"
import { Badge } from "./ui/badge"

const services = [
  {
    title: "Safeguarding Support",
    description: "Bespoke advice, face-to-face training, and auditing — including Ofsted pre-registration preparation for schools and Early Years settings.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80",
    icon: ShieldCheck,
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    title: "SEND & Inclusion Reviews",
    description: "One-to-two-day reviews that empower leaders, support SENCos, and raise achievement for all pupils.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    icon: SearchCheck,
    span: "md:col-span-1",
  },
  {
    title: "School Improvement Advisory",
    description: "Coaching and mock reviews using UK, UAE, and BSO frameworks.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    icon: GraduationCap,
    span: "md:col-span-1",
  },
]

export default function ServicesSection() {
  return (
    <Section>
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading
            eyebrow="Services"
            title="Expert support built around your setting"
            description="Safeguarding, SEND, and school improvement — tailored to your context and inspection frameworks."
          />
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={fadeInUpStagger}
                className={service.span}
              >
                <Link
                  to="/services"
                  className={`group relative flex h-full min-h-[220px] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.featured ? "md:min-h-full" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                    <div className="mb-4 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    {service.featured ? (
                      <Badge className="mb-3 w-fit bg-primary text-primary-foreground">Core service</Badge>
                    ) : null}
                    <h3 className="mb-2 font-display text-2xl font-semibold text-white md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-7 text-white/80 md:text-base ${service.featured ? "max-w-md" : ""}`}>
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
