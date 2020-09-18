import axios, { AxiosError } from 'axios'
import { config } from 'dotenv'

config()

let authToken: string

const api = axios.create({
  baseURL: process.env.SERVER_URL
})

api.interceptors.request.use(config => {
  config.params = config.params || {}

  config.headers.Authorization = `Bearer ${authToken}`

  return config
})

export const setAuthToken = (token: string) => {
  authToken = token
}

export function extractErrorMessage(error: AxiosError) {
  if (error.isAxiosError) {
    if (error.response) {
      return error.response.data.message
    } else {
      return 'Não foi possível se conectar ao servidor'
    }
  } else {
    return 'Houve um erro no login, verifique seus dados!'
  }
}

export { api }
