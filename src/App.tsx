import { useEffect, useMemo, useState } from "react"
import { Server, Users, BarChart3 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Header } from "@/components/fog-header"
import { StatsBar } from "@/components/stats-bar"
import { ServerCard } from "@/components/server-card"
import {
  LoadingState,
  ErrorState,
  EmptyState,
  ComingSoon,
} from "@/components/state-views"
import { useServers } from "@/hooks/use-servers"
import {
  generateFavicon,
  generateLogo,
  generateHeroBg,
  generateSocialPreview,
  generateSpinnerSvg,
} from "@/lib/assets"

export function App() {
  const { servers, state, error, lastUpdated, refreshing, refresh } =
    useServers()

  const [favicon] = useState(() => generateFavicon())
  const [logo] = useState(() => generateLogo())
  const [heroBg] = useState(() => generateHeroBg())
  const [socialPreview] = useState(() => generateSocialPreview())
  const spinnerSrc = useMemo(() => generateSpinnerSvg(), [])

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "icon"
    link.href = favicon
    document.head.appendChild(link)

    const ogImage = document.createElement("meta")
    ogImage.setAttribute("property", "og:image")
    ogImage.content = socialPreview
    document.head.appendChild(ogImage)

    const twitterImage = document.createElement("meta")
    twitterImage.setAttribute("name", "twitter:image")
    twitterImage.content = socialPreview
    document.head.appendChild(twitterImage)

    const ogTitle = document.createElement("meta")
    ogTitle.setAttribute("property", "og:title")
    ogTitle.content = "Fogwall - Blockade3D Server Status"
    document.head.appendChild(ogTitle)

    const ogDesc = document.createElement("meta")
    ogDesc.setAttribute("property", "og:description")
    ogDesc.content = "Real-time Blockade3D game server monitoring."
    document.head.appendChild(ogDesc)

    document.documentElement.style.setProperty(
      "--fog-hero-url",
      `url(${heroBg})`
    )
  }, [favicon, socialPreview, heroBg])

  return (
    <div className="relative min-h-svh bg-background bg-fog-hero">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header
          logoSrc={logo}
          refreshing={refreshing}
          lastUpdated={lastUpdated}
          onRefresh={refresh}
        />

        <div className="mt-6">
          <Tabs defaultValue="servers" className="w-full">
            <TabsList className="bg-card/60 backdrop-blur-sm border border-border">
              <TabsTrigger value="servers" className="gap-1.5">
                <Server className="size-4" />
                Servers
              </TabsTrigger>
              <TabsTrigger value="players" className="gap-1.5">
                <Users className="size-4" />
                Players
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-1.5">
                <BarChart3 className="size-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="servers" className="mt-6">
              {state === "loading" && <LoadingState spinnerSrc={spinnerSrc} />}
              {state === "error" && (
                <ErrorState message={error ?? ""} onRetry={refresh} />
              )}
              {state === "empty" && <EmptyState />}
              {state === "success" && (
                <div className="flex flex-col gap-6">
                  <StatsBar servers={servers} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {servers.map((server, i) => (
                      <ServerCard
                        key={`${server.ip}:${server.port}-${i}`}
                        server={server}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="players" className="mt-6">
              <ComingSoon
                icon={Users}
                title="Player List Coming Soon"
                subtitle="Bot integration in progress..."
              />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <ComingSoon
                icon={BarChart3}
                title="Analytics Coming Soon"
                subtitle="Data collection bot in development..."
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default App
