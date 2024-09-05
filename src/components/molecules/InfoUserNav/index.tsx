'use client'

import { Button, Text } from '@/components/atoms'
import { useHandlerRouter } from '@/hooks/use-handler-router'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  getUserFromCookie,
  removeRolesCookieClient,
  removeTokenCookieClient,
  removeUserCookieClient,
} from '@/utils/cookieClient'
import { User } from '@/types/general'
import LinkDefault from '@/components/atoms/LinkDefault'

type InfoUserNavProps = {
  className?: string
}

const InfoUserNav: React.FC<InfoUserNavProps> = ({ className }) => {
  const { pushRouter } = useHandlerRouter()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const user = getUserFromCookie()
    setUser(user)
  }, [])

  function logOut() {
    removeTokenCookieClient()
    removeUserCookieClient()
    removeRolesCookieClient()
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
