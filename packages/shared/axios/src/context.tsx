import React, { createContext, useState } from 'react'

import { AxiosContextProps, AxiosContextProviderProps } from './types'

export const AxiosContext = createContext<AxiosContextProps>(undefined)

export const AxiosContextProvider: React.FC<AxiosContextProviderProps> = ({
  children,
  baseURL
}) => {
  const [token, setToken] = useState<string>()

  return (
    <AxiosContext.Provider value={{ baseURL, token, setToken }}>
      {children}
    </AxiosContext.Provider>
  )
}
