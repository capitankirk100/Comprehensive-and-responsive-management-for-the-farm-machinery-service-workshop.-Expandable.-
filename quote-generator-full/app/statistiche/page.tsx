import type { Metadata } from "next"
import StatisticsDashboard from "@/components/dashboard/statistics-dashboard"

export const metadata: Metadata = {
  title: "Statistiche - Belotti Macchine Agricole",
  description: "Statistiche e analisi per Belotti Macchine Agricole",
}

export default function StatistichePage() {
  return <StatisticsDashboard />
}

