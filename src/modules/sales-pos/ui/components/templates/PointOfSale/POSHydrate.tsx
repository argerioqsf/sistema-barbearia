'use client'

import type { DehydratedState } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

interface POSHydrateProps {
  state: DehydratedState
  children: React.ReactNode
}

export function POSHydrate({ state, children }: POSHydrateProps) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}
