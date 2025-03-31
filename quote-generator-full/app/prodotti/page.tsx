import type { Metadata } from "next"
import ProductsDashboard from "@/components/dashboard/products-dashboard"

export const metadata: Metadata = {
  title: "Prodotti - Belotti Macchine Agricole",
  description: "Gestione prodotti per Belotti Macchine Agricole",
}

export default function ProdottiPage() {
  return <ProductsDashboard />
}

