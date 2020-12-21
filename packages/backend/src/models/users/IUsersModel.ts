import { IUser } from '~/domain/IUser'

export interface IUsersModel {
  findByEmail(email: string): Promise<IUser | undefined>
  findById(id: string): Promise<IUser | undefined>
  save(user: IUser): Promise<void>
  findMany(): Promise<IUser[]>
  disable(user: IUser): Promise<void>
  enable(user: IUser): Promise<void>
  update(user: IUser): Promise<IUser>
}
