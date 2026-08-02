import { useEffect, useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { telHref, whatsappHref } from "../lib/contact"
import { canPlaceCalls } from "../lib/device"
import QuickEnquiryDialog from "./QuickEnquiryDialog"
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import { useTranslation, useLanguage } from "../context/LanguageContext"

/**
 * `canPlaceCalls()` reads `matchMedia` and `navigator`, so it can only run on the
 * client. Starting at `false` keeps the prerendered markup and the first client
 * paint in agreement (the prerender runs in desktop Chromium), and phones upgrade
 * to the `tel:` link in the effect that follows — never the other way round, so a
 * desktop visitor is never handed a `tel:` href their machine cannot open.
 */
function useCanPlaceCalls() {
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    const read = () => setCapable(canPlaceCalls())
    read()

    // A 2-in-1 folding into tablet mode, or a mouse being plugged in, flips this.
    if (typeof window.matchMedia !== "function") return undefined
    const pointerQuery = window.matchMedia("(pointer: coarse)")
    pointerQuery.addEventListener?.("change", read)
    return () => pointerQuery.removeEventListener?.("change", read)
  }, [])

  return capable
}

export default function FloatingContact() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  const capable = useCanPlaceCalls()

  // Radix needs a physical side. The buttons hug the inline-end edge, so the
  // tooltip has to open toward the inline start — which mirrors under RTL.
  const tooltipSide = isRtl ? "right" : "left"

  // Dial where dialling works; hand everyone else the WhatsApp thread instead.
  const callLabel = capable ? t("floating.callNow") : t("floating.chatOnWhatsApp")
  const callProps = capable
    ? { href: telHref() }
    : { href: whatsappHref(), target: "_blank", rel: "noopener noreferrer" }

  return (
    <>
      <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              {...callProps}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={callLabel}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>{callLabel}</TooltipContent>
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
          <TooltipContent side={tooltipSide}>{t("floating.openQuickEnquiry")}</TooltipContent>
        </Tooltip>
      </div>

      <QuickEnquiryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
