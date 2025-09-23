'use client'

import { Button } from '@/components/atoms'
import { ClientSelectionModal } from '@/components/organisms/ClientSelectionModal'
import { useState } from 'react'

export function ButtonStartNewSale() {
  const [modal, showModal] = useState(false)
  return (
    <>
      <Button
        onClick={() => showModal(true)}
        className="mb-4 w-full max-w-xs py-3 text-xl"
      >
        Iniciar Nova Venda
      </Button>
      <ClientSelectionModal modal={modal} showModal={showModal} />
    </>
  )
}
