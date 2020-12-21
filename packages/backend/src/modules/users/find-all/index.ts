import { IUsersModel } from '~/models/users/IUsersModel'

export function createFindAllUsersModule(usersModel: IUsersModel) {
  return {
    async execute() {
      const users = await usersModel.findMany()

      users.forEach(user => delete user.password)

      return users
    }
  }
}
