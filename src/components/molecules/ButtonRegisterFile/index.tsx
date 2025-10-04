'use client'

import { Button } from '@/components/atoms'
import LinkDefault from '@/components/atoms/LinkDefault'
import { Profile } from '@/features/profile/schemas'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import React from 'react'

interface ButtonRegisterFileProps {
  profile: Profile
}

export function ButtonRegisterFile({ profile }: ButtonRegisterFileProps) {
  return (
    checkUserPermissions('file.create', profile.role?.name) && (
      <div className="w-full flex flex-row justify-end items-center">
        <Button className="bg-secondary-50 text-white">
          <LinkDefault href="/dashboard/indicators/files/register">
            Cadastrar
          </LinkDefault>
        </Button>
      </div>
    )
  )
}
