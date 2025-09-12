'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import TopProgressBar from '@/components/molecules/TopProgressBar'

type LoadingContextType = {
  inFlight: number
  show: () => void
  hide: () => void
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export function LoadingProvider({
  children,
  thresholdMs = 250,
}: {
  children: React.ReactNode
  thresholdMs?: number
}) {
  const [inFlight, setInFlight] = useState(0)
  const [visible, setVisible] = useState(false)
  const showTimer = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Instrument window.fetch on the client to capture any request
    if (typeof window !== 'undefined' && !window.__appFetchPatched) {
      const original: typeof fetch = window.fetch.bind(window)
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        try {
          setInFlight((n) => n + 1)
          // allow callers to skip the loader
          const nextInit: RequestInit | undefined = init
            ? { ...init }
            : undefined
          if (nextInit) {
            const ensured = ensureHeaders(nextInit.headers)
            ensured.set('x-loading-tracked', '1')
            nextInit.headers = ensured
          }
          const resp = await original(input, nextInit)
          return resp
        } finally {
          setInFlight((n) => Math.max(0, n - 1))
        }
      }
      window.__appFetchPatched = true
    }
    const onStart = () => setInFlight((n) => n + 1)
    const onEnd = () => setInFlight((n) => Math.max(0, n - 1))
    window.addEventListener('app:fetch-start', onStart)
    window.addEventListener('app:fetch-end', onEnd)
    return () => {
      window.removeEventListener('app:fetch-start', onStart)
      window.removeEventListener('app:fetch-end', onEnd)
    }
  }, [])

  // Threshold logic to avoid flicker on very fast requests
  useEffect(() => {
    if (inFlight > 0) {
      if (!visible && !showTimer.current) {
        showTimer.current = setTimeout(() => {
          setVisible(true)
          showTimer.current = null
        }, thresholdMs)
      }
    } else {
      if (showTimer.current) {
        clearTimeout(showTimer.current)
        showTimer.current = null
      }
      setVisible(false)
    }
  }, [inFlight, visible, thresholdMs])

  const value = useMemo(
    () => ({
      inFlight,
      show: () => setInFlight((n) => n + 1),
      hide: () => setInFlight((n) => Math.max(0, n - 1)),
    }),
    [inFlight],
  )

  return (
    <LoadingContext.Provider value={value}>
      <TopProgressBar visible={visible} />
      {children}
    </LoadingContext.Provider>
  )
}

function ensureHeaders(h?: HeadersInit): Headers {
  if (h instanceof Headers) return h
  if (Array.isArray(h)) return new Headers(h)
  if (h && typeof h === 'object')
    return new Headers(h as Record<string, string>)
  return new Headers()
}

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider')
  return ctx
}
