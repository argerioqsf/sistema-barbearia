import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FloatingBottomBarProps {
  children: ReactNode
  className?: string
  hidden?: boolean
}

export function FloatingBottomBar({
  children,
  className,
  hidden,
}: FloatingBottomBarProps) {
  return (
    <div
      data-state={hidden ? 'closed' : 'open'}
      className={cn(
        'lg:hidden fixed bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-primary/20 p-4 shadow-2xl backdrop-blur-md',
        'transition-all duration-300 ease-in-out',
        'data-[state=open]:opacity-100 data-[state=open]:translate-y-0',
        'data-[state=closed]:opacity-0 data-[state=closed]:translate-y-12 data-[state=closed]:pointer-events-none',
        className,
      )}
    >
      {children}
    </div>
  )
}
