'use client'

import { Button, Text } from '@/components/atoms'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import LinkDefault from '@/components/atoms/LinkDefault'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/contexts/auth-context'

type InfoUserNavProps = {
  className?: string
}

const InfoUserNav: React.FC<InfoUserNavProps> = ({ className }) => {
  const { pushRouter } = useHandlerRouter()
  const { user } = useAuth()

  async function logOut() {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch {}
    try {
      await signOut({ redirect: false })
    } catch {}
    pushRouter('auth/signin')
  }

  return (
    <div className={twMerge('pt-1 flex flex-row gap-4', className)}>
      {user && (
        <LinkDefault href="/dashboard/profile">
          <Text className="text-indigo-600 font-bold capitalize">
            {user?.name}
          </Text>
        </LinkDefault>
      )}
      <Button
        type="button"
        onClick={logOut}
        className="text-base text-red-800 font-medium p-0 w-auto text-start"
      >
        SAIR
      </Button>
    </div>
  )
}

export default InfoUserNav
