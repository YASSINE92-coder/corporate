import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"

const regions = [
  { name: "United Kingdom", detail: "Ofsted, KCSIE, and school improvement frameworks" },
  { name: "United Arab Emirates", detail: "Inspection expertise and school advisory support" },
  { name: "GCC Region", detail: "Consultancy across Gulf Cooperation Council settings" },
  { name: "British Schools Overseas", detail: "Mock reviews aligned to BSO frameworks" },
]

export default function TrustedSection() {
  const duplicatedRegions = [...regions, ...regions]
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="w-full bg-muted/50 py-16 dark:bg-muted/20 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-8 text-center font-display text-2xl font-semibold text-foreground sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl text-balance"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Trusted across the UK, UAE, GCC, and British Schools Overseas
        </motion.h2>

        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
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
            {duplicatedRegions.map((region, index) => (
              <div
                key={`${region.name}-${index}`}
                className="w-64 flex-shrink-0 sm:w-72 md:w-80 lg:w-96"
              >
                <Card className="h-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl sm:rounded-2xl">
                  <CardContent className="flex h-full min-h-28 flex-col items-center justify-center p-5 text-center sm:min-h-32 sm:p-6 md:min-h-36 md:p-8">
                    <h3 className="mb-2 font-display text-base font-semibold text-foreground sm:text-lg">
                      {region.name}
                    </h3>
                    <p className="text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                      {region.detail}
                    </p>
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
