import { useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { CONTACT_PHONE } from "../lib/enquiry"
import QuickEnquiryDialog from "./QuickEnquiryDialog"
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import { useTranslation } from "../context/LanguageContext"

export default function FloatingContact() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t("floating.callNow")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="start">{t("floating.callNow")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t("floating.openQuickEnquiry")}
              aria-haspopup="dialog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="start">{t("floating.openQuickEnquiry")}</TooltipContent>
        </Tooltip>
      </div>

      <QuickEnquiryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
