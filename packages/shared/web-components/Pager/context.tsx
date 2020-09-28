import React, { createContext, useContext, useCallback } from 'react'

interface ContextHandles {
  isPageActive(name: string): boolean
}

interface Props {
  currentPage: string
}

const PagerContext = createContext<ContextHandles>(null)

export const PagerContextProvider: React.FC<Props> = ({
  currentPage,
  children
}) => {
  const isPageActive = useCallback(
    (name: string): boolean => currentPage === name,
    [currentPage]
  )

  return (
    <PagerContext.Provider value={{ isPageActive }}>
      {children}
    </PagerContext.Provider>
  )
}

export const useActivePage = (name: string): boolean => {
  const { isPageActive } = useContext(PagerContext)

  return isPageActive(name)
}
