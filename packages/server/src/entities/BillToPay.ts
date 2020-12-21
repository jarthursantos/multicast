import { Buyer } from './Buyer'
import { Provider } from './Provider'

export interface BillToPay {
  buyer: Buyer
  provider: Provider
  installment: string
  dueDate: Date
  deadline: number
  value: number
}
