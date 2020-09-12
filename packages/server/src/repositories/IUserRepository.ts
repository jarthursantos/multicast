import { User } from 'entities/User'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  save(user: User): Promise<void>
  findMany(): Promise<User[]>
  disable(user: User): Promise<void>
  enable(user: User): Promise<void>
  update(user: User): Promise<User>
}
