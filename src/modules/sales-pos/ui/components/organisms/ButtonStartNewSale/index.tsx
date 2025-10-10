'use client'

import { Button } from '@/components/atoms'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ClientSelectionModal } from '../ClientSelectionModal'

type ButtonStartNewSaleProps = {
  className?: string
}

export function ButtonStartNewSale({
  className,
}: ButtonStartNewSaleProps = {}) {
  const [modal, showModal] = useState(false)
  return (
    <>
      <Button
        onClick={() => showModal(true)}
        className={twMerge('mb-4 w-full max-w-xs py-3 text-xl', className)}
      >
        Iniciar Nova Venda
      </Button>
      <ClientSelectionModal modal={modal} showModal={showModal} />
    </>
  )
}
