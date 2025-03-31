"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileText,
  PenToolIcon as Tool,
  BarChart3,
  ArrowRight,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Dati di esempio
const recentQuotes = [
  {
    id: "Q-2023-001",
    client: "Azienda Agricola Rossi",
    date: "15/03/2023",
    amount: 12500.0,
    status: "accepted",
  },
  {
    id: "Q-2023-002",
    client: "Fattoria Bianchi",
    date: "22/03/2023",
    amount: 8750.5,
    status: "pending",
  },
  {
    id: "Q-2023-003",
    client: "Cooperativa Agricola Valle Verde",
    date: "28/03/2023",
    amount: 21350.75,
    status: "rejected",
  },
  {
    id: "Q-2023-004",
    client: "Azienda Vinicola Montalto",
    date: "02/04/2023",
    amount: 15200.0,
    status: "pending",
  },
]

const recentTickets = [
  {
    id: "T-2023-001",
    client: "Azienda Agricola Rossi",
    date: "18/03/2023",
    issue: "Riparazione robot tagliaerba",
    status: "completed",
  },
  {
    id: "T-2023-002",
    client: "Fattoria Bianchi",
    date: "25/03/2023",
    issue: "Manutenzione trattore",
    status: "in-progress",
  },
  {
    id: "T-2023-003",
    client: "Cooperativa Agricola Valle Verde",
    date: "30/03/2023",
    issue: "Sostituzione componenti mietitrebbia",
    status: "pending",
  },
  {
    id: "T-2023-004",
    client: "Azienda Vinicola Montalto",
    date: "05/04/2023",
    issue: "Calibrazione sistema di irrigazione",
    status: "pending",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "accepted":
      return <Badge className="bg-green-500">Accettato</Badge>
    case "pending":
      return <Badge className="bg-yellow-500">In attesa</Badge>
    case "rejected":
      return <Badge className="bg-red-500">Rifiutato</Badge>
    case "completed":
      return <Badge className="bg-green-500">Completato</Badge>
    case "in-progress":
      return <Badge className="bg-blue-500">In corso</Badge>
    default:
      return <Badge className="bg-gray-500">Sconosciuto</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "accepted":
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "pending":
    case "in-progress":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

export default function DashboardHomepage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calcola le statistiche
  const totalQuotes = recentQuotes.length
  const acceptedQuotes = recentQuotes.filter((q) => q.status === "accepted").length
  const pendingQuotes = recentQuotes.filter((q) => q.status === "pending").length
  const rejectedQuotes = recentQuotes.filter((q) => q.status === "rejected").length

  const totalTickets = recentTickets.length
  const completedTickets = recentTickets.filter((t) => t.status === "completed").length
  const inProgressTickets = recentTickets.filter((t) => t.status === "in-progress").length
  const pendingTickets = recentTickets.filter((t) => t.status === "pending").length

  const totalRevenue = recentQuotes.filter((q) => q.status === "accepted").reduce((sum, quote) => sum + quote.amount, 0)

  const potentialRevenue = recentQuotes
    .filter((q) => q.status === "pending")
    .reduce((sum, quote) => sum + quote.amount, 0)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Benvenuto nel sistema gestionale di Belotti Macchine Agricole</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/preventivi/nuovo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuovo Preventivo
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/assistenza/nuova">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuova Assistenza
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="quotes">Preventivi</TabsTrigger>
          <TabsTrigger value="tickets">Assistenza</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fatturato Confermato</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  €{totalRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">Da preventivi accettati</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fatturato Potenziale</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  €{potentialRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">Da preventivi in attesa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Preventivi</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuotes}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-green-500">{acceptedQuotes} accettati</span>
                  <span>•</span>
                  <span className="text-yellow-500">{pendingQuotes} in attesa</span>
                  <span>•</span>
                  <span className="text-red-500">{rejectedQuotes} rifiutati</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assistenze</CardTitle>
                <Tool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTickets}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-green-500">{completedTickets} completate</span>
                  <span>•</span>
                  <span className="text-blue-500">{inProgressTickets} in corso</span>
                  <span>•</span>
                  <span className="text-yellow-500">{pendingTickets} in attesa</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Preventivi Recenti</CardTitle>
                <CardDescription>Gli ultimi preventivi creati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuotes.slice(0, 3).map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">{getStatusIcon(quote.status)}</div>
                        <div>
                          <p className="text-sm font-medium">{quote.client}</p>
                          <p className="text-xs text-muted-foreground">
                            {quote.id} • {quote.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">
                          €
                          {quote.amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        {getStatusBadge(quote.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/preventivi">
                    Vedi tutti i preventivi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assistenze Recenti</CardTitle>
                <CardDescription>Le ultime richieste di assistenza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.slice(0, 3).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">{getStatusIcon(ticket.status)}</div>
                        <div>
                          <p className="text-sm font-medium">{ticket.client}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.id} • {ticket.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium truncate max-w-[150px]">{ticket.issue}</p>
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/assistenza">
                    Vedi tutte le assistenze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutti i Preventivi</CardTitle>
              <CardDescription>Gestisci i preventivi e il loro stato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">{getStatusIcon(quote.status)}</div>
                      <div>
                        <p className="text-sm font-medium">{quote.client}</p>
                        <p className="text-xs text-muted-foreground">
                          {quote.id} • {quote.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">
                        €{quote.amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      {getStatusBadge(quote.status)}
                      <Button variant="ghost" size="sm">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Precedente</Button>
              <Button variant="outline">Successivo</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutte le Assistenze</CardTitle>
              <CardDescription>Gestisci le richieste di assistenza e il loro stato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">{getStatusIcon(ticket.status)}</div>
                      <div>
                        <p className="text-sm font-medium">{ticket.client}</p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.id} • {ticket.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium truncate max-w-[200px]">{ticket.issue}</p>
                      {getStatusBadge(ticket.status)}
                      <Button variant="ghost" size="sm">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Precedente</Button>
              <Button variant="outline">Successivo</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

