'use client'

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { LoadingProvider } from '@/contexts/loading-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export interface ProvidersProps {
  children: React.ReactNode
  messages: AbstractIntlMessages
  locale: string
  session?: Session | null
}
export function Providers({
  children,
  messages,
  locale,
  session,
}: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // bom padrão para UX responsiva; ajuste por caso
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchInterval={0}
      session={session}
    >
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        timeZone={process.env.NEXT_INTL_TIMEZONE || 'UTC'}
      >
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>{children}</LoadingProvider>
          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
