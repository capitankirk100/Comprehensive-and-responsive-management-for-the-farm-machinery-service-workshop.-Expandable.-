import type { Metadata } from "next"
import QuotesDashboard from "@/components/dashboard/quotes-dashboard"

export const metadata: Metadata = {
  title: "Preventivi - Belotti Macchine Agricole",
  description: "Gestione preventivi per Belotti Macchine Agricole",
}

export default function PreventivePage() {
  return <QuotesDashboard />
}

