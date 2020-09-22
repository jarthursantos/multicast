import { useContext, useEffect } from 'react'

import axios from 'axios'

import { AxiosContext } from './context'
import { AxiosContextProps } from './types'

const api = axios.create()

export function useAxios() {
  const { baseURL, token } = useContext<AxiosContextProps>(AxiosContext)

  useEffect(() => {
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
  }, [baseURL, token])

  return api
}
