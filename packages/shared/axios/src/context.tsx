import React, { createContext, useEffect, useState } from 'react'

import { api } from './hooks'
import { AxiosContextProps, AxiosContextProviderProps } from './types'

export const AxiosContext = createContext<AxiosContextProps>(undefined)

export const AxiosContextProvider: React.FC<AxiosContextProviderProps> = ({
  children,
  baseURL: initialURL
}) => {
  const [token, setToken] = useState<string>()
  const [baseURL, setBaseURL] = useState<string>(initialURL)

  useEffect(() => {
    if (!baseURL) return

    api.defaults.baseURL = baseURL
  }, [baseURL])

  useEffect(() => {
    if (!token) return

    api.interceptors.request.use(config => {
      config.params = config.params || {}

      config.headers.Authorization = `Bearer ${token}`

      return config
    })
  }, [token])

  return (
    <AxiosContext.Provider value={{ baseURL, setBaseURL, token, setToken }}>
      {children}
    </AxiosContext.Provider>
  )
}
