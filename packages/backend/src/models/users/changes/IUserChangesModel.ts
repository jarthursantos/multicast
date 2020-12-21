import { IUser } from '~/domain/IUser'
import { IUserChanges } from '~/domain/IUserChanges'

export interface IUserChangesModel {
  findHistory(user: IUser): Promise<IUserChanges[]>
  logStore(changedBy: IUser, storedUser: IUser): Promise<void>
  logUpdate(
    changedBy: IUser,
    oldUser: Partial<IUser>,
    newUser: IUser
  ): Promise<void>
  logDisabled(changedBy: IUser, user: IUser): Promise<void>
  logEnabled(changedBy: IUser, user: IUser): Promise<void>
}
