import { IBuyer } from './IBuyer'
import { IProvider } from './IProvider'

export interface IBillToPay {
  buyer: IBuyer
  provider: IProvider
  installment: string
  dueDate: Date
  deadline: number
  value: number
}
