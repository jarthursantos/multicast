import { User } from 'entities/User'
import { UserHistory } from 'entities/UserHistory'

export interface IUsersHistoryRepository {
  findHistory(user: User): Promise<UserHistory[]>
  logStore(changedBy: User, storedUser: User): Promise<void>
  logUpdate(changedBy: User, oldUser: User, newUser: User): Promise<void>
  logDisabled(changedBy: User, user: User): Promise<void>
  logEnabled(changedBy: User, user: User): Promise<void>
}
