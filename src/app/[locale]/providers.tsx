'use client'

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

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
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchInterval={0}
      session={session}
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
