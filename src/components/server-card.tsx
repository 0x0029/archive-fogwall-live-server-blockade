import { MapPin, Gamepad2, Users, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ServerData } from "@/lib/api"

interface ServerCardProps {
  server: ServerData
}

export function ServerCard({ server }: ServerCardProps) {
  const isOnline = server.players > 0

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4",
        "transition-all duration-200 hover:border-primary hover:bg-secondary",
        "hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(108,92,231,0.25)]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-foreground truncate">
            {server.mapName}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-block size-2 rounded-full",
                isOnline
                  ? "bg-fog-green animate-fog-pulse text-fog-green"
                  : "bg-fog-red"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                isOnline ? "text-fog-green" : "text-fog-red"
              )}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        {server.isPopular && (
          <Flame className="size-5 shrink-0 text-fog-yellow" />
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="text-foreground/90 truncate">{server.mapName}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Gamepad2 className="size-4 shrink-0 text-primary" />
          <span className="text-foreground/90 truncate">{server.modeName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-3">
        <Users className="size-4 shrink-0 text-primary" />
        <span className="font-medium text-foreground">
          {server.players} / {server.maxPlayers}
        </span>
        <span className="text-muted-foreground text-xs">
          ({server.fillPercent}%)
        </span>
        <div className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              server.isPopular ? "bg-fog-yellow" : "bg-primary"
            )}
            style={{ width: `${Math.min(server.fillPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
