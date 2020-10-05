import { useCallback, useContext, useMemo } from 'react'

import axios, { AxiosInstance } from 'axios'

import { AxiosContext } from './context'
import { AxiosContextProps } from './types'

export const api = axios.create()

export function useAxios(): [AxiosInstance, boolean] {
  const { baseURL, token } = useContext<AxiosContextProps>(AxiosContext)

  return useMemo(() => {
    if (baseURL) {
      api.defaults.baseURL = baseURL
    }

    if (token) {
      api.interceptors.request.use(config => {
        config.params = config.params || {}

        config.headers.Authorization = `Bearer ${token}`

        return config
      })
    }

    return [api, !!token]
  }, [baseURL, token, api])
}

export function useSetToken() {
  const { setToken } = useContext(AxiosContext)

  return useCallback((token: string) => {
    setToken(token)
  }, [])
}
