import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  logoSrc: string
  refreshing: boolean
  lastUpdated: number | null
  onRefresh: () => void
}

function formatTime(ts: number | null): string {
  if (!ts) return "Never"
  const date = new Date(ts)
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function Header({
  logoSrc,
  refreshing,
  lastUpdated,
  onRefresh,
}: HeaderProps) {
  const [time, setTime] = useState(formatTime(lastUpdated))

  useEffect(() => {
    setTime(formatTime(lastUpdated))
  }, [lastUpdated])

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          src={logoSrc}
          alt="Fogwall"
          className="size-12 rounded-lg"
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-none text-fog-gradient">
            Fogwall
          </h1>
          <span className="text-xs text-muted-foreground">Server Status</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Updated {time}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing}
          className="border-border bg-card/50 backdrop-blur-sm"
        >
          <RefreshCw
            className={cn("size-4", refreshing && "animate-fog-spin")}
          />
          Refresh
        </Button>
      </div>
    </header>
  )
}
