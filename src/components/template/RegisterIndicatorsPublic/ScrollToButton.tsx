'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
interface ScrollToButtonProps {
  targetName: string
}

export function ScrollToButton({ targetName }: ScrollToButtonProps) {
  const paths = usePathname()
  const searchParams = useSearchParams()
  const targetId = searchParams.get('targetId')

  useEffect(() => {
    if (targetId) {
      const targetElement = document.getElementById(targetId)
      targetElement && targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [targetId])

  function scrollIntoView() {
    if (targetId) {
      const targetElement = document.getElementById(targetName)
      targetElement && targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Button
      onClick={scrollIntoView}
      type="submit"
      className="bg-primary-100 rounded-full w-fit"
    >
      <Link
        href={`${paths}?targetId=${targetName}`}
        className="text-white font-semibold"
      >
        FAZER MEU CADASTRO
      </Link>
    </Button>
  )
}
