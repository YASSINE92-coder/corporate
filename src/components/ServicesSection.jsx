import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, fadeInUpStagger } from "../lib/animations"

export default function ServicesSection() {
  const services = [
    {
      title: "Strategic Planning",
      description: "Comprehensive business strategy development to drive growth and competitive advantage in your market.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Digital Transformation",
      description: "Modernize your operations with cutting-edge technology solutions and digital innovation strategies.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Organizational Excellence",
      description: "Optimize your team structure and processes to maximize efficiency and employee performance.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive consulting solutions tailored to your business needs
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUpStagger}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
