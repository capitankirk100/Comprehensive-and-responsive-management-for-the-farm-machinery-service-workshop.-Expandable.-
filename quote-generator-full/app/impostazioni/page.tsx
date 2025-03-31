import type { Metadata } from "next"
import SettingsDashboard from "@/components/dashboard/settings-dashboard"

export const metadata: Metadata = {
  title: "Impostazioni - Belotti Macchine Agricole",
  description: "Impostazioni del sistema per Belotti Macchine Agricole",
}

export default function ImpostazioniPage() {
  return <SettingsDashboard />
}

