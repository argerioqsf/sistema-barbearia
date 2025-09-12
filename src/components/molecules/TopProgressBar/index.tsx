'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  height?: number
  color?: string
  shadow?: boolean
  visible?: boolean
}

export default function TopProgressBar({
  height = 3,
  color = 'hsl(var(--primary))',
  shadow = true,
  visible = true,
}: Props) {
  const [progress, setProgress] = useState(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!visible) {
      // When becoming hidden, quickly finish the bar to 100% then hide
      if (timer.current) clearInterval(timer.current)
      setProgress((p) => (p > 0 && p < 100 ? 100 : p))
      const t = setTimeout(() => setProgress(0), 180)
      return () => clearTimeout(t)
    }
    // Start from a visible baseline and ramp up quickly for short navigations
    setProgress(30)
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p
        const inc = 5 + Math.random() * 10 // harmonized with route loader feel
        return Math.min(p + inc, 95)
      })
    }, 200)
    return () => {
      if (timer.current) clearInterval(timer.current)
      // finish quickly to 100% for a smooth effect
      setProgress(100)
      setTimeout(() => setProgress(0), 200)
    }
  }, [visible])

  if (!visible && progress === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height,
        zIndex: 9999,
        background: 'transparent',
        boxShadow: shadow ? '0 0 6px rgba(0,0,0,0.2)' : undefined,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 200ms ease-out',
        }}
      />
    </div>
  )
}
