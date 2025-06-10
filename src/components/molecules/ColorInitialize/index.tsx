'use client'

import { useEffect } from 'react'
import { applyPalette } from '@/utils/colors-palete'

export default function ColorInitializer() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const primary = localStorage.getItem('primary-color')
    const secondary = localStorage.getItem('secondary-color')
    if (!primary || !secondary) return
    applyPalette(primary, secondary)
  }, [])

  return null
}