export interface AxiosContextProps {
  baseURL: string
  token?: string
  setToken(token: string): void
}

export interface AxiosContextProviderProps {
  baseURL: string
}
