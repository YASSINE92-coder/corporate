import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              FM Education Services
            </h2>
            <p className="text-sm text-slate-400">
              Specialist safeguarding, SEND and inclusion, and school improvement support for schools, academies, and Early Years settings.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="relative inline-block transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <p className="text-sm">
              <a href="mailto:fatiha.maitland1@gmail.com" className="transition hover:text-white">
                fatiha.maitland1@gmail.com
              </a>
            </p>
            <p className="text-sm">
              <a href="tel:+447704267745" className="transition hover:text-white">
                +44 (0) 770 426 7745
              </a>
            </p>
            <Link
              to="/contact"
              className="inline-block text-sm font-medium text-primary transition hover:underline"
            >
              Contact us →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs sm:flex-row">
          <p>
            © {year} FM Education Services. All rights reserved.
          </p>

          <p className="text-slate-500">
            Built by{" "}
            <span className="font-medium text-slate-400">
              Yassine Chaanoune
            </span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
