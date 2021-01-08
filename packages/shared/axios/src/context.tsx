import React, { createContext, useCallback, useEffect, useState } from 'react'

import { api } from './hooks'
import { AxiosContextProps, AxiosContextProviderProps } from './types'

export const AxiosContext = createContext<AxiosContextProps>(undefined)

export const AxiosContextProvider: React.FC<AxiosContextProviderProps> = ({
  children,
  baseURL: initialURL
}) => {
  const [token, setToken] = useState<string>()
  const [baseURL, setBaseURL] = useState<string>(initialURL)

  const handleSetToken = useCallback((newToken: string) => {
    if (!newToken) return

    api.interceptors.request.use(config => {
      config.params = config.params || {}

      config.headers.Authorization = `Bearer ${newToken}`

      return config
    })

    setToken(newToken)
  }, [])

  useEffect(() => {
    if (!baseURL) return

    api.defaults.baseURL = baseURL
  }, [baseURL])

  return (
    <AxiosContext.Provider
      value={{ baseURL, setBaseURL, token, setToken: handleSetToken }}
    >
      {children}
    </AxiosContext.Provider>
  )
}
