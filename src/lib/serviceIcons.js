import { GraduationCap, MessageCircle, SearchCheck, ShieldCheck } from "lucide-react"

/** Icons keyed by enquiry / home service ids. */
export const SERVICE_ICONS = {
  safeguarding: ShieldCheck,
  send: SearchCheck,
  "school-improvement": GraduationCap,
  schoolImprovement: GraduationCap,
  general: MessageCircle,
}

export function getServiceIcon(id) {
  return SERVICE_ICONS[id] ?? MessageCircle
}
