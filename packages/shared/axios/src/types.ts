export interface AxiosContextProps {
  baseURL: string
  token?: string
  setBaseURL(url: string): void
  setToken(token: string): void
}

export interface AxiosContextProviderProps {
  baseURL: string
}
