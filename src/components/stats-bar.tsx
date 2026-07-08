import { Server, Wifi, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ServerData } from "@/lib/api"

interface StatsBarProps {
  servers: ServerData[]
}

export function StatsBar({ servers }: StatsBarProps) {
  const total = servers.length
  const online = servers.filter((s) => s.players > 0).length
  const totalPlayers = servers.reduce((sum, s) => sum + s.players, 0)

  const stats = [
    {
      label: "Total Servers",
      value: total,
      icon: Server,
      color: "text-primary",
    },
    {
      label: "Online",
      value: online,
      icon: Wifi,
      color: "text-fog-green",
    },
    {
      label: "Total Players",
      value: totalPlayers,
      icon: Users,
      color: "text-fog-accent-light",
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/60 p-3 backdrop-blur-sm sm:gap-0 sm:divide-x sm:divide-border">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "flex items-center gap-2.5 px-3 py-1",
            i === 0 && "sm:pl-0",
            i === stats.length - 1 && "sm:pr-0"
          )}
        >
          <stat.icon className={cn("size-4 shrink-0", stat.color)} />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
