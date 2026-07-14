import { Mail } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp, scaleIn } from "../lib/animations"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6"
            variants={scaleIn}
          >
            <Mail className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for insights, industry trends, and expert advice.
          </p>
          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            variants={fadeInUp}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
