import { useState } from "react"
import { Card, CardContent } from "./ui/card"
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

  const duplicatedPartners = [...partners, ...partners]
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-muted/50 dark:bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 sm:mb-10 md:mb-12 text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Trusted By Industry Leaders
        </motion.h2>

        <div 
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: "-50%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{ 
              pointerEvents: isPaused ? "none" : "auto",
              willChange: "transform",
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl sm:rounded-2xl overflow-hidden">
                  <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center h-full min-h-24 sm:min-h-28 md:min-h-32">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-auto h-12 sm:h-16 md:h-20 object-contain mb-2 sm:mb-3"
                    />
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center line-clamp-2">
                      {partner.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
