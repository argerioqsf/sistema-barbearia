'use client'

import { Button } from '@/components/atoms'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ClientSelectionModal } from '../ClientSelectionModal'
import { usePathname } from 'next/navigation'

type ButtonStartNewSaleProps = {
  className?: string
  redirectBasePath?: string
}

export function ButtonStartNewSale({
  className,
  redirectBasePath,
}: ButtonStartNewSaleProps = {}) {
  const [modal, showModal] = useState(false)
  const pathname = usePathname()

  const computedBasePath = useMemo(() => {
    if (!pathname) return '/point-of-sale'
    const segments = pathname.split('/').filter(Boolean)
    const localeSegment = segments[0]
    return localeSegment ? `/${localeSegment}/point-of-sale` : '/point-of-sale'
  }, [pathname])

  const basePath = redirectBasePath ?? computedBasePath

  return (
    <>
      <Button
        onClick={() => showModal(true)}
        className={twMerge('mb-4 w-full max-w-xs py-3 text-xl', className)}
      >
        Iniciar Nova Venda
      </Button>
      <ClientSelectionModal
        modal={modal}
        showModal={showModal}
        redirectBasePath={basePath}
      />
    </>
  )
}
