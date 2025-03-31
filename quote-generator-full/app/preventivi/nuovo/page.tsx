import type { Metadata } from "next"
import QuoteGenerator from "@/components/quote-generator"

export const metadata: Metadata = {
  title: "Nuovo Preventivo - Belotti Macchine Agricole",
  description: "Crea un nuovo preventivo per Belotti Macchine Agricole",
}

export default function NuovoPreventivo() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuovo Preventivo</h1>
      <QuoteGenerator />
    </main>
  )
}

