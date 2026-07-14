import { Target, Users, TrendingUp, Award } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, scaleIn } from "../lib/animations"

export default function ImpactIcons() {
  const impacts = [
    {
      icon: Target,
      title: "Strategic Focus",
      description: "Clear direction and measurable goals that drive success"
    },
    {
      icon: Users,
      title: "Team Excellence",
      description: "Empowering people to achieve their full potential"
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Continuous improvement and sustainable development"
    },
    {
      icon: Award,
      title: "Quality Results",
      description: "Delivering excellence in every engagement"
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/50 dark:bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="grid md:grid-cols-4 gap-6 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <motion.div 
                key={impact.title} 
                className="text-center"
                variants={scaleIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {impact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {impact.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
