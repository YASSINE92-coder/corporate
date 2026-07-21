import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight, GraduationCap, SearchCheck, ShieldCheck } from "lucide-react"
import { fadeInUp, staggerContainer, fadeInUpStagger } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"
import { Badge } from "./ui/badge"
import OptimizedImage from "./OptimizedImage"
import { contactPath } from "../lib/enquiry"

const services = [
  {
    title: "Safeguarding Support",
    description:
      "Safeguarding consultant UK expertise — bespoke advice, face-to-face training, and auditing, including Ofsted pre-registration preparation for schools and Early Years settings.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Safeguarding training for schools in the UK",
    icon: ShieldCheck,
    span: "md:col-span-2 md:row-span-2",
    featured: true,
    href: contactPath("safeguarding"),
  },
  {
    title: "SEND & Inclusion Reviews",
    description:
      "SEND support services through one-to-two-day reviews that empower leaders, support SENCos, and raise achievement for all pupils.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "SEND support services and inclusive learning in a UK classroom",
    icon: SearchCheck,
    span: "md:col-span-1",
    href: contactPath("send"),
  },
  {
    title: "School Improvement Advisory",
    description:
      "School improvement consultancy with coaching and mock reviews using UK, UAE, and BSO frameworks.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    imageAlt: "School improvement consultancy supporting teachers and leaders",
    icon: GraduationCap,
    span: "md:col-span-1",
    href: contactPath("school-improvement"),
  },
]

export default function ServicesSection() {
  return (
    <Section aria-labelledby="home-services-heading">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading
            id="home-services-heading"
            eyebrow="Services"
            title="Expert safeguarding, SEND support & school improvement"
            description="Safeguarding consultant UK services, SEND support services, and school improvement consultancy — tailored to your context and inspection frameworks."
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
              <motion.article
                key={service.title}
                variants={fadeInUpStagger}
                className={service.span}
              >
                <Link
                  to={service.href}
                  className={`group relative flex h-full min-h-[220px] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.featured ? "md:min-h-full" : ""
                  }`}
                  aria-label={`Request a consultation for ${service.title}`}
                >
                  <OptimizedImage
                    src={service.image}
                    alt={service.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" aria-hidden="true" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                    <div className="mb-4 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur" aria-hidden="true">
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
                      Request a consultation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
