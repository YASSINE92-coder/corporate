import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { Container, Section } from "../components/ui/Container"
import { pages, getBreadcrumbSchema } from "../lib/seo"
import { CONTACT_EMAIL } from "../lib/enquiry"

function Privacy() {
  const meta = pages.privacy

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        schema={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <article className="min-h-screen bg-background text-foreground">
        <Section className="pt-28 md:pt-36">
          <Container className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Legal</p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mb-10 text-muted-foreground">
              Last updated: 22 July 2026
            </p>

            <div className="prose-legal space-y-8 text-base leading-8 text-muted-foreground">
              <section aria-labelledby="privacy-who">
                <h2 id="privacy-who" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  Who we are
                </h2>
                <p>
                  This website is operated by <strong className="text-foreground">FM Education Services</strong>,
                  directed by Fatiha Maitland. For privacy enquiries, contact us at{" "}
                  <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>

              <section aria-labelledby="privacy-collect">
                <h2 id="privacy-collect" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  Information we collect
                </h2>
                <p>When you use our contact form, we may collect:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>School or setting name (optional)</li>
                  <li>Your role (optional)</li>
                  <li>Service interest and message content</li>
                </ul>
                <p className="mt-4">
                  If you allow analytics cookies, we may also collect anonymised usage data (pages visited,
                  approximate location, device/browser type) via Google Analytics.
                </p>
              </section>

              <section aria-labelledby="privacy-use">
                <h2 id="privacy-use" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  How we use your information
                </h2>
                <ul className="list-disc space-y-2 pl-5">
                  <li>To respond to consultation and support enquiries</li>
                  <li>To provide the services you request</li>
                  <li>To improve our website experience (only with analytics consent)</li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal data. We do not use contact-form data for unrelated marketing
                  without a lawful basis.
                </p>
              </section>

              <section aria-labelledby="privacy-process">
                <h2 id="privacy-process" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  How messages are processed
                </h2>
                <p>
                  Contact-form submissions are delivered by email using{" "}
                  <a
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    href="https://www.emailjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EmailJS
                  </a>
                  , a third-party email delivery service. Message content is sent to FM Education Services
                  (typically to {CONTACT_EMAIL}) so we can reply to you.
                </p>
                <p className="mt-4">
                  Please review EmailJS’s own privacy terms for how they process transmission data on our behalf.
                </p>
              </section>

              <section aria-labelledby="privacy-cookies">
                <h2 id="privacy-cookies" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  Cookies
                </h2>
                <p>
                  We use essential cookies/local storage needed for basic site functions (for example remembering
                  your cookie preference and theme). Analytics cookies are used only if you accept them via our
                  cookie banner.
                </p>
                <p className="mt-4">
                  You can change your mind later by clearing site data for this website in your browser settings,
                  which will show the cookie banner again.
                </p>
              </section>

              <section aria-labelledby="privacy-rights">
                <h2 id="privacy-rights" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  Your rights
                </h2>
                <p>
                  Depending on applicable law (including UK GDPR where relevant), you may request access to,
                  correction of, or deletion of personal data we hold about you. Contact us using the details above.
                </p>
              </section>

              <section aria-labelledby="privacy-contact">
                <h2 id="privacy-contact" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  Contact
                </h2>
                <p>
                  Questions about this policy? Email{" "}
                  <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>{" "}
                  or use our{" "}
                  <Link to="/contact#contact-form" className="font-medium text-primary underline-offset-4 hover:underline">
                    contact form
                  </Link>
                  .
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </article>
    </>
  )
}

export default Privacy
