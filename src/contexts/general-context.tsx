'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface GeneralContentType {
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const GeneralContext = createContext({} as GeneralContentType)

export function GeneralProvider({ children }: { children: ReactNode }) {
  // TODO: entender melhor essa logica do useEffect
  // Prevent background scroll when the mobile menu is open

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initialize = () => {
      const width = window.innerWidth
      setOpenMenu(width >= 1024)
    }

    const handleResize = () => {
      const width = window.innerWidth
      setOpenMenu(width >= 1024)
    }

    initialize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent background scroll on mobile when the menu overlays the content
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (typeof window === 'undefined') return
    const root = document.documentElement
    const shouldLock = openMenu && window.innerWidth < 768
    if (shouldLock) {
      root.classList.add('overflow-hidden')
      root.classList.add('overscroll-none')
    } else {
      root.classList.remove('overflow-hidden')
      root.classList.remove('overscroll-none')
    }
  }, [openMenu])

  return (
    <GeneralContext.Provider value={{ openMenu, setOpenMenu }}>
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneral = () => useContext(GeneralContext)
