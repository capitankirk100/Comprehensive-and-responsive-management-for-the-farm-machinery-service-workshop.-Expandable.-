import type { Metadata } from "next"
import ServiceTicketForm from "@/components/service-ticket-form"

export const metadata: Metadata = {
  title: "Nuova Assistenza - Belotti Macchine Agricole",
  description: "Crea una nuova scheda di assistenza per Belotti Macchine Agricole",
}

export default function NuovaAssistenza() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuova Scheda di Assistenza</h1>
      <ServiceTicketForm />
    </main>
  )
}

