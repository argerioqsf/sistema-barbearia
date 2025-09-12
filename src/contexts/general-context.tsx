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
  openMenu: boolean | null
  setOpenMenu: Dispatch<SetStateAction<boolean | null>>
}

const GeneralContext = createContext({} as GeneralContentType)

export function GeneralProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState<boolean | null>(null)
  // TODO: entender melhor essa logica do useEffect
  // Prevent background scroll when the mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (openMenu) {
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
