import { ICreateInvoicesDTO } from '../create/dto'

export type IUpdateInvoicesDTO = Partial<ICreateInvoicesDTO> & {
  providerCode: number
  number: number
}
