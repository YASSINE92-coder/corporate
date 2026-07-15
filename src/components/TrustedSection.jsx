import { Card, CardContent } from "./ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"

export default function TrustedSection() {
  const partners = [
    { name: "TechCorp", image: "https://placehold.co/150x80/3b82f6/ffffff?text=TechCorp" },
    { name: "InnovateCo", image: "https://placehold.co/150x80/10b981/ffffff?text=InnovateCo" },
    { name: "GlobalNet", image: "https://placehold.co/150x80/8b5cf6/ffffff?text=GlobalNet" },
    { name: "FutureSys", image: "https://placehold.co/150x80/f59e0b/ffffff?text=FutureSys" },
    { name: "DataFlow", image: "https://placehold.co/150x80/ef4444/ffffff?text=DataFlow" },
    { name: "CloudMax", image: "https://placehold.co/150x80/06b6d4/ffffff?text=CloudMax" },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/50 dark:bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Trusted By Industry Leaders
        </motion.h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {partners.map((partner) => (
              <CarouselItem key={partner.name} className="md:basis-1/3 lg:basis-1/3">
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-20 object-contain mb-3"
                    />
                    <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
