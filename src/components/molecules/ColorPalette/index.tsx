'use client'

import { useEffect, useState } from 'react'
import { applyPalette } from '@/utils/colors-palete'

type ColorPair = {
  primary: string
  secondary: string
}

const PALETTES: ColorPair[] = [
  { primary: '#0a1635', secondary: '#01DA7C' },
  { primary: '#000000', secondary: '#747474' },
  { primary: '#e11d48', secondary: '#facc15' },
  { primary: '#0e7490', secondary: '#059669' },
]

export default function ColorPalette() {
  const [pair, setPair] = useState<ColorPair | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedPrimary = localStorage.getItem('primary-color')
    const storedSecondary = localStorage.getItem('secondary-color')
    if (storedPrimary && storedSecondary) {
      setPair({ primary: storedPrimary, secondary: storedSecondary })
    } else {
      setPair(PALETTES[0])
    }
  }, [])

  useEffect(() => {
    if (!pair) return
    if (typeof document === 'undefined') return
    applyPalette(pair.primary, pair.secondary)
    localStorage.setItem('primary-color', pair.primary)
    localStorage.setItem('secondary-color', pair.secondary)
  }, [pair])

  if (!pair) return null

  return (
    <div className="flex gap-2 flex-wrap">
      {PALETTES.map((p, idx) => (
        <button
          key={idx}
          aria-label={`palette-${idx}`}
          className="w-10 h-10 rounded overflow-hidden border"
          onClick={() => setPair(p)}
        >
          <span
            className="block w-full h-1/2"
            style={{ backgroundColor: p.primary }}
          />
          <span
            className="block w-full h-1/2"
            style={{ backgroundColor: p.secondary }}
          />
        </button>
      ))}
    </div>
  )
}
