import { useCallback, useEffect, useRef, useState } from "react"
import {
  fetchServers,
  clearCache,
  type ServerData,
} from "@/lib/api"

export type LoadState = "loading" | "success" | "error" | "empty"

export interface ServersState {
  servers: ServerData[]
  state: LoadState
  error: string | null
  lastUpdated: number | null
  refreshing: boolean
}

const REFRESH_INTERVAL = 10_000

export function useServers() {
  const [servers, setServers] = useState<ServerData[]>([])
  const [state, setState] = useState<LoadState>("loading")
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const inFlight = useRef(false)

  const doFetch = useCallback(async (force: boolean) => {
    if (inFlight.current) return
    inFlight.current = true
    setRefreshing(true)

    try {
      const result = await fetchServers(force)
      setServers(result.servers)
      setLastUpdated(result.fetchedAt)
      if (result.servers.length === 0) {
        setState("empty")
      } else {
        setState("success")
      }
      setError(null)
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error"
      setError(msg)
      setState("error")
    } finally {
      inFlight.current = false
      setRefreshing(false)
    }
  }, [])

  const refresh = useCallback(() => {
    clearCache()
    return doFetch(true)
  }, [doFetch])

  useEffect(() => {
    doFetch(false)

    const interval = setInterval(() => {
      doFetch(true)
    }, REFRESH_INTERVAL)

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        doFetch(true)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [doFetch])

  return {
    servers,
    state,
    error,
    lastUpdated,
    refreshing,
    refresh,
  }
}
