import type { Metadata } from "next"
import ProductForm from "@/components/product-form"

export const metadata: Metadata = {
  title: "Nuovo Prodotto - Belotti Macchine Agricole",
  description: "Aggiungi un nuovo prodotto a Belotti Macchine Agricole",
}

export default function NuovoProdottoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuovo Prodotto</h1>
      <ProductForm />
    </main>
  )
}

