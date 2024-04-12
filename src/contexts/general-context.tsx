'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface GeneralContentType {
  openMenu: boolean | null
  setOpenMenu: Dispatch<SetStateAction<boolean | null>>
}

const GeneralContext = createContext({} as GeneralContentType)

export function GeneralProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState<boolean | null>(null)

  return (
    <GeneralContext.Provider value={{ openMenu, setOpenMenu }}>
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneral = () => useContext(GeneralContext)
