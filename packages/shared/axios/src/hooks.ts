import { useCallback, useContext, useMemo } from 'react'

import axios, { AxiosInstance } from 'axios'

import { AxiosContext } from './context'
import { AxiosContextProps } from './types'

export const api = axios.create()

export function useAxios(): [AxiosInstance, boolean] {
  const { token } = useContext<AxiosContextProps>(AxiosContext)

  return useMemo(() => {
    return [api, !!token]
  }, [token, api])
}

export function useSetToken() {
  const { setToken } = useContext(AxiosContext)

  return useCallback((token: string) => setToken(token), [setToken])
}

export function useSetBaseURL() {
  const { setBaseURL } = useContext(AxiosContext)

  return useCallback((url: string) => setBaseURL(url), [setBaseURL])
}
