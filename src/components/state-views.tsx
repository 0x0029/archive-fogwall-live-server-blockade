import { AlertTriangle, CloudFog, Users, BarChart3 } from "lucide-react"
import { Button as UiButton } from "@/components/ui/button"

export function LoadingState({ spinnerSrc }: { spinnerSrc: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <img
        src={spinnerSrc}
        alt="Loading"
        className="size-12"
        width={48}
        height={48}
      />
      <p className="text-muted-foreground">Summoning servers from the fog...</p>
    </div>
  )
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <AlertTriangle className="size-12 text-fog-yellow" />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">
          Couldn't reach the server list
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          The fog is too thick right now. Try refreshing.
        </p>
        {message && (
          <p className="text-xs text-muted-foreground/70 mt-1">{message}</p>
        )}
      </div>
      <UiButton onClick={onRetry} className="bg-primary hover:bg-primary/90">
        Retry
      </UiButton>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <CloudFog className="size-12 text-muted-foreground animate-fog-float" />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">
          No servers online
        </h3>
        <p className="text-sm text-muted-foreground">
          Players are resting... try again later.
        </p>
      </div>
    </div>
  )
}

export function ComingSoon({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Users
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="relative">
        <Icon className="size-16 text-primary/40" />
        <div className="absolute inset-0 blur-xl bg-primary/20 -z-10" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export { BarChart3, Users }
