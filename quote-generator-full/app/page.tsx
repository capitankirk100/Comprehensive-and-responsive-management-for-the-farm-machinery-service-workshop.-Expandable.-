import type { Metadata } from "next"
import DashboardHomepage from "@/components/dashboard/dashboard-homepage"

export const metadata: Metadata = {
  title: "Belotti Macchine Agricole - Gestionale",
  description: "Sistema gestionale per Belotti Macchine Agricole",
}

export default function Home() {
  return <DashboardHomepage />
}

