import { AxiosError } from 'axios'

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
