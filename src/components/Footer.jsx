import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative border-t border-slate-800 bg-slate-950 text-slate-400"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Main grid */}
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              FM Education Services
            </h2>
            <p className="text-sm text-slate-400">
              Empowering businesses with modern digital solutions and scalable systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {["About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="relative inline-block transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <p className="text-sm">
              Let’s build something great together.
            </p>
            <a
              href="/contact"
              className="inline-block text-sm font-medium text-primary transition hover:underline"
            >
              Contact us →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs sm:flex-row">
          
          {/* Copyright */}
          <p>
            © {year} FM Education Services. All rights reserved.
          </p>

          {/* Signature */}
          <p className="text-slate-500">
            Built by{" "}
            <a
              href="https://your-portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-400 hover:text-white transition"
            >
              Yassine Chaanoune
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}