import { IBuyer } from '~/domain/IBuyer'

export interface IBuyersModel {
  findById(id: number): Promise<IBuyer | undefined>
  findMany(query?: string): Promise<IBuyer[]>
}
