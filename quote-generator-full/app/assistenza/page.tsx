import type { Metadata } from "next"
import ServiceTicketsDashboard from "@/components/dashboard/service-tickets-dashboard"

export const metadata: Metadata = {
  title: "Assistenza - Belotti Macchine Agricole",
  description: "Gestione assistenza per Belotti Macchine Agricole",
}

export default function AssistenzaPage() {
  return <ServiceTicketsDashboard />
}

