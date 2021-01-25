import { IBuyer } from './IBuyer'
import { IProvider } from './IProvider'
import { IUser } from './IUser'

export interface IAgenda {
  id: string
  buyer: IBuyer
  date: {
    from: Date
    to: Date
  }
  providers: IProvider[]
  createdBy: IUser
}
