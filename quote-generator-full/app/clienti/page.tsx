import type { Metadata } from "next"
import ClientsDashboard from "@/components/dashboard/clients-dashboard"

export const metadata: Metadata = {
  title: "Clienti - Belotti Macchine Agricole",
  description: "Gestione clienti per Belotti Macchine Agricole",
}

export default function ClientiPage() {
  return <ClientsDashboard />
}

