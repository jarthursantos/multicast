import React, { createContext } from 'react'

const StoreContext = createContext<{}>(null)

export const StoreContextProvider: React.FC = ({ children }) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>
}
