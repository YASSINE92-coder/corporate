import { useMemo } from "react"
import { Card, CardContent } from "./ui/card"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { partnerCountries } from "../data/countries"
import FlagIcon from "./FlagIcon"
import { useTranslation } from "../context/LanguageContext"

export default function TrustedSection() {
  const { t } = useTranslation()
  const regions = useMemo(
    () =>
      partnerCountries.map((region) => ({
        ...region,
        name: t(`trusted.regions.${region.code}.name`),
        detail: t(`trusted.regions.${region.code}.detail`),
      })),
    [t]
  )
  const duplicatedRegions = useMemo(() => [...regions, ...regions], [regions])

  return (
    <section className="w-full bg-muted/50 py-16 theme-surface dark:bg-muted/25 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-8 text-center font-display text-2xl font-semibold text-foreground sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl text-balance"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {t("trusted.title")}
        </motion.h2>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: "-50%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{ willChange: "transform" }}
          >
            {duplicatedRegions.map((region, index) => (
              <div
                key={`${region.code}-${index}`}
                className="w-64 flex-shrink-0 sm:w-72 md:w-80 lg:w-96"
              >
                <Card className="h-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl sm:rounded-2xl">
                  <CardContent className="flex h-full min-h-28 flex-col items-center justify-center p-5 text-center sm:min-h-32 sm:p-6 md:min-h-36 md:p-8">
                    <FlagIcon
                      code={region.flag}
                      title={region.name}
                      className="mb-3 h-6 w-8 rounded-sm"
                    />
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
