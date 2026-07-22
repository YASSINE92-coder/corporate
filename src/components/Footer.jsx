import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { ThemeToggle } from "./theme-toggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "../lib/enquiry";
import { getNavLinks } from "../data/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, localizePath } = useTranslation();
  const links = getNavLinks(t, { includePrivacy: true });

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative border-t border-border bg-footer text-footer-foreground"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <BrandLogo
              className="text-foreground"
              markClassName="bg-primary text-primary-foreground"
              textClassName="text-foreground"
            />
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{t("common.navigation")}</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.key}>
                  <Link
                    to={localizePath(item.to)}
                    className="relative inline-block text-muted-foreground transition-colors hover:text-foreground after:absolute after:start-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{t("common.getInTouch")}</h3>
            <p className="text-sm">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground transition hover:text-foreground">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm">
              <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground transition hover:text-foreground">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
            <Link
              to={localizePath("/contact#contact-form")}
              className="inline-block text-sm font-medium text-primary transition hover:underline"
            >
              {t("common.contactUs")} →
            </Link>

            <div className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1 w-fit">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {t("common.brand")}. {t("common.allRightsReserved")}
          </p>

          <p>
            {t("common.builtBy")}{" "}
            <span className="font-medium text-foreground/80">Yassine Chaanoune</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
