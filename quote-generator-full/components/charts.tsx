"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Registra tutti i componenti di Chart.js
Chart.register(...registerables)

interface LineChartProps {
  data: any[]
  xField: string
  yField: string
  color?: string
  yAxisLabel?: string
}

export function LineChart({ data, xField, yField, color = "#3b82f6", yAxisLabel = "" }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item[xField]),
        datasets: [
          {
            label: yAxisLabel || yField,
            data: data.map((item) => item[yField]),
            borderColor: color,
            backgroundColor: `${color}33`,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(context.parsed.y)
                }
                return label
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e5e7eb",
            },
            ticks: {
              callback: (value) =>
                new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value as number),
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xField, yField, color, yAxisLabel])

  return <canvas ref={chartRef} />
}

interface BarChartProps {
  data: any[]
  xField: string
  yFields: string[]
  yFieldNames?: string[]
  colors?: string[]
  yAxisLabel?: string
  horizontal?: boolean
}

export function BarChart({
  data,
  xField,
  yFields,
  yFieldNames,
  colors = ["#3b82f6", "#22c55e", "#eab308"],
  yAxisLabel = "",
  horizontal = false,
}: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = data.map((item) => item[xField])
    const datasets = yFields.map((field, index) => ({
      label: yFieldNames ? yFieldNames[index] : field,
      data: data.map((item) => item[field]),
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
    }))

    chartInstance.current = new Chart(ctx, {
      type: horizontal ? "horizontalBar" : "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        indexAxis: horizontal ? "y" : "x",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: yFields.length > 1,
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: !horizontal,
            },
            ticks: {
              callback: (value) => {
                if (horizontal && typeof value === "number") {
                  if (yAxisLabel.toLowerCase().includes("euro") || yAxisLabel.toLowerCase().includes("€")) {
                    return new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                  return value
                }
                return value
              },
            },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            grid: {
              color: "#e5e7eb",
              display: horizontal,
            },
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
            },
            ticks: {
              callback: (value) => {
                if (!horizontal && typeof value === "number") {
                  if (yAxisLabel.toLowerCase().includes("euro") || yAxisLabel.toLowerCase().includes("€")) {
                    return new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                  return value
                }
                return value
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xField, yFields, yFieldNames, colors, yAxisLabel, horizontal])

  return <canvas ref={chartRef} />
}

interface PieChartProps {
  data: any[]
  nameField: string
  valueField: string
  colors?: string[]
}

export function PieChart({ data, nameField, valueField, colors }: PieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Genera colori se non forniti
    const defaultColors = [
      "#3b82f6",
      "#22c55e",
      "#eab308",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#14b8a6",
      "#f97316",
      "#06b6d4",
      "#6366f1",
    ]

    const chartColors = colors || data.map((_, index) => defaultColors[index % defaultColors.length])

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item[nameField]),
        datasets: [
          {
            data: data.map((item) => item[valueField]),
            backgroundColor: chartColors,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = Math.round(((value as number) / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, nameField, valueField, colors])

  return <canvas ref={chartRef} />
}

